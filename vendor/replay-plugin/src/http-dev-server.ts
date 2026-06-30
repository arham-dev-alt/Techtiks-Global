import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { materializeReplayHttpRoutes, readReplayRoutePayload } from './load-capture.ts';
import type { ReplayRuntimeEventSink } from './runtime-events.ts';
import {
    buildStripDecisionResponse,
    resolveActiveStripDecisions,
    resolveMatchingStripDecision,
} from './strip-runtime.ts';
import type { LoadedReplayCapture, ReplayHttpRoute } from './types.ts';

type NodeMiddlewareNext = (error?: unknown) => void;

const sha1Hex = (value: string) => {
    return createHash('sha1').update(value).digest('hex').slice(0, 12);
};

const readRequestBody = async (req: IncomingMessage) => {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks).toString('utf8');
};

const findReplayRoute = async ({
    capture,
    req,
    url,
}: {
    capture: LoadedReplayCapture;
    req: IncomingMessage;
    url: URL;
}) => {
    const method = (req.method ?? 'GET').toUpperCase();
    const directMatches = capture.httpRoutes.filter((route) => {
        return (
            (route.method === '*' || route.method === method) &&
            route.pathname === url.pathname &&
            route.search === url.search
        );
    });

    if (directMatches.length === 0) {
        return null;
    }

    if (directMatches.length === 1) {
        return directMatches[0] ?? null;
    }

    const body = ['GET', 'HEAD', 'OPTIONS'].includes(method) ? '' : await readRequestBody(req);
    if (!body) {
        return directMatches[0] ?? null;
    }

    const bodyHash = sha1Hex(body);
    return directMatches.find((route) => route.requestBodyHash === bodyHash) ?? directMatches[0] ?? null;
};

const writeRouteResponse = async (res: ServerResponse<IncomingMessage>, route: ReplayHttpRoute) => {
    if (route.contentType) {
        res.setHeader('Content-Type', route.contentType);
    }
    for (const [name, value] of Object.entries(route.responseHeaders ?? {})) {
        res.setHeader(name, value);
    }
    res.statusCode = route.status;
    const payload = await readReplayRoutePayload(route);
    res.end(typeof payload === 'string' ? payload : Buffer.from(payload));
};

const writeResponseObject = async (res: ServerResponse<IncomingMessage>, response: Response) => {
    res.statusCode = response.status;
    response.headers.forEach((value, name) => {
        res.setHeader(name, value);
    });
    const body = response.body ? Buffer.from(await response.arrayBuffer()) : Buffer.alloc(0);
    res.end(body);
};

const maybeServeStripDecision = async ({
    loudTelemetry,
    reqUrl,
    res,
    route,
    runtimeEventSink,
    stripDecision,
}: {
    loudTelemetry: boolean;
    reqUrl: URL;
    res: ServerResponse<IncomingMessage>;
    route: ReplayHttpRoute | null;
    runtimeEventSink: ReplayRuntimeEventSink | null;
    stripDecision: ReturnType<typeof resolveMatchingStripDecision>;
}) => {
    if (!stripDecision) {
        return false;
    }

    const responseRoute =
        route && stripDecision.action === 'shape-stub-from-capture' && typeof route.body !== 'string'
            ? ((await materializeReplayHttpRoutes([route]))[0] ?? route)
            : route;
    const stripResponse = buildStripDecisionResponse({
        decision: stripDecision,
        route: responseRoute,
    });
    if (stripResponse) {
        if (stripDecision.action === 'shape-stub-from-capture') {
            runtimeEventSink?.record({
                eventType: 'shape-stub-hit',
                level: 'info',
                message: `shape-stub hit for ${reqUrl.pathname}`,
                stripDecisionId: stripDecision.id,
                target: reqUrl.pathname,
            });
        } else {
            runtimeEventSink?.record({
                eventType: 'served-strip-stub',
                level: 'info',
                message: `served strip stub for ${reqUrl.pathname}`,
                stripDecisionId: stripDecision.id,
                target: reqUrl.pathname,
            });
        }
        if (loudTelemetry) {
            console.info('[shibuk-replay]', stripDecision.action, stripDecision.target.value);
        }
        await writeResponseObject(res, stripResponse);
        return true;
    }

    if (loudTelemetry) {
        console.info('[shibuk-replay]', 'shape-stub-miss', reqUrl.pathname);
    }
    runtimeEventSink?.record({
        eventType: 'shape-stub-miss',
        level: 'warn',
        message: `shape-stub miss for ${reqUrl.pathname}`,
        stripDecisionId: stripDecision.id,
        target: reqUrl.pathname,
    });
    return false;
};

const maybeServeReplayRoute = async ({
    loudTelemetry,
    next,
    res,
    route,
}: {
    loudTelemetry: boolean;
    next: NodeMiddlewareNext;
    res: ServerResponse<IncomingMessage>;
    route: ReplayHttpRoute | null;
}) => {
    if (!route) {
        next();
        return true;
    }

    if (loudTelemetry) {
        console.info('[shibuk-replay]', 'served', route.method, route.pathname + route.search);
    }
    await writeRouteResponse(res, route);
    return false;
};

export const createReplayHttpMiddleware = ({
    capture,
    loudTelemetry,
    runtimeEventSink = null,
}: {
    capture: LoadedReplayCapture;
    loudTelemetry: boolean;
    runtimeEventSink?: ReplayRuntimeEventSink | null;
}) => {
    const activeStripDecisions = resolveActiveStripDecisions(capture.stripDecisions.decisions);

    return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: NodeMiddlewareNext) => {
        await handleReplayRequest({
            activeStripDecisions,
            capture,
            loudTelemetry,
            next,
            req,
            res,
            runtimeEventSink,
        });
    };
};

const handleReplayRequest = async ({
    activeStripDecisions,
    capture,
    loudTelemetry,
    next,
    req,
    res,
    runtimeEventSink,
}: {
    activeStripDecisions: ReturnType<typeof resolveActiveStripDecisions>;
    capture: LoadedReplayCapture;
    loudTelemetry: boolean;
    next: NodeMiddlewareNext;
    req: IncomingMessage;
    res: ServerResponse<IncomingMessage>;
    runtimeEventSink: ReplayRuntimeEventSink | null;
}) => {
    try {
        const url = new URL(req.url ?? '/', 'http://127.0.0.1');
        const route = await findReplayRoute({ capture, req, url });
        const stripDecision = resolveMatchingStripDecision(url, activeStripDecisions);
        if (
            await maybeServeStripDecision({
                loudTelemetry,
                reqUrl: url,
                res,
                route,
                runtimeEventSink,
                stripDecision,
            })
        ) {
            return;
        }

        if (
            await maybeServeReplayRoute({
                loudTelemetry,
                next,
                res,
                route,
            })
        ) {
            return;
        }
    } catch (error) {
        next(error);
    }
};
