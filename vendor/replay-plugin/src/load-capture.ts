import { createHash } from 'node:crypto';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import type {
    LoadedReplayCapture,
    ReplayHttpRoute,
    ReplaySecurityHeaders,
    ReplayServiceWorker,
    ReplayStorageSeed,
    ReplayWebSocketScript,
} from './types.ts';

type StoredRouteRecord = {
    body?: string;
    bodyEncoding?: 'base64' | 'utf8';
    bodyRef?: {
        path: string;
    };
    contentType?: string;
    lookupKey?: string;
    lookupKeys?: string[];
    method?: string;
    pathname?: string;
    requestBodyHash?: string;
    responseHeaders?: Record<string, string>;
    search?: string;
    status?: number;
    url?: string;
};

const DEFAULT_STORAGE_SEED: ReplayStorageSeed = {
    cookies: [],
    localStorage: {},
    sessionStorage: {},
};

const DEFAULT_SECURITY_HEADERS: ReplaySecurityHeaders = {
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
};
const NORMALIZED_HASHED_JSON_FILES = new Set(['runtime-probe.json', '_external/.captured-hosts.json']);
const ROUTE_BODY_PATH = Symbol('shibukReplayRouteBodyPath');
const ROUTE_BODY_PAYLOAD = Symbol('shibukReplayRouteBodyPayload');
const ROUTE_BODY_TEXT = Symbol('shibukReplayRouteBodyText');

type ReplayRouteBodyCache = {
    getText: (key: string) => Promise<string>;
};
type ReplayHttpRouteWithCache = ReplayHttpRoute & {
    [ROUTE_BODY_PATH]?: string;
    [ROUTE_BODY_PAYLOAD]?: string | Uint8Array;
    [ROUTE_BODY_TEXT]?: string;
};

const rememberCacheEntry = <T>(cache: Map<string, T>, key: string, value: T, maxEntries: number) => {
    if (cache.has(key)) {
        cache.delete(key);
    }
    cache.set(key, value);

    while (cache.size > maxEntries) {
        const oldestKey = cache.keys().next().value;
        if (typeof oldestKey !== 'string') {
            break;
        }
        cache.delete(oldestKey);
    }

    return value;
};

const getBunRuntime = () => {
    return (globalThis as { Bun?: typeof Bun }).Bun;
};

const fileExists = async (filePath: string) => {
    const bunRuntime = getBunRuntime();
    if (bunRuntime) {
        return await bunRuntime.file(filePath).exists();
    }

    try {
        const { access } = await import('node:fs/promises');
        await access(filePath);
        return true;
    } catch {
        return false;
    }
};

const readWholeFileText = async (filePath: string) => {
    const bunRuntime = getBunRuntime();
    if (bunRuntime) {
        return await bunRuntime.file(filePath).text();
    }

    const { open } = await import('node:fs/promises');
    const handle = await open(filePath, 'r');
    try {
        return await handle.readFile({ encoding: 'utf8' });
    } finally {
        await handle.close();
    }
};

const readWholeFileBytes = async (filePath: string) => {
    const bunRuntime = getBunRuntime();
    if (bunRuntime) {
        return new Uint8Array(await bunRuntime.file(filePath).arrayBuffer());
    }

    const { open } = await import('node:fs/promises');
    const handle = await open(filePath, 'r');
    try {
        return new Uint8Array(await handle.readFile());
    } finally {
        await handle.close();
    }
};

const readJsonFile = async <T>(filePath: string, fallback: T): Promise<T> => {
    if (!(await fileExists(filePath))) {
        return fallback;
    }

    try {
        return JSON.parse(await readWholeFileText(filePath)) as T;
    } catch {
        return fallback;
    }
};

const readTextFile = async (filePath: string) => {
    return await readWholeFileText(filePath);
};

const walkFiles = async (rootDir: string): Promise<string[]> => {
    try {
        const entries = await readdir(rootDir, { withFileTypes: true });
        const files: string[] = [];

        for (const entry of entries) {
            const entryPath = path.join(rootDir, entry.name);
            if (entry.isDirectory()) {
                files.push(...(await walkFiles(entryPath)));
                continue;
            }

            if (entry.isFile()) {
                files.push(entryPath);
            }
        }

        return files;
    } catch {
        return [];
    }
};

