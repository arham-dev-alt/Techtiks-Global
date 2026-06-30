import { access } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import type { Plugin } from 'vite';
import {
    buildInlineStaticGetRouteIndex,
    type InlineStaticGetRouteIndex,
    loadInlineStaticGetVirtualModule,
    resolveInlineStaticGetVirtualId,
    transformInlineStaticGetSource,
} from './build-transform.ts';
import { createReplayHttpMiddleware } from './http-dev-server.ts';
import { loadReplayCapture } from './load-capture.ts';
import { servePrecompressedPublicAsset } from './precompressed-public-assets.ts';
import { createReplayRuntimeEventSink, type ReplayRuntimeEventSink } from './runtime-events.ts';
import { buildReplayRuntimeModule } from './runtime-module.ts';
import { resolveActiveStripDecisions } from './strip-runtime.ts';
import type { LoadedReplayCapture } from './types.ts';
import { attachReplayWebSocketServer } from './websocket-dev-server.ts';

export type ShibukReplayPluginOptions = {
    buildBehaviour?: 'inline-static-get' | 'drop-all';
    labCapturePath?: string;
    loudTelemetry?: boolean;
};

const DEFAULT_CAPTURE_PATH = '.lab/capture';
type NodeMiddlewareNext = (error?: unknown) => void;
type ConnectMiddleware = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: NodeMiddlewareNext,
) => void | Promise<void>;

let replayPluginVersionPromise: Promise<string> | null = null;

const loadReplayPluginVersion = async () => {
    replayPluginVersionPromise ??= (async () => {
        try {
            const packageJsonUrl = new URL('../package.json', import.meta.url);
            if (typeof Bun !== 'undefined') {
                const parsed = (await Bun.file(packageJsonUrl).json()) as { version?: unknown };
                return typeof parsed.version === 'string' ? parsed.version : '0.0.0';
            }

            const fsPromises = await import('node:fs/promises');
            const parsed = JSON.parse(await fsPromises.readFile(packageJsonUrl, 'utf8')) as { version?: unknown };
            return typeof parsed.version === 'string' ? parsed.version : '0.0.0';
        } catch {
            return '0.0.0';
        }
    })();

    return await replayPluginVersionPromise;
};

