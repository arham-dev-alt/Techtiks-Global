import type { ReplayWebSocketScript } from './types.ts';

type InstallWebSocketRewriteOptions = {
    pageUrl: string;
    scripts: ReplayWebSocketScript[];
};

type ReplayGlobal = typeof globalThis & {
    __SHIBUK_REWRITE_WEBSOCKET_URL__?: (value: unknown) => string;
};

const normalizeSocketUrl = (protocol: string, host: string, pathname: string, search: string, hash: string) => {
    if (!host) {
        return null;
    }

    const normalizedPathname = pathname && pathname !== '/' ? pathname : '/';
    return `${protocol}//${host}${normalizedPathname}${search}${hash}`;
};

export const resolveWebSocketRuntimeTarget = (
    value: string,
    pageUrl: string,
    originalHost = '',
    preferredOriginalProtocol = '',
) => {
    if (typeof value !== 'string' || !value) {
        return null;
    }

    const explicitExternalTarget = resolveExplicitExternalSocketTarget(value);
    if (explicitExternalTarget) {
        return explicitExternalTarget;
    }

    const page = new URL(pageUrl);
    const defaultProtocol = page.protocol === 'http:' ? 'ws:' : 'wss:';
    let url: URL;
    try {
        url = new URL(value, page);
    } catch {
        return null;
    }

    const rewrittenExternalTarget = resolveRewrittenExternalSocketTarget(url, defaultProtocol);
    if (rewrittenExternalTarget) {
        return rewrittenExternalTarget;
    }

    if (url.protocol !== 'ws:' && url.protocol !== 'wss:') {
        return null;
    }

    return resolveStandardSocketTarget(url, page, originalHost, preferredOriginalProtocol);
};

const resolveExplicitExternalSocketTarget = (value: string) => {
    const explicitExternalSocketMatch = value.match(/^(wss?:)\/\/_external\/([^/?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i);
    if (!explicitExternalSocketMatch?.[1] || !explicitExternalSocketMatch[2]) {
        return null;
    }

    return normalizeSocketUrl(
        explicitExternalSocketMatch[1].toLowerCase(),
        explicitExternalSocketMatch[2],
        explicitExternalSocketMatch[3] ?? '/',
        explicitExternalSocketMatch[4] ?? '',
        explicitExternalSocketMatch[5] ?? '',
    );
};

const resolveRewrittenExternalSocketTarget = (url: URL, defaultProtocol: string) => {
    const externalSocketMatch = url.pathname.match(/^\/_external\/([^/]+)(\/.*)?$/);
    if (!externalSocketMatch?.[1]) {
        return null;
    }

    const protocol = url.protocol === 'ws:' || url.protocol === 'wss:' ? url.protocol : defaultProtocol;
    return normalizeSocketUrl(protocol, externalSocketMatch[1], externalSocketMatch[2] ?? '/', url.search, url.hash);
};

const resolveStandardSocketTarget = (url: URL, page: URL, originalHost: string, preferredOriginalProtocol = '') => {
    const protocol = preferredOriginalProtocol || url.protocol;
    if (url.hostname === '.' || url.host === '.') {
        return normalizeSocketUrl(protocol, originalHost || page.host, url.pathname, url.search, url.hash);
    }
    if (originalHost && url.host === page.host && page.host !== originalHost) {
        return normalizeSocketUrl(protocol, originalHost, url.pathname, url.search, url.hash);
    }
    return url.toString();
};

export const buildReplayClientUrl = (
    localHref: string,
    targetUrl: string,
    replayEndpoint = '/__shibuk/replay/websocket',
) => {
    const local = new URL(localHref);
    local.protocol = local.protocol === 'https:' ? 'wss:' : 'ws:';
    local.pathname = replayEndpoint;
    local.search = '';
    local.hash = '';
    local.searchParams.set('url', targetUrl);
    local.searchParams.set('mode', 'hybrid');
    return local.toString();
};

export const installWebSocketRewrite = ({ pageUrl, scripts }: InstallWebSocketRewriteOptions) => {
    if (typeof globalThis !== 'object' || typeof window === 'undefined') {
        return;
    }

    const targetUrls = scripts.map((script) => script.url).sort();
    if (targetUrls.length === 0) {
        return;
    }

    const originalHosts = Array.from(
        new Set(
            targetUrls
                .map((value) => {
                    try {
                        return new URL(value).host;
                    } catch {
                        return '';
                    }
                })
                .filter(Boolean),
        ),
    );
    const preferredOriginalHost = originalHosts.length === 1 ? originalHosts[0]! : '';
    const originalProtocols = Array.from(
        new Set(
            targetUrls
                .map((value) => {
                    try {
                        return new URL(value).protocol;
                    } catch {
                        return '';
                    }
                })
                .filter(Boolean),
        ),
    );
    const preferredOriginalProtocol = originalProtocols.length === 1 ? originalProtocols[0]! : '';
    const webSocketReplayTargets = new Set(targetUrls);
    const NativeWebSocket = window.WebSocket;
    const replayGlobal = globalThis as ReplayGlobal;

    replayGlobal.__SHIBUK_REWRITE_WEBSOCKET_URL__ = (value: unknown) => {
        const rawValue = value instanceof URL ? value.toString() : String(value ?? '');
        if (!rawValue) {
            return rawValue;
        }

        const targetUrl = resolveWebSocketRuntimeTarget(
            rawValue,
            pageUrl,
            preferredOriginalHost,
            preferredOriginalProtocol,
        );
        if (!targetUrl || !webSocketReplayTargets.has(targetUrl)) {
            return rawValue;
        }

        return buildReplayClientUrl(pageUrl, targetUrl);
    };

    class ShibukReplayWebSocket extends NativeWebSocket {
        constructor(url: string | URL, protocols?: string | string[]) {
            const rewrittenUrl = replayGlobal.__SHIBUK_REWRITE_WEBSOCKET_URL__?.(url) ?? url;
            super(rewrittenUrl as string | URL, protocols);
        }
    }

    Object.defineProperty(ShibukReplayWebSocket, 'CONNECTING', { value: NativeWebSocket.CONNECTING });
    Object.defineProperty(ShibukReplayWebSocket, 'OPEN', { value: NativeWebSocket.OPEN });
    Object.defineProperty(ShibukReplayWebSocket, 'CLOSING', { value: NativeWebSocket.CLOSING });
    Object.defineProperty(ShibukReplayWebSocket, 'CLOSED', { value: NativeWebSocket.CLOSED });
    window.WebSocket = ShibukReplayWebSocket as typeof window.WebSocket;
};