const normalizeHashedJsonRecord = (relativePath: string, parsed: Record<string, unknown>) => {
    if (relativePath === 'runtime-probe.json') {
        return {
            ...parsed,
            capturedAt: null,
            generatedAt: null,
        };
    }

    if (relativePath === '_external/.captured-hosts.json') {
        return {
            ...parsed,
            generatedAt: null,
        };
    }

    return parsed;
};

const hashDirectory = async (rootDir: string) => {
    const files = (await walkFiles(rootDir)).sort((left, right) => left.localeCompare(right));
    const fileHashes: Record<string, string> = {};
    const rootHasher = createHash('sha256');

    for (const filePath of files) {
        const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
        const sha256 = NORMALIZED_HASHED_JSON_FILES.has(relativePath)
            ? await readJsonFile<Record<string, unknown> | null>(filePath, null).then(async (parsed) => {
                  if (!parsed) {
                      return createHash('sha256')
                          .update(await readWholeFileBytes(filePath))
                          .digest('hex');
                  }

                  const normalized = normalizeHashedJsonRecord(relativePath, parsed);
                  return createHash('sha256')
                      .update(`${JSON.stringify(normalized, null, 2)}\n`)
                      .digest('hex');
              })
            : createHash('sha256')
                  .update(await readWholeFileBytes(filePath))
                  .digest('hex');
        fileHashes[relativePath] = sha256;
        rootHasher.update(`${relativePath}:${sha256}\n`);
    }

    return {
        fileHashes,
        rootHash: `sha256:${rootHasher.digest('hex')}`,
    };
};

const assertWorkspaceAslIntegrity = async (captureDir: string) => {
    const workspaceRoot = path.resolve(captureDir, '..', '..');
    const integrity = await readJsonFile<{ files?: Record<string, string>; rootHash?: string } | null>(
        path.join(workspaceRoot, 'asl', '.integrity.json'),
        null,
    );
    if (!integrity?.files || typeof integrity.rootHash !== 'string') {
        return;
    }

    const usesCombinedIntegrity = Object.keys(integrity.files).some(
        (relativePath) => relativePath.startsWith('donor/') || relativePath.startsWith('_network/'),
    );
    const donorHash = await hashDirectory(path.join(workspaceRoot, 'asl', 'donor'));
    const actualRootHash = usesCombinedIntegrity
        ? (() => {
              const rootHasher = createHash('sha256');
              const networkHash = hashDirectory(path.join(workspaceRoot, 'asl', '_network'));
              return networkHash.then((resolvedNetworkHash) => {
                  const combinedFiles = Object.entries({
                      ...Object.fromEntries(
                          Object.entries(donorHash.fileHashes).map(([relativePath, sha256]) => [
                              path.posix.join('donor', relativePath),
                              sha256,
                          ]),
                      ),
                      ...Object.fromEntries(
                          Object.entries(resolvedNetworkHash.fileHashes).map(([relativePath, sha256]) => [
                              path.posix.join('_network', relativePath),
                              sha256,
                          ]),
                      ),
                  }).sort(([left], [right]) => left.localeCompare(right));
                  for (const [relativePath, sha256] of combinedFiles) {
                      rootHasher.update(`${relativePath}:${sha256}\n`);
                  }
                  return `sha256:${rootHasher.digest('hex')}`;
              });
          })()
        : Promise.resolve(donorHash.rootHash);
    if ((await actualRootHash) !== integrity.rootHash) {
        throw new Error(
            `Replay capture refused because asl/ drifted from asl/.integrity.json: expected ${integrity.rootHash}, got ${await actualRootHash}`,
        );
    }
};

