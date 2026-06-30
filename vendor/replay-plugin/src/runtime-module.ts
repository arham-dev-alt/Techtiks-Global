import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { LoadedReplayCapture } from './types.ts';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundledBrowserRuntimePath = path.join(packageRoot, 'dist', 'browser-runtime.js');
const sourceBrowserRuntimePath = path.join(packageRoot, 'src', 'browser-runtime.ts');
let bundledBrowserRuntimeSourcePromise: Promise<string> | null = null;

const readBundledBrowserRuntimeFile = async (filePath: string) => {
    if (typeof Bun !== 'undefined') {
        const file = Bun.file(filePath);
        if (await file.exists()) {
            return await file.text();
        }
        return null;
    }

    try {
        const fsPromises = await import('node:fs/promises');
        return await fsPromises.readFile(filePath, 'utf8');
    } catch {
        return null;
    }
};

const loadBundledBrowserRuntimeSource = async () => {
    if (bundledBrowserRuntimeSourcePromise) {
        return await bundledBrowserRuntimeSourcePromise;
    }

    bundledBrowserRuntimeSourcePromise = (async () => {
        const bundledRuntimeSource = await readBundledBrowserRuntimeFile(bundledBrowserRuntimePath);
        if (bundledRuntimeSource) {
            return bundledRuntimeSource;
        }
        if (typeof Bun === 'undefined') {
            throw new Error(`Replay browser runtime bundle is missing: ${bundledBrowserRuntimePath}`);
        }

        const buildResult = await Bun.build({
            entrypoints: [sourceBrowserRuntimePath],
            format: 'esm',
            target: 'browser',
        });
        if (!buildResult.success || buildResult.outputs.length === 0) {
            const message = buildResult.logs.map((entry) => entry.message).join('\n');
            throw new Error(`Failed to bundle replay browser runtime.${message ? `\n${message}` : ''}`);
        }

        return await buildResult.outputs[0]!.text();
    })();

    return await bundledBrowserRuntimeSourcePromise;
};

export const buildReplayRuntimeModule = async ({
    buildBehaviour,
    capture,
    includeDevOnlyFeatures,
    loudTelemetry,
}: {
    buildBehaviour: 'drop-all' | 'inline-static-get';
    capture: LoadedReplayCapture | null;
    includeDevOnlyFeatures: boolean;
    loudTelemetry: boolean;
}) => {
    if (!capture || buildBehaviour === 'drop-all') {
        return 'export {};\n';
    }

    const runtimeCapture: LoadedReplayCapture = includeDevOnlyFeatures
        ? {
              ...capture,
              httpRoutes: [],
          }
        : {
              ...capture,
              httpRoutes: [],
              securityHeaders: {
                  detected: {
                      coep: null,
                      coop: null,
                      cspMain: null,
                      csrf: null,
                  },
                  donorHeaders: {},
                  required: {
                      crossOriginIsolated: capture.securityHeaders.required.crossOriginIsolated,
                  },
                  schemaVersion: 'shibuk-security-headers/v1',
              },
              storageSeed: {
                  cookies: [],
                  localStorage: {},
                  sessionStorage: {},
              },
              websocketScripts: [],
          };
    const bundledRuntimeSource = await loadBundledBrowserRuntimeSource();

    return `${bundledRuntimeSource}

const __shibukReplayCapture = ${JSON.stringify(runtimeCapture, null, 2)};

installReplayRuntime({
  capture: __shibukReplayCapture,
  includeClientHttpReplay: false,
  includeDevOnlyFeatures: ${JSON.stringify(includeDevOnlyFeatures)},
  loudTelemetry: ${JSON.stringify(loudTelemetry)},
});

export {};
`;
};
