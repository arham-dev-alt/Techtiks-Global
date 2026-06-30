import type { IncomingMessage } from 'node:http';
import type { Duplex } from 'node:stream';
import { type RawData, type WebSocket, WebSocketServer } from 'ws';
import { isShapeStubDecision, markShapeStubPayload, resolveActiveStripDecisions } from './strip-runtime.ts';
import type { ReplayStripDecision, ReplayWebSocketScript } from './types.ts';

const WEBSOCKET_REPLAY_ENDPOINT = '/__shibuk/replay/websocket';

const decodeBase64 = (value: string) => Buffer.from(value, 'base64');
const coerceBuffer = (value: ArrayBuffer | Buffer) => {
    return Buffer.isBuffer(value) ? value : Buffer.from(new Uint8Array(value));
};

type UpgradeServer = {
    on: (event: 'upgrade', listener: (request: IncomingMessage, socket: Duplex, head: Buffer) => void) => void;
};

const rawDataToBuffer = (data: RawData) => {
    if (Array.isArray(data)) {
        return Buffer.concat(data.map(coerceBuffer));
    }

    return coerceBuffer(data);
};

const scheduleServerMessage = (
    client: WebSocket,
    message: NonNullable<ReplayWebSocketScript['initialMessages']>[number],
    timers: Set<ReturnType<typeof setTimeout>>,
    loudTelemetry: boolean,
    shapeStub: boolean,
    url: string,
) => {
    const delay = typeof message.delayMs === 'number' ? message.delayMs : 0;
    const timer = setTimeout(() => {
        timers.delete(timer);
        if (shouldLogServedReplayWebSocketFrame({ loudTelemetry, shapeStub })) {
            console.info('[shibuk-replay]', shapeStub ? 'shape-stub ws-frame served' : 'ws-frame', url);
        }
        const payload =
            shapeStub && message.binary !== true
                ? markShapeStubPayload(message.data)
                : message.binary
                  ? decodeBase64(message.data)
                  : message.data;
        client.send(payload, { binary: message.binary === true });
    }, delay);
    timers.add(timer);
};

export const shouldLogServedReplayWebSocketFrame = ({
    loudTelemetry,
    shapeStub,
}: {
    loudTelemetry: boolean;
    shapeStub: boolean;
}) => loudTelemetry && shapeStub;

const scheduleServerClose = (
    client: WebSocket,
    closeInfo: ReplayWebSocketScript['close'],
    timers: Set<ReturnType<typeof setTimeout>>,
) => {
    if (!closeInfo) {
        return;
    }

    const delay = typeof closeInfo.delayMs === 'number' ? closeInfo.delayMs : 0;
    const timer = setTimeout(() => {
        timers.delete(timer);
        client.close(closeInfo.code ?? 1000, closeInfo.reason ?? '');
    }, delay);
    timers.add(timer);
};

const normalizeClientPayload = (data: RawData, isBinary: boolean) => {
    if (isBinary) {
        const value = rawDataToBuffer(data);
        return {
            binary: true,
            data: value.toString('base64'),
        };
    }

    return {
        binary: false,
        data: typeof data === 'string' ? data : rawDataToBuffer(data).toString('utf8'),
    };
};

const findMatchingResponseIndex = (
    responses: NonNullable<ReplayWebSocketScript['responses']>,
    payload: { binary: boolean; data: string },
    responseCursor: number,
) => {
    const matches = (response: NonNullable<ReplayWebSocketScript['responses']>[number]) => {
        if (Boolean(response.matchBinary) !== payload.binary) {
            return false;
        }

        if (response.mode === 'includes') {
            return payload.data.includes(response.match);
        }

        return payload.data === response.match;
    };

    const forwardIndex = responses.findIndex((entry, index) => index >= responseCursor && matches(entry));
    if (forwardIndex >= 0) {
        return forwardIndex;
    }

    return responses.findIndex(matches);
};

const rejectUpgrade = (socket: Duplex, status: number, message: string) => {
    socket.write(`HTTP/1.1 ${status} ${message}\r\nConnection: close\r\n\r\n`);
    socket.destroy();
};

export const attachReplayWebSocketServer = ({
    httpServer,
    loudTelemetry,
    stripDecisions,
    scripts,
}: {
    httpServer: UpgradeServer;
    loudTelemetry: boolean;
    stripDecisions: ReplayStripDecision[];
    scripts: ReplayWebSocketScript[];
}) => {
    if (scripts.length === 0) {
        return;
    }

    const webSocketServer = new WebSocketServer({ noServer: true });
    const scriptsByUrl = new Map(scripts.map((entry) => [entry.url, entry]));
    const shapeStubTargets = new Set(
        resolveActiveStripDecisions(stripDecisions)
            .filter((decision) => isShapeStubDecision(decision) && decision.target.kind === 'ws-url')
            .map((decision) => decision.target.value),
    );

    httpServer.on('upgrade', (request, socket, head) => {
        let requestUrl: URL;
        try {
            requestUrl = new URL(request.url ?? '/', 'http://local.shibuk.test');
        } catch {
            rejectUpgrade(socket, 400, 'Bad Request');
            return;
        }

        if (requestUrl.pathname !== WEBSOCKET_REPLAY_ENDPOINT) {
            return;
        }

        const targetUrl = requestUrl.searchParams.get('url');
        if (!targetUrl) {
            rejectUpgrade(socket, 400, 'Bad Request');
            return;
        }

        const script = scriptsByUrl.get(targetUrl);
        if (!script) {
            rejectUpgrade(socket, 404, 'Not Found');
            return;
        }

        webSocketServer.handleUpgrade(request, socket, head, (client) => {
            webSocketServer.emit('connection', client, request, script);
        });
    });

    webSocketServer.on('connection', (client: WebSocket, _request: IncomingMessage, script: ReplayWebSocketScript) => {
        const timers = new Set<ReturnType<typeof setTimeout>>();
        let responseCursor = 0;
        const shapeStub = shapeStubTargets.has(script.url);

        for (const message of script.initialMessages ?? []) {
            scheduleServerMessage(client, message, timers, loudTelemetry, shapeStub, script.url);
        }
        scheduleServerClose(client, script.close, timers);

        client.on('message', (data: RawData, isBinary: boolean) => {
            const payload = normalizeClientPayload(data, Boolean(isBinary));
            const responses = script.responses ?? [];
            const matchedIndex = findMatchingResponseIndex(responses, payload, responseCursor);
            if (matchedIndex < 0) {
                return;
            }

            responseCursor = matchedIndex + 1;
            const matchedResponse = responses[matchedIndex];
            for (const message of matchedResponse.serverMessages ?? []) {
                scheduleServerMessage(client, message, timers, loudTelemetry, shapeStub, script.url);
            }
            scheduleServerClose(client, matchedResponse.close, timers);
        });

        client.once('close', () => {
            for (const timer of timers) {
                clearTimeout(timer);
            }
            timers.clear();
        });
    });
};
