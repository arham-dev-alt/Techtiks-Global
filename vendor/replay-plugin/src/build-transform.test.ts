import { describe, expect, it } from 'bun:test';

import { buildInlineStaticGetRouteIndex, transformInlineStaticGetSource } from './build-transform.ts';
import type { ReplayHttpRoute } from './types.ts';

const bootstrapRoute: ReplayHttpRoute = {
    body: '{"ok":true}',
    bodyEncoding: 'utf8',
    contentType: 'application/json',
    lookupKeys: [],
    method: 'GET',
    pathname: '/api/bootstrap',
    requestBodyHash: '',
    responseHeaders: {
        'cache-control': 'no-store',
    },
    search: '',
    status: 200,
    url: 'https://fixture.example.test/api/bootstrap',
};

describe('transformInlineStaticGetSource', () => {
    it('should rewrite matching static GET fetch calls into virtual imports', () => {
        const result = transformInlineStaticGetSource({
            code: 'export const load = async () => await fetch("/api/bootstrap");\n',
            routeIndex: buildInlineStaticGetRouteIndex([bootstrapRoute]),
        });

        expect(result).not.toBeNull();
        expect(result?.code).toContain('virtual:shibuk-replay/static-get/');
        expect(result?.code).toContain('createStaticReplayResponse as __shibukReplayStaticGet_0');
        expect(result?.code).toContain('Promise.resolve(__shibukReplayStaticGet_0())');
    });

    it('should leave non-matching fetch calls intact', () => {
        const source = 'export const load = async () => await fetch("/api/missing");\n';
        const result = transformInlineStaticGetSource({
            code: source,
            routeIndex: buildInlineStaticGetRouteIndex([bootstrapRoute]),
        });

        expect(result).toBeNull();
    });

    it('should leave dynamic or ambiguous fetch calls intact', () => {
        const routeIndex = buildInlineStaticGetRouteIndex([
            bootstrapRoute,
            {
                ...bootstrapRoute,
                body: '{"ok":false}',
                url: 'https://fixture.example.test/api/bootstrap?duplicate=1',
            },
        ]);

        expect(
            transformInlineStaticGetSource({
                code: 'export const load = async (path) => await fetch(path);\n',
                routeIndex,
            }),
        ).toBeNull();
        expect(
            transformInlineStaticGetSource({
                code: 'export const load = async () => await fetch("/api/bootstrap");\n',
                routeIndex,
            }),
        ).toBeNull();
    });

    it('should leave body-sensitive or non-GET fetch calls intact', () => {
        const result = transformInlineStaticGetSource({
            code: 'export const save = async () => fetch("/api/bootstrap", { body: JSON.stringify({ ok: true }), method: "POST" });\n',
            routeIndex: buildInlineStaticGetRouteIndex([bootstrapRoute]),
        });

        expect(result).toBeNull();
    });
});
