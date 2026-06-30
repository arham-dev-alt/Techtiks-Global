import type { ReplayHttpRoute, ReplayStripDecision } from './types.ts';

export const resolveActiveStripDecisions = (decisions: ReplayStripDecision[]) => {
    const supersededIds = new Set(
        decisions
            .map((decision) => decision.supersedes)
            .filter((decisionId): decisionId is string => typeof decisionId === 'string' && decisionId.length > 0),
    );

    return decisions.filter((decision) => !supersededIds.has(decision.id));
};

export const resolveMatchingStripDecision = (url: URL, decisions: ReplayStripDecision[]) => {
    const requestPath = `${url.pathname}${url.search}`;
    return (
        decisions.find((decision) => {
            if (!decision?.target?.value || typeof decision.target.value !== 'string') {
                return false;
            }

            if (decision.target.kind === 'path') {
                return decision.target.value.includes('?')
                    ? requestPath === decision.target.value
                    : url.pathname === decision.target.value;
            }

            if (decision.target.kind === 'host') {
                return url.host === decision.target.value;
            }

            return false;
        }) ?? null
    );
};

export const isShapeStubDecision = (decision: ReplayStripDecision | null) => {
    return decision?.action === 'shape-stub-from-capture';
};

export const markShapeStubPayload = (payload: string) => {
    try {
        const parsed = JSON.parse(payload) as unknown;
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            return JSON.stringify({
                ...parsed,
                __shibuk_shape_only: true,
            });
        }
    } catch {
        // Keep non-JSON and incompatible JSON payloads intact to avoid protocol breakage.
    }

    return payload;
};

const buildBlockedResponse = () => {
    return new Response('', {
        status: 403,
    });
};

const buildStubEmptyResponse = (route: ReplayHttpRoute | null) => {
    return new Response('', {
        headers: route?.contentType ? { 'Content-Type': route.contentType } : {},
        status: 200,
    });
};

const buildShapeStubResponse = (route: ReplayHttpRoute) => {
    let responseBody: BodyInit =
        route.bodyEncoding === 'base64'
            ? Uint8Array.from(atob(route.body ?? ''), (char) => char.charCodeAt(0))
            : (route.body ?? '');

    const responseHeaders = {
        'X-Shibuk-Shape-Only': '1',
        ...route.responseHeaders,
    };
    if (typeof responseBody === 'string') {
        responseBody = markShapeStubPayload(responseBody);
    }

    return new Response(responseBody, {
        headers: route.contentType
            ? {
                  'Content-Type': route.contentType,
                  ...responseHeaders,
              }
            : responseHeaders,
        status: route.status,
    });
};

export const buildStripDecisionResponse = ({
    decision,
    route,
}: {
    decision: ReplayStripDecision;
    route: ReplayHttpRoute | null;
}) => {
    const handlers: Partial<Record<ReplayStripDecision['action'], () => Response | null>> = {
        block: () => buildBlockedResponse(),
        'shape-stub-from-capture': () => (route ? buildShapeStubResponse(route) : null),
        'stub-empty': () => buildStubEmptyResponse(route),
    };

    return handlers[decision.action]?.() ?? null;
};