export const shibukReplayPlugin = (options: ShibukReplayPluginOptions = {}): Plugin => {
    const buildBehaviour = options.buildBehaviour ?? 'inline-static-get';
    let capture: LoadedReplayCapture | null = null;
    let buildRouteIndex: InlineStaticGetRouteIndex = buildInlineStaticGetRouteIndex([]);
    let configRoot = process.cwd();
    let buildOutDir = path.resolve(configRoot, 'dist');
    let command: 'build' | 'serve' = 'serve';
    let runtimeEventSink: ReplayRuntimeEventSink | null = null;
    let warnedMissingCapture = false;

    const warnMissingCapture = () => {
        if (warnedMissingCapture) {
            return;
        }

        warnedMissingCapture = true;
        console.warn('[shibuk-replay] capture directory is missing; replay plugin is running in passthrough mode.');
    };

    const resolveLoudTelemetry = () => {
        if (typeof options.loudTelemetry === 'boolean') {
            return options.loudTelemetry;
        }

        return command === 'serve';
    };

    const resolveCaptureDir = () => {
        return path.resolve(configRoot, options.labCapturePath ?? DEFAULT_CAPTURE_PATH);
    };

    const resolveReplaySecurityHeaders = () => {
        if (!capture) {
            return null;
        }

        const headers: Record<string, string> = {};
        if (capture.securityHeaders.required.crossOriginIsolated) {
            headers['Cross-Origin-Opener-Policy'] = 'same-origin';
            headers['Cross-Origin-Embedder-Policy'] = 'require-corp';
            return headers;
        }

        if (capture.securityHeaders.detected.coop) {
            headers['Cross-Origin-Opener-Policy'] = capture.securityHeaders.detected.coop;
        }
        if (capture.securityHeaders.detected.coep) {
            headers['Cross-Origin-Embedder-Policy'] = capture.securityHeaders.detected.coep;
        }

        return Object.keys(headers).length > 0 ? headers : null;
    };

    const applySecurityHeaders = (res: ServerResponse<IncomingMessage>) => {
        const headers = resolveReplaySecurityHeaders();
        if (!headers) {
            return;
        }

        for (const [name, value] of Object.entries(headers)) {
            res.setHeader(name, value);
        }
    };

    const createSecurityHeadersMiddleware = () => {
        return (_req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: NodeMiddlewareNext) => {
            applySecurityHeaders(res);
            next();
        };
    };

    const createPrecompressedPublicAssetMiddleware = (publicDir: string) => {
        return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: NodeMiddlewareNext) => {
            if (await servePrecompressedPublicAsset({ publicDir, req, res })) {
                return;
            }

            next();
        };
    };

    const createServiceWorkerMiddleware = (loudTelemetry: boolean) => {
        const activeCapture = capture;
        if (!activeCapture) {
            return ((_req, _res, next) => next()) satisfies ConnectMiddleware;
        }

        const toWorkerRequestKey = (value: string) => {
            const workerUrl = new URL(value);
            return `${workerUrl.pathname}${workerUrl.search}`;
        };
        const normalizeScopeHeader = (value: string) => {
            return new URL(value, 'http://localhost').pathname;
        };

        const replayableWorkers = new Map(
            resolveActiveStripDecisions(activeCapture.stripDecisions.decisions)
                .filter((decision) => decision.category === 'service-worker' && decision.action === 'replay-script')
                .map((decision) => {
                    const worker =
                        activeCapture.serviceWorkers.find(
                            (candidate) => candidate.scriptUrl === decision.target.value,
                        ) ?? null;
                    if (!worker?.capturedScript) {
                        return null;
                    }

                    return [toWorkerRequestKey(worker.scriptUrl), worker] as const;
                })
                .filter((entry): entry is readonly [string, (typeof activeCapture.serviceWorkers)[number]] =>
                    Boolean(entry),
                ),
        );
        if (replayableWorkers.size === 0) {
            return ((_req, _res, next) => next()) satisfies ConnectMiddleware;
        }

        return ((req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: NodeMiddlewareNext) => {
            try {
                const requestUrl = new URL(req.url ?? '/', 'http://127.0.0.1');
                const worker = replayableWorkers.get(`${requestUrl.pathname}${requestUrl.search}`);
                if (!worker?.capturedScript) {
                    next();
                    return;
                }

                applySecurityHeaders(res);
                res.statusCode = 200;
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                res.setHeader('Service-Worker', 'script');
                res.setHeader('Service-Worker-Allowed', normalizeScopeHeader(worker.scope));
                res.end(worker.capturedScript);
                if (loudTelemetry) {
                    console.info('[shibuk-replay]', 'served-service-worker', worker.scriptUrl);
                }
            } catch (error) {
                next(error);
            }
        }) satisfies ConnectMiddleware;
    };

    const configureReplayMiddlewares = ({
        httpServer,
        middlewares,
    }: {
        httpServer: Parameters<typeof attachReplayWebSocketServer>[0]['httpServer'] | null | undefined;
        middlewares: {
            use: (handler: ConnectMiddleware) => void;
        };
    }) => {
        if (!capture) {
            return;
        }

        if (httpServer) {
            attachReplayWebSocketServer({
                httpServer,
                loudTelemetry: resolveLoudTelemetry(),
                scripts: capture.websocketScripts,
                stripDecisions: capture.stripDecisions.decisions,
            });
        }

        middlewares.use(createSecurityHeadersMiddleware());
        middlewares.use(createServiceWorkerMiddleware(resolveLoudTelemetry()));
        middlewares.use(createPrecompressedPublicAssetMiddleware(path.join(configRoot, 'public')));
        middlewares.use(
            createReplayHttpMiddleware({
                capture,
                loudTelemetry: resolveLoudTelemetry(),
                runtimeEventSink,
            }),
        );
    };

    const writeDeploymentHeaders = async () => {
        const headers = resolveReplaySecurityHeaders();
        if (!headers || command !== 'build') {
            return;
        }

        const fsPromises = await import('node:fs/promises');
        const headersFile = ['/*', ...Object.entries(headers).map(([name, value]) => `  ${name}: ${value}`), ''].join(
            '\n',
        );
        const headersJson = {
            ...headers,
        };
        const shippingDoc = `# Shipping Headers

Your deployment must send these headers for the built replay to keep \`window.crossOriginIsolated === true\` and expose \`SharedArrayBuffer\`:

${Object.entries(headers)
    .map(([name, value]) => `- \`${name}: ${value}\``)
    .join('\n')}