export const createReplayRouteBodyCache = ({
    maxEntries: _maxEntries = Number.POSITIVE_INFINITY,
    readBody,
}: {
    maxEntries?: number;
    readBody: (key: string) => Promise<string>;
}): ReplayRouteBodyCache => {
    const cache = new Map<string, Promise<string>>();

    return {
        getText: async (key: string) => {
            const cachedPromise = cache.get(key);
            if (cachedPromise) {
                return await rememberCacheEntry(cache, key, cachedPromise, _maxEntries);
            }

            const pendingRead = readBody(key)
                .then((value) => {
                    rememberCacheEntry(cache, key, Promise.resolve(value), _maxEntries);
                    return value;
                })
                .catch((error) => {
                    cache.delete(key);
                    throw error;
                });
            rememberCacheEntry(cache, key, pendingRead, _maxEntries);
            return await pendingRead;
        },
    };
};

const walkJsonFiles = async (rootDir: string): Promise<string[]> => {
    try {
        const entries = await readdir(rootDir, { withFileTypes: true });
        const files: string[] = [];

        for (const entry of entries) {
            const entryPath = path.join(rootDir, entry.name);
            if (entry.isDirectory()) {
                files.push(...(await walkJsonFiles(entryPath)));
                continue;
            }

            if (entry.isFile() && entry.name.toLowerCase().endsWith('.json')) {
                files.push(entryPath);
            }
        }

        return files;
    } catch {
        return [];
    }
};

const resolveRouteBodyPath = (requestMockRoot: string, record: StoredRouteRecord) => {
    if (!record.bodyRef?.path) {
        return null;
    }

    const trimmedPath = record.bodyRef.path.replace(/^\/+/, '');
    return path.resolve(requestMockRoot, trimmedPath);
};

const loadStoredRequestRoutes = async (requestMockRoot: string) => {
    const routesDir = path.join(requestMockRoot, '__shibuk_mocks', 'requests');
    const routes: ReplayHttpRoute[] = [];

    for (const filePath of await walkJsonFiles(routesDir)) {
        const route = await loadStoredRequestRoute(filePath, requestMockRoot);
        if (!route) {
            continue;
        }
        routes.push(route);
    }

    return routes;
};

const loadStoredRequestRoute = async (filePath: string, requestMockRoot: string) => {
    const record = (await readJsonFile<StoredRouteRecord | null>(filePath, null)) as StoredRouteRecord | null;
    if (!record?.lookupKey || !record.method || !record.url) {
        return null;
    }

    const route = buildStoredRequestRoute(record);
    const bodyPath = resolveRouteBodyPath(requestMockRoot, record);
    if (bodyPath) {
        (route as ReplayHttpRouteWithCache)[ROUTE_BODY_PATH] = bodyPath;
    }
    return route;
};

const buildStoredRequestRoute = (record: StoredRouteRecord): ReplayHttpRoute => {
    const lookupKeys = (record.lookupKeys ?? [record.lookupKey]).filter((value): value is string => Boolean(value));
    const method = record.method ?? 'GET';
    const url = record.url ?? '';
    const parsedUrl = new URL(url);
    return {
        ...(typeof record.body === 'string' ? { body: record.body } : {}),
        bodyEncoding: record.bodyEncoding === 'base64' ? 'base64' : 'utf8',
        ...(record.bodyRef?.path ? { bodyRef: { path: record.bodyRef.path } } : {}),
        contentType: record.contentType ?? 'application/octet-stream',
        lookupKeys,
        method: method.toUpperCase(),
        pathname: record.pathname ?? parsedUrl.pathname,
        requestBodyHash: record.requestBodyHash ?? '',
        responseHeaders: record.responseHeaders ?? {},
        search: record.search ?? parsedUrl.search,
        status: record.status ?? 200,
        url,
    };
};

const loadSimpleJsonRoutes = async (requestMockRoot: string) => {
    const routes: ReplayHttpRoute[] = [];

    for (const filePath of await walkJsonFiles(requestMockRoot)) {
        if (path.basename(filePath) !== '__default__.json') {
            continue;
        }
        if (filePath.includes(`${path.sep}__shibuk_mocks${path.sep}`)) {
            continue;
        }

        const relativePath = path.relative(requestMockRoot, filePath).replace(/\\/g, '/');
        const directoryPath = path.dirname(relativePath).replace(/\\/g, '/');
        routes.push({
            body: JSON.stringify(await readJsonFile(filePath, null)),
            bodyEncoding: 'utf8',
            contentType: 'application/json',
            lookupKeys: [],
            method: '*',
            pathname: `/${directoryPath === '.' ? '' : directoryPath}`.replace(/\/+$/, '') || '/',
            requestBodyHash: '',
            responseHeaders: {},
            search: '',
            status: 200,
            url: '',
        });
    }

    return routes;
};

