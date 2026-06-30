import { describe, expect, it } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { shibukReplayPlugin } from './index.ts';

const callConfigResolved = async (
    plugin: ReturnType<typeof shibukReplayPlugin>,
    root: string,
    command: 'build' | 'serve' = 'serve',
) => {
    const hook = plugin.configResolved;
    if (!hook) {
        return;
    }

    const config = {
        build: {
            outDir: 'dist',
        },
        command,
        root,
    } as never;

    if (typeof hook === 'function') {
        await hook.call({} as never, config);
        return;
    }

    await hook.handler.call({} as never, config);
};

const callTransformIndexHtml = async (plugin: ReturnType<typeof shibukReplayPlugin>, html: string) => {
    const hook = plugin.transformIndexHtml;
    if (!hook) {
        return html;
    }

    if (typeof hook === 'function') {
        return await hook.call({} as never, html, {} as never);
    }

    return await hook.handler.call({} as never, html, {} as never);
};

describe('shibukReplayPlugin', () => {
    it('should degrade gracefully when .lab/capture is missing', async () => {
        const workspaceDir = mkdtempSync(path.join(tmpdir(), 'shibuk-replay-plugin-'));
        try {
            const plugin = shibukReplayPlugin({
                labCapturePath: '.lab/capture',
            });

            await callConfigResolved(plugin, workspaceDir);

            expect(await callTransformIndexHtml(plugin, '<!doctype html><html><body></body></html>')).toBe(
                '<!doctype html><html><body></body></html>',
            );
        } finally {
            rmSync(workspaceDir, { force: true, recursive: true });
        }
    });

    it('should emit deployment header files for isolated captures during build', async () => {
        const workspaceDir = mkdtempSync(path.join(tmpdir(), 'shibuk-replay-plugin-build-'));
        try {
            const captureDir = path.join(workspaceDir, '.lab', 'capture');
            mkdirSync(captureDir, { recursive: true });
            await Bun.write(
                path.join(captureDir, 'security-headers.json'),
                `${JSON.stringify(
                    {
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
                    null,
                    2,
                )}\n`,
            );
            await Bun.write(
                path.join(captureDir, 'service-workers.json'),
                `${JSON.stringify({ schemaVersion: 'shibuk-sw-capture/v1', workers: [] }, null, 2)}\n`,
            );
            await Bun.write(
                path.join(captureDir, 'strip-decisions.json'),
                `${JSON.stringify({ decisions: [], finalisedAt: null, schemaVersion: 'shibuk-strip-decisions/v1' }, null, 2)}\n`,
            );

            const plugin = shibukReplayPlugin({
                labCapturePath: '.lab/capture',
            });
            await callConfigResolved(plugin, workspaceDir, 'build');

            const hook = plugin.closeBundle;
            if (typeof hook === 'function') {
                await hook.call({} as never);
            } else {
                await hook?.handler.call({} as never);
            }

            expect(await Bun.file(path.join(workspaceDir, 'dist', '_headers')).text()).toContain(
                'Cross-Origin-Opener-Policy: same-origin',
            );
            expect(await Bun.file(path.join(workspaceDir, 'dist', 'headers.json')).json()).toEqual({
                'Cross-Origin-Embedder-Policy': 'require-corp',
                'Cross-Origin-Opener-Policy': 'same-origin',
            });
            expect(await Bun.file(path.join(workspaceDir, 'dist', 'SHIPPING.md')).text()).toContain(
                'SharedArrayBuffer',
            );
        } finally {
            rmSync(workspaceDir, { force: true, recursive: true });
        }
    });
});
