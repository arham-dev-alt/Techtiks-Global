import { describe, expect, it } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';

import { createReplayHttpMiddleware } from './http-dev-server.ts';
import { loadReplayCapture } from './load-capture.ts';
import type { LoadedReplayCapture } from './types.ts';

const createCapture = (): LoadedReplayCapture => ({
    contentTypes: {},
    httpRoutes: [
        {
            body: '{"message":"ok"}',
            bodyEncoding: 'utf8',
            contentType: 'application/json',
            lookupKeys: [],
            method: 'GET',
            pathname: '/api/bootstrap',
            requestBodyHash: '',
            responseHeaders: {
                'x-test': '1',
            },
            search: '',
            status: 200,
            url: 'https://fixture.example.test/api/bootstrap',
        },
    ],
    securityHeaders: {
        detected: {
            coep: null,
            coop: null,
            cspMain: null,
            csrf: null,
        },
        donorHeaders: {},
        required: {
            crossOriginIsolated: false,
        },
        schemaVersion: 'shibuk-security-headers/v1',
    },
    serviceWorkers: [],
    storageSeed: {
        cookies: [],
        localStorage: {},
        sessionStorage: {},
    },
    stripDecisions: {
        decisions: [],
    },
    websocketScripts: [],
});

const createResponse = () => {
    const bodyChunks: Buffer[] = [];
    const headers = new Map<string, string>();
    return {
        bodyChunks,
        headers,
        res: {
            end: (body?: string | Buffer) => {
                if (body) {
                    bodyChunks.push(typeof body === 'string' ? Buffer.from(body) : body);
                }
            },
            setHeader: (name: string, value: string) => {
                headers.set(name.toLowerCase(), value);
            },
            statusCode: 200,
        },
    };
};

describe('createReplayHttpMiddleware', () => {
    it('should serve captured HTTP routes directly from dev middleware', async () => {
        const middleware = createReplayHttpMiddleware({
            capture: createCapture(),
            loudTelemetry: false,
        });
        const req = new PassThrough() as PassThrough & {
            method: string;
            url: string;
        };
        req.method = 'GET';
        req.url = '/api/bootstrap';
        req.end();

        const { bodyChunks, headers, res } = createResponse();
        let nextCalled = false;
        await middleware(req as never, res as never, () => {
            nextCalled = true;
        });

        expect(nextCalled).toBeFalse();
        expect(res.statusCode).toBe(200);
        expect(headers.get('content-type')).toBe('application/json');
        expect(headers.get('x-test')).toBe('1');
        expect(Buffer.concat(bodyChunks).toString('utf8')).toContain('"message":"ok"');
    });

    it('should serve lazy bodyRef-backed routes after a request match', async () => {
        const captureDir = mkdtempSync(path.join(os.tmpdir(), 'shibuk-http-dev-server-'));
        try {
            const requestDir = path.join(captureDir, 'http', '__shibuk_mocks', 'requests');
            const bodyDir = path.join(captureDir, 'http', '__shibuk_mocks', 'request-bodies');
            mkdirSync(requestDir, { recursive: true });
            mkdirSync(bodyDir, { recursive: true });
            await Bun.write(path.join(bodyDir, 'body.txt'), '{"message":"lazy"}');
            await Bun.write(
                path.join(requestDir, 'bootstrap.json'),
                `${JSON.stringify(
                    {
                        bodyEncoding: 'utf8',
                        bodyRef: {
                            path: '/__shibuk_mocks/request-bodies/body.txt',
                        },
                        contentType: 'application/json',
                        lookupKey: 'GET:/api/bootstrap',
                        lookupKeys: ['GET:/api/bootstrap'],
                        method: 'GET',
                        pathname: '/api/bootstrap',
                        requestBodyHash: '',
                        responseHeaders: {},
                        search: '',
                        status: 200,
                        url: 'https://fixture.example.test/api/bootstrap',
                    },
                    null,
                    2,
                )}\n`,
            );
            const capture = await loadReplayCapture(captureDir);
            const middleware = createReplayHttpMiddleware({
                capture,
                loudTelemetry: false,
            });
            const req = new PassThrough() as PassThrough & {
                method: string;
                url: string;
            };
            req.method = 'GET';
            req.url = '/api/bootstrap';
            req.end();

            const { bodyChunks, res } = createResponse();
            let nextCalled = false;
            await middleware(req as never, res as never, () => {
                nextCalled = true;
            });

            expect(nextCalled).toBeFalse();
            expect(Buffer.concat(bodyChunks).toString('utf8')).toContain('"message":"lazy"');
        } finally {
            rmSync(captureDir, { force: true, recursive: true });
        }
    });
});
