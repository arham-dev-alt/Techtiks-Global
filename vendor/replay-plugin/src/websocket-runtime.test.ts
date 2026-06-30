import { describe, expect, it } from 'bun:test';
import { buildReplayClientUrl, installWebSocketRewrite, resolveWebSocketRuntimeTarget } from './websocket-runtime.ts';

type GlobalKey = 'window';

const replaceGlobal = <T>(key: GlobalKey, value: T) => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, {
        configurable: true,
        value,
        writable: true,
    });

    return () => {
        if (descriptor) {
            Object.defineProperty(globalThis, key, descriptor);
            return;
        }

        Reflect.deleteProperty(globalThis, key);
    };
};

describe('resolveWebSocketRuntimeTarget', () => {
    it('should resolve localized external websocket paths back to their original target', () => {
        expect(
            resolveWebSocketRuntimeTarget(
                '/_external/gateway.example.test/socket.io/?EIO=4&transport=websocket',
                'https://localhost:3000/',
            ),
        ).toBe('wss://gateway.example.test/socket.io/?EIO=4&transport=websocket');
    });

    it('should prefer the captured secure websocket protocol when replay rewrites a localhost same-origin socket back to the donor host', () => {
        expect(
            resolveWebSocketRuntimeTarget(
                'ws://127.0.0.1:3000/ws-rts',
                'http://127.0.0.1:3000/lobby',
                'donor.example.test',
                'wss:',
            ),
        ).toBe('wss://donor.example.test/ws-rts');
    });
});

describe('installWebSocketRewrite', () => {
    it('should wrap matching websocket targets with the replay endpoint', () => {
        const constructedUrls: string[] = [];
        class NativeWebSocketStub {
            static CLOSED = 3;
            static CLOSING = 2;
            static CONNECTING = 0;
            static OPEN = 1;

            constructor(url: string) {
                constructedUrls.push(url);
            }
        }

        const restoreWindow = replaceGlobal('window', {
            location: {
                href: 'https://localhost:3000/app',
            },
            WebSocket: NativeWebSocketStub,
        });

        try {
            installWebSocketRewrite({
                pageUrl: 'https://localhost:3000/app',
                scripts: [{ url: 'wss://gateway.example.test/socket' }],
            });

            const PatchedWebSocket = window.WebSocket as typeof NativeWebSocketStub;
            // eslint-disable-next-line no-new
            new PatchedWebSocket('/_external/gateway.example.test/socket');

            expect(constructedUrls).toEqual([
                buildReplayClientUrl(
                    'https://localhost:3000/app',
                    'wss://gateway.example.test/socket',
                    '/__shibuk/replay/websocket',
                ),
            ]);
        } finally {
            Reflect.deleteProperty(globalThis, '__SHIBUK_REWRITE_WEBSOCKET_URL__');
            restoreWindow();
        }
    });
});
