import { describe, expect, it } from 'bun:test';

import { buildReplayRuntimeModule } from './runtime-module.ts';
import type { LoadedReplayCapture } from './types.ts';

const capture: LoadedReplayCapture = {
    contentTypes: {},
    httpRoutes: [
        {
            body: '{"ok":true}',
            bodyEncoding: 'utf8',
            contentType: 'application/json',
            lookupKeys: [],
            method: 'GET',
            pathname: '/api/bootstrap',
            requestBodyHash: '',
            responseHeaders: {},
            search: '',
            status: 200,
            url: 'https://fixture.example.test/api/bootstrap',
        },
    ],
    securityHeaders: {
        detected: {
            coep: 'require-corp',
            coop: 'same-origin',
            cspMain: null,
            csrf: null,
        },
        donorHeaders: {},
        required: {
            crossOriginIsolated: true,
        },
        schemaVersion: 'shibuk-security-headers/v1',
    },
    serviceWorkers: [
        {
            capturedScript: 'self.addEventListener("fetch", () => {});',
            detectionEvidence: [],
            purpose: 'asset-cache',
            registeredFrom: ['https://fixture.example.test/assets/app.js'],
            scope: 'https://fixture.example.test/app/',
            scriptUrl: 'https://fixture.example.test/sw.js?v=2',
        },
    ],
    storageSeed: {
        cookies: [],
        localStorage: {},
        sessionStorage: {},
    },
    stripDecisions: {
        decisions: [
            {
                action: 'replay-script',
                category: 'service-worker',
                id: 'sw-1',
                rationale: 'replay',
                supersedes: null,
                target: {
                    kind: 'service-worker',
                    value: 'https://fixture.example.test/sw.js?v=2',
                },
                tier: 'deterministic',
            },
        ],
    },
    websocketScripts: [
        {
            url: 'wss://fixture.example.test/socket',
        },
    ],
};

describe('buildReplayRuntimeModule', () => {
    it('should avoid embedding HTTP route data in dev runtime modules', async () => {
        const source = await buildReplayRuntimeModule({
            buildBehaviour: 'inline-static-get',
            capture,
            includeDevOnlyFeatures: true,
            loudTelemetry: true,
        });

        expect(source).not.toMatch(/"pathname"\s*:\s*"\/api\/bootstrap"/);
        expect(source).toContain('installReplayRuntime({');
        expect(source).toContain('includeClientHttpReplay: false');
        expect(source).toContain('includeDevOnlyFeatures: true');
    });

    it('should keep build runtime modules free of inline HTTP route tables', async () => {
        const source = await buildReplayRuntimeModule({
            buildBehaviour: 'inline-static-get',
            capture,
            includeDevOnlyFeatures: false,
            loudTelemetry: false,
        });

        expect(source).not.toMatch(/"pathname"\s*:\s*"\/api\/bootstrap"/);
        expect(source).not.toMatch(/"url"\s*:\s*"wss:\/\/fixture\.example\.test\/socket"/);
        expect(source).not.toMatch(/"cookie"/i);
        expect(source).not.toMatch(/"coop"\s*:\s*"same-origin"/);
        expect(source).toContain('installReplayRuntime({');
        expect(source).toContain('includeClientHttpReplay: false');
        expect(source).toContain('includeDevOnlyFeatures: false');
    });
});
