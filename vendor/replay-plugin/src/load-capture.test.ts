import { describe, expect, it } from 'bun:test';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createReplayRouteBodyCache, loadReplayCapture, materializeReplayHttpRoutes } from './load-capture.ts';

describe('createReplayRouteBodyCache', () => {
    it('should evict the least-recently-used entries when the cache grows past its limit', async () => {
        const reads: string[] = [];
        const cache = createReplayRouteBodyCache({
            maxEntries: 2,
            readBody: async (key) => {
                reads.push(key);
                return key.toUpperCase();
            },
        });

        expect(await cache.getText('one')).toBe('ONE');
        expect(await cache.getText('two')).toBe('TWO');
        expect(await cache.getText('one')).toBe('ONE');
        expect(await cache.getText('three')).toBe('THREE');
        expect(await cache.getText('two')).toBe('TWO');

        expect(reads).toEqual(['one', 'two', 'three', 'two']);
    });
});

describe('loadReplayCapture', () => {
    it('should keep bodyRef-backed route bodies lazy until materialization', async () => {
        const captureDir = mkdtempSync(path.join(os.tmpdir(), 'shibuk-replay-capture-'));
        try {
            const requestDir = path.join(captureDir, 'http', '__shibuk_mocks', 'requests');
            const bodyDir = path.join(captureDir, 'http', '__shibuk_mocks', 'request-bodies');
            mkdirSync(requestDir, { recursive: true });
            mkdirSync(bodyDir, { recursive: true });
            await Bun.write(path.join(bodyDir, 'body.txt'), '{"ok":true}');
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

            expect(capture.httpRoutes[0]?.body).toBeUndefined();

            const materializedRoutes = await materializeReplayHttpRoutes(capture.httpRoutes);
            expect(materializedRoutes[0]?.body).toBe('{"ok":true}');
        } finally {
            rmSync(captureDir, { force: true, recursive: true });
        }
    });

    it('should reject drifted asl snapshots when the workspace ships an integrity manifest', async () => {
        const workspaceDir = mkdtempSync(path.join(os.tmpdir(), 'shibuk-replay-capture-integrity-'));
        try {
            const captureDir = path.join(workspaceDir, '.lab', 'capture');
            mkdirSync(captureDir, { recursive: true });
            mkdirSync(path.join(workspaceDir, 'asl', 'donor'), { recursive: true });
            await Bun.write(path.join(workspaceDir, 'asl', 'donor', 'index.html'), '<!doctype html>');
            await Bun.write(
                path.join(workspaceDir, 'asl', '.integrity.json'),
                `${JSON.stringify(
                    {
                        files: {
                            'donor/index.html': 'deadbeef',
                        },
                        finalizedAt: '2026-05-13T00:00:00.000Z',
                        rootHash: 'sha256:deadbeef',
                        schemaVersion: 'shibuk-asl-integrity/v1',
                    },
                    null,
                    2,
                )}\n`,
            );

            await expect(loadReplayCapture(captureDir)).rejects.toThrow('Replay capture refused because asl/ drifted');
        } finally {
            rmSync(workspaceDir, { force: true, recursive: true });
        }
    });

    it('should normalize captured external host manifests when verifying workspace asl integrity', async () => {
        const workspaceDir = mkdtempSync(path.join(os.tmpdir(), 'shibuk-replay-capture-integrity-'));
        try {
            const captureDir = path.join(workspaceDir, '.lab', 'capture');
            const donorExternalDir = path.join(workspaceDir, 'asl', 'donor', '_external');
            mkdirSync(captureDir, { recursive: true });
            mkdirSync(donorExternalDir, { recursive: true });
            const normalizedManifestText = `${JSON.stringify(
                {
                    generatedAt: null,
                    hosts: ['cdn.example.test'],
                    schemaVersion: 'shibuk-captured-hosts/v1',
                },
                null,
                2,
            )}\n`;
            const manifestSha = createHash('sha256').update(normalizedManifestText).digest('hex');
            const rootHash = createHash('sha256')
                .update(`donor/_external/.captured-hosts.json:${manifestSha}\n`)
                .digest('hex');
            await Bun.write(
                path.join(donorExternalDir, '.captured-hosts.json'),
                `${JSON.stringify(
                    {
                        generatedAt: '2026-05-21T00:00:00.000Z',
                        hosts: ['cdn.example.test'],
                        schemaVersion: 'shibuk-captured-hosts/v1',
                    },
                    null,
                    2,
                )}\n`,
            );
            await Bun.write(
                path.join(workspaceDir, 'asl', '.integrity.json'),
                `${JSON.stringify(
                    {
                        files: {
                            'donor/_external/.captured-hosts.json': manifestSha,
                        },
                        finalizedAt: '2026-05-21T00:00:00.000Z',
                        rootHash: `sha256:${rootHash}`,
                        schemaVersion: 'shibuk-asl-integrity/v1',
                    },
                    null,
                    2,
                )}\n`,
            );

            const capture = await loadReplayCapture(captureDir);
            expect(capture).toBeDefined();
        } finally {
            rmSync(workspaceDir, { force: true, recursive: true });
        }
    });
});
