import { describe, expect, it } from 'bun:test';

import { buildStripDecisionResponse, markShapeStubPayload, resolveActiveStripDecisions } from './strip-runtime.ts';
import type { ReplayHttpRoute, ReplayStripDecision } from './types.ts';

const shapeStubDecision: ReplayStripDecision = {
    action: 'shape-stub-from-capture',
    category: 'other',
    id: 'shape-1',
    rationale: 'shape only',
    supersedes: null,
    target: {
        kind: 'path',
        value: '/api/score',
    },
    tier: 'shape-stub',
};

const route: ReplayHttpRoute = {
    body: '{"score":1}',
    bodyEncoding: 'utf8',
    contentType: 'application/json',
    lookupKeys: [],
    method: 'GET',
    pathname: '/api/score',
    requestBodyHash: '',
    responseHeaders: {},
    search: '',
    status: 200,
    url: 'https://fixture.example.test/api/score',
};

describe('resolveActiveStripDecisions', () => {
    it('should keep only unsuperseded decisions', () => {
        expect(
            resolveActiveStripDecisions([
                shapeStubDecision,
                {
                    ...shapeStubDecision,
                    id: 'shape-2',
                    supersedes: 'shape-1',
                },
            ]),
        ).toEqual([
            {
                ...shapeStubDecision,
                id: 'shape-2',
                supersedes: 'shape-1',
            },
        ]);
    });
});

describe('markShapeStubPayload', () => {
    it('should add a discriminator to JSON object payloads', () => {
        expect(markShapeStubPayload('{"score":1}')).toContain('__shibuk_shape_only');
    });

    it('should keep JSON arrays unchanged to avoid breaking response shape', () => {
        expect(markShapeStubPayload('[{"score":1}]')).toBe('[{"score":1}]');
    });
});

describe('buildStripDecisionResponse', () => {
    it('should add the shape-only header and body marker for JSON object responses', async () => {
        const response = buildStripDecisionResponse({
            decision: shapeStubDecision,
            route,
        });
        expect(response).not.toBeNull();
        expect(response?.headers.get('X-Shibuk-Shape-Only')).toBe('1');
        expect(await response?.text()).toContain('__shibuk_shape_only');
    });
});
