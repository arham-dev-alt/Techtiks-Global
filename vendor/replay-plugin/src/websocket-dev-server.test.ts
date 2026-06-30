import { describe, expect, it } from 'bun:test';

import { shouldLogServedReplayWebSocketFrame } from './websocket-dev-server.ts';

describe('shouldLogServedReplayWebSocketFrame', () => {
    it('should suppress ordinary replay frame logs even when loud telemetry is enabled', () => {
        expect(
            shouldLogServedReplayWebSocketFrame({
                loudTelemetry: true,
                shapeStub: false,
            }),
        ).toBe(false);
    });

    it('should keep shape-stub websocket frame logs when loud telemetry is enabled', () => {
        expect(
            shouldLogServedReplayWebSocketFrame({
                loudTelemetry: true,
                shapeStub: true,
            }),
        ).toBe(true);
    });
});
