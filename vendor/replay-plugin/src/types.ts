export type ReplayHttpRoute = {
    body?: string;
    bodyEncoding: 'base64' | 'utf8';
    bodyRef?: {
        path: string;
    };
    contentType: string;
    lookupKeys: string[];
    method: string;
    pathname: string;
    requestBodyHash: string;
    responseHeaders: Record<string, string>;
    search: string;
    status: number;
    url: string;
};

export type ReplayStorageSeed = {
    cookies: Array<{
        domain?: string;
        expires?: number;
        name: string;
        path?: string;
        sameSite?: string;
        secure?: boolean;
        value: string;
    }>;
    localStorage: Record<string, string>;
    sessionStorage: Record<string, string>;
};

export type ReplayWebSocketScript = {
    close?: {
        code?: number;
        delayMs?: number;
        reason?: string;
    };
    initialMessages?: Array<{
        binary?: boolean;
        data: string;
        delayMs?: number;
    }>;
    responses?: Array<{
        close?: {
            code?: number;
            delayMs?: number;
            reason?: string;
        };
        match: string;
        matchBinary?: boolean;
        mode?: 'equals' | 'includes';
        serverMessages?: Array<{
            binary?: boolean;
            data: string;
            delayMs?: number;
        }>;
    }>;
    url: string;
};

export type ReplayStripDecision = {
    action:
        | 'block'
        | 'stub-empty'
        | 'shape-stub-from-capture'
        | 'remove-script-tag'
        | 'manual'
        | 'neutralise'
        | 'replay-script'
        | 'preserve';
    category: string;
    id: string;
    rationale: string;
    supersedes: string | null;
    target: {
        kind: 'host' | 'path' | 'sdk-name' | 'ws-url' | 'script-tag' | 'service-worker';
        value: string;
    };
    tier: string;
};

export type ReplayServiceWorker = {
    capturedScript: string | null;
    detectionEvidence: string[];
    purpose: 'asset-cache' | 'spa-fallback' | 'push' | 'background-sync' | 'cross-origin-isolation' | 'unknown';
    registeredFrom: string[];
    scope: string;
    scriptUrl: string;
};

export type ReplaySecurityHeaders = {
    detected: {
        coep: string | null;
        coop: string | null;
        cspMain: string | null;
        csrf: string | null;
    };
    donorHeaders: Record<string, string>;
    required: {
        crossOriginIsolated: boolean;
    };
    schemaVersion: 'shibuk-security-headers/v1';
};

export type LoadedReplayCapture = {
    contentTypes: Record<string, string>;
    httpRoutes: ReplayHttpRoute[];
    securityHeaders: ReplaySecurityHeaders;
    serviceWorkers: ReplayServiceWorker[];
    stripDecisions: {
        decisions: ReplayStripDecision[];
    };
    storageSeed: ReplayStorageSeed;
    websocketScripts: ReplayWebSocketScript[];
};