Netlify can use \`dist/_headers\`. Other platforms can read \`dist/headers.json\` and apply the same values.

## Verify

\`\`\`bash
curl -I https://your-deployment.example | grep -i cross-origin
\`\`\`

In the browser console, confirm:

\`\`\`js
window.crossOriginIsolated
typeof SharedArrayBuffer
\`\`\`

## Common Hosts

### Vercel

Mirror the header pairs from \`dist/headers.json\` into \`vercel.json > headers\`.

### Cloudflare Pages

Copy the contents of \`dist/_headers\` into the deployed \`_headers\` file.
`;
        await fsPromises.mkdir(buildOutDir, { recursive: true });
        if (typeof Bun !== 'undefined') {
            await Bun.write(path.join(buildOutDir, '_headers'), headersFile);
            await Bun.write(path.join(buildOutDir, 'headers.json'), `${JSON.stringify(headersJson, null, 2)}\n`);
            await Bun.write(path.join(buildOutDir, 'SHIPPING.md'), shippingDoc);
            return;
        }

        await fsPromises.writeFile(path.join(buildOutDir, '_headers'), headersFile);
        await fsPromises.writeFile(path.join(buildOutDir, 'headers.json'), `${JSON.stringify(headersJson, null, 2)}\n`);
        await fsPromises.writeFile(path.join(buildOutDir, 'SHIPPING.md'), shippingDoc);
    };

    return {
        async buildEnd() {
            await runtimeEventSink?.close();
            runtimeEventSink = null;
        },
        async closeBundle() {
            await runtimeEventSink?.close();
            runtimeEventSink = null;
            await writeDeploymentHeaders();
        },
        async configResolved(config) {
            command = config.command;
            configRoot = config.root;
            buildOutDir = path.resolve(config.root, config.build.outDir);
            const captureDir = resolveCaptureDir();
            try {
                await access(captureDir);
            } catch {
                capture = null;
                warnMissingCapture();
                return;
            }

            capture = await loadReplayCapture(captureDir);
            buildRouteIndex = buildInlineStaticGetRouteIndex(capture.httpRoutes);
            runtimeEventSink = null;
            if (command === 'serve') {
                try {
                    runtimeEventSink = await createReplayRuntimeEventSink({
                        emitterVersion: await loadReplayPluginVersion(),
                        source: 'shibuk-replay',
                        workspaceRoot: configRoot,
                    });
                } catch {
                    runtimeEventSink = null;
                }
            }
        },
        configurePreviewServer(server) {
            if (!capture) {
                return;
            }

            configureReplayMiddlewares({
                httpServer: server.httpServer as Parameters<typeof attachReplayWebSocketServer>[0]['httpServer'],
                middlewares: server.middlewares,
            });
        },
        configureServer(server) {
            if (!capture) {
                return;
            }

            configureReplayMiddlewares({
                httpServer: server.httpServer as Parameters<typeof attachReplayWebSocketServer>[0]['httpServer'],
                middlewares: server.middlewares,
            });
        },
        enforce: 'post',
        load(id) {
            if (command !== 'build' || buildBehaviour !== 'inline-static-get') {
                return null;
            }

            return loadInlineStaticGetVirtualModule(buildRouteIndex, id);
        },
        name: 'shibuk-replay-plugin',
        resolveId(source) {
            if (command !== 'build' || buildBehaviour !== 'inline-static-get') {
                return null;
            }

            return resolveInlineStaticGetVirtualId(buildRouteIndex, source);
        },
        transform(code, _id) {
            if (command !== 'build' || buildBehaviour !== 'inline-static-get' || !capture) {
                return null;
            }

            const result = transformInlineStaticGetSource({
                code,
                routeIndex: buildRouteIndex,
            });
            if (!result) {
                return null;
            }

            return {
                code: result.code,
                map: null,
            };
        },
        async transformIndexHtml(html) {
            if (!capture && command === 'build' && buildBehaviour === 'drop-all') {
                return html;
            }

            if (!capture) {
                warnMissingCapture();
                return html;
            }

            return {
                html,
                tags: [
                    {
                        attrs: {
                            type: 'module',
                        },
                        children: await buildReplayRuntimeModule({
                            buildBehaviour,
                            capture,
                            includeDevOnlyFeatures: command === 'serve',
                            loudTelemetry: resolveLoudTelemetry(),
                        }),
                        injectTo: 'head-prepend',
                        tag: 'script',
                    },
                ],
            };
        },
    } satisfies Plugin;
};

export default shibukReplayPlugin;