const loadWebSocketScripts = async (websocketRoot: string) => {
    const scripts: ReplayWebSocketScript[] = [];

    for (const filePath of await walkJsonFiles(websocketRoot)) {
        const parsed = await readJsonFile<unknown>(filePath, null);
        const candidates = Array.isArray(parsed) ? parsed : [parsed];
        for (const candidate of candidates) {
            if (
                !candidate ||
                typeof candidate !== 'object' ||
                typeof (candidate as { url?: unknown }).url !== 'string'
            ) {
                continue;
            }
            scripts.push(candidate as ReplayWebSocketScript);
        }
    }

    return scripts;
};

const readReplayRouteBodyText = async (route: ReplayHttpRoute) => {
    if (typeof route.body === 'string') {
        return route.body;
    }

    const cachedRoute = route as ReplayHttpRouteWithCache;
    if (typeof cachedRoute[ROUTE_BODY_TEXT] === 'string') {
        return cachedRoute[ROUTE_BODY_TEXT];
    }

    const bodyPath = cachedRoute[ROUTE_BODY_PATH];
    if (!bodyPath) {
        return '';
    }

    const bodyText = await readTextFile(bodyPath);
    cachedRoute[ROUTE_BODY_TEXT] = bodyText;
    return bodyText;
};

export const materializeReplayHttpRoutes = async (routes: ReplayHttpRoute[]) => {
    return await Promise.all(
        routes.map(async (route) => ({
            ...route,
            body: await readReplayRouteBodyText(route),
        })),
    );
};

export const readReplayRoutePayload = async (route: ReplayHttpRoute) => {
    const cachedRoute = route as ReplayHttpRouteWithCache;
    if (cachedRoute[ROUTE_BODY_PAYLOAD]) {
        return cachedRoute[ROUTE_BODY_PAYLOAD];
    }

    const bodyText = await readReplayRouteBodyText(route);
    const payload = route.bodyEncoding === 'base64' ? new Uint8Array(Buffer.from(bodyText, 'base64')) : bodyText;
    cachedRoute[ROUTE_BODY_PAYLOAD] = payload;
    return payload;
};

export const loadReplayCapture = async (captureDir: string): Promise<LoadedReplayCapture> => {
    await assertWorkspaceAslIntegrity(captureDir);
    const [
        contentTypes,
        securityHeaders,
        serviceWorkers,
        storageSeed,
        stripDecisions,
        requestRoutes,
        simpleJsonRoutes,
        websocketScripts,
    ] = await Promise.all([
        readJsonFile<Record<string, string>>(path.join(captureDir, 'graph', 'content-types.json'), {}),
        readJsonFile<ReplaySecurityHeaders>(path.join(captureDir, 'security-headers.json'), DEFAULT_SECURITY_HEADERS),
        readJsonFile<{ schemaVersion?: string; workers?: ReplayServiceWorker[] }>(
            path.join(captureDir, 'service-workers.json'),
            { workers: [] },
        ).then((parsed) => parsed.workers ?? []),
        readJsonFile<ReplayStorageSeed>(path.join(captureDir, 'storage', 'boot.json'), DEFAULT_STORAGE_SEED),
        readJsonFile<LoadedReplayCapture['stripDecisions']>(path.join(captureDir, 'strip-decisions.json'), {
            decisions: [],
        }),
        loadStoredRequestRoutes(path.join(captureDir, 'http')).catch(() => []),
        loadSimpleJsonRoutes(path.join(captureDir, 'http')).catch(() => []),
        loadWebSocketScripts(path.join(captureDir, 'websocket')).catch(() => []),
    ]);

    return {
        contentTypes,
        httpRoutes: [...requestRoutes, ...simpleJsonRoutes],
        securityHeaders,
        serviceWorkers,
        storageSeed,
        stripDecisions,
        websocketScripts,
    };
};
