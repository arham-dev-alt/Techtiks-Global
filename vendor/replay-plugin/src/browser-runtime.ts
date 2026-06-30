import { installServiceWorkerPolicy } from './service-worker-runtime.ts';
import {
    buildStripDecisionResponse,
    resolveActiveStripDecisions,
    resolveMatchingStripDecision,
} from './strip-runtime.ts';
import type { LoadedReplayCapture, ReplayHttpRoute } from './types.ts';
import { installWebSocketRewrite } from './websocket-runtime.ts';

const applyStorageSeed = (capture: LoadedReplayCapture) => {
    const seed = capture.storageSeed;
    if (!hasReplayStorageSeed(seed) || typeof window === 'undefined') {
        return;
    }

    try {
        applyCookieSeed(seed.cookies);
        applyStorageEntries(window.localStorage, seed.localStorage);
        applyStorageEntries(window.sessionStorage, seed.sessionStorage);
    } catch {}
};

const hasReplayStorageSeed = (seed: LoadedReplayCapture['storageSeed']) => {
    return (
        seed.cookies.length > 0 ||
        Object.keys(seed.localStorage).length > 0 ||
        Object.keys(seed.sessionStorage).length > 0
    );
};

const writeDocumentCookie = (value: string) => {
    (document as Document & { cookie: string }).cookie = value;
};

const applyCookieSeed = (cookies: LoadedReplayCapture['storageSeed']['cookies']) => {
    for (const cookie of cookies) {
        writeDocumentCookie(buildCookieSegments(cookie).join('; '));
    }
};

const buildCookieSegments = (cookie: LoadedReplayCapture['storageSeed']['cookies'][number]) => {
    const segments = [`${cookie.name}=${cookie.value}`];
    if (cookie.path) {
        segments.push(`Path=${cookie.path}`);
    }
    if (cookie.domain) {
        segments.push(`Domain=${cookie.domain}`);
    }
    if (typeof cookie.expires === 'number' && Number.isFinite(cookie.expires) && cookie.expires > 0) {
        segments.push(`Expires=${new Date(cookie.expires * 1000).toUTCString()}`);
    }
    if (cookie.sameSite) {
        segments.push(`SameSite=${cookie.sameSite}`);
    }
    if (cookie.secure) {
        segments.push('Secure');
    }
    return segments;
};

const applyStorageEntries = (storage: Storage, entries: Record<string, string>) => {
    for (const [key, value] of Object.entries(entries)) {
        storage.setItem(key, value);
    }
};

const decodeRouteBody = (route: ReplayHttpRoute) => {
    const body = route.body ?? '';
    if (route.bodyEncoding === 'base64') {
        return Uint8Array.from(atob(body), (char) => char.charCodeAt(0));
    }

    return body;
};

const sha1Hex = async (value: string) => {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-1', bytes);
    return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, 12);
};

const findReplayRoute = async (request: Request, routes: ReplayHttpRoute[]) => {
    const url = new URL(request.url, window.location.origin);
    const method = request.method.toUpperCase();
    const directMatches = routes.filter((route) => {
        return (
            (route.method === '*' || route.method === method) &&
            route.pathname === url.pathname &&
            route.search === url.search
        );
    });

    if (directMatches.length === 0) {
        return null;
    }

    if (directMatches.length === 1) {
        return directMatches[0] ?? null;
    }

    const body = ['GET', 'HEAD', 'OPTIONS'].includes(method) ? '' : await request.clone().text();
    if (!body) {
        return directMatches[0] ?? null;
    }

    const bodyHash = await sha1Hex(body);
    return directMatches.find((route) => route.requestBodyHash === bodyHash) ?? directMatches[0] ?? null;
};

const warnMissingCrossOriginIsolation = (capture: LoadedReplayCapture) => {
    if (!capture.securityHeaders.required.crossOriginIsolated || typeof window === 'undefined') {
        return;
    }

    if (!window.crossOriginIsolated) {
        console.warn('[shibuk-replay] SharedArrayBuffer code path requires deployment-side COOP/COEP headers');
    }
};

const installFetchReplay = ({
    loudTelemetry,
    routes,
    stripDecisions,
}: {
    loudTelemetry: boolean;
    routes: ReplayHttpRoute[];
    stripDecisions: ReturnType<typeof resolveActiveStripDecisions>;
}) => {
    if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
        return;
    }

    const logReplayEvent = (...parts: unknown[]) => {
        if (!loudTelemetry) {
            return;
        }
        console.info('[shibuk-replay]', ...parts);
    };

    const originalFetch = window.fetch.bind(window);
    const replayFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const request = new Request(input, init);
        const url = new URL(request.url, window.location.origin);
        const route = await findReplayRoute(request, routes);
        const stripDecision = resolveMatchingStripDecision(url, stripDecisions);
        if (stripDecision) {
            const stripResponse = buildStripDecisionResponse({
                decision: stripDecision,
                route,
            });
            if (stripResponse) {
                logReplayEvent(stripDecision.action, stripDecision.target.value);
                return stripResponse;
            }

            logReplayEvent('shape-stub-miss', stripDecision.target.value);
        }

        if (!route) {
            return await originalFetch(input, init);
        }

        logReplayEvent('served', route.method, route.pathname + route.search);
        return new Response(decodeRouteBody(route), {
            headers: route.contentType
                ? {
                      'Content-Type': route.contentType,
                      ...route.responseHeaders,
                  }
                : route.responseHeaders,
            status: route.status,
        });
    };
    window.fetch = replayFetch as typeof window.fetch;
};

export const installReplayRuntime = ({
    capture,
    includeClientHttpReplay,
    includeDevOnlyFeatures,
    loudTelemetry,
}: {
    capture: LoadedReplayCapture;
    includeClientHttpReplay: boolean;
    includeDevOnlyFeatures: boolean;
    loudTelemetry: boolean;
}) => {
    const activeStripDecisions = resolveActiveStripDecisions(capture.stripDecisions.decisions);

    if (includeClientHttpReplay && capture.httpRoutes.length > 0) {
        installFetchReplay({
            loudTelemetry,
            routes: capture.httpRoutes,
            stripDecisions: activeStripDecisions,
        });
    }
    if (includeDevOnlyFeatures) {
        applyStorageSeed(capture);
    }
    if (capture.serviceWorkers.length > 0) {
        installServiceWorkerPolicy({
            serviceWorkers: capture.serviceWorkers,
            stripDecisions: activeStripDecisions,
        });
    }
    warnMissingCrossOriginIsolation(capture);
    if (includeDevOnlyFeatures && capture.websocketScripts.length > 0) {
        installWebSocketRewrite({
            pageUrl: window.location.href,
            scripts: capture.websocketScripts,
        });
    }
};
