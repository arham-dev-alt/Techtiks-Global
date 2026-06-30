import { createHash } from 'node:crypto';
import { parse } from 'acorn';
import type { ReplayHttpRoute } from './types.ts';

const VIRTUAL_STATIC_GET_PREFIX = 'virtual:shibuk-replay/static-get/';
const RESOLVED_VIRTUAL_STATIC_GET_PREFIX = `\0${VIRTUAL_STATIC_GET_PREFIX}`;

type IndexedStaticGetRoute = {
    requestKey: string;
    resolvedVirtualId: string;
    route: ReplayHttpRoute;
    virtualId: string;
};

export type InlineStaticGetRouteIndex = {
    readonly byAbsoluteUrl: Map<string, IndexedStaticGetRoute>;
    readonly byRelativeRequestKey: Map<string, IndexedStaticGetRoute>;
    readonly byResolvedVirtualId: Map<string, IndexedStaticGetRoute>;
};

type TransformReplacement = {
    end: number;
    importId: string;
    importName: string;
    replacement: string;
    start: number;
};

type TransformResult = {
    code: string;
};

const isAstNode = (value: unknown): value is { end: number; start: number; type: string } => {
    return (
        Boolean(value) &&
        typeof value === 'object' &&
        typeof (value as { type?: unknown }).type === 'string' &&
        typeof (value as { start?: unknown }).start === 'number' &&
        typeof (value as { end?: unknown }).end === 'number'
    );
};

const walkAst = (root: unknown, visit: (node: { end: number; start: number; type: string }) => void) => {
    if (!isAstNode(root)) {
        return;
    }

    const stack: unknown[] = [root];
    while (stack.length > 0) {
        const current = stack.pop();
        if (!isAstNode(current)) {
            continue;
        }

        visit(current);
        for (const value of Object.values(current)) {
            if (Array.isArray(value)) {
                for (let index = value.length - 1; index >= 0; index -= 1) {
                    stack.push(value[index]);
                }
                continue;
            }
            stack.push(value);
        }
    }
};

const toRouteRequestKey = (route: ReplayHttpRoute) => {
    return `${route.pathname}${route.search}`;
};

const buildVirtualId = (route: ReplayHttpRoute) => {
    const requestKey = toRouteRequestKey(route);
    const digest = createHash('sha1').update(`${route.method}:${requestKey}`).digest('hex').slice(0, 12);
    return `${VIRTUAL_STATIC_GET_PREFIX}${digest}`;
};

const getStaticStringValue = (node: unknown): string | null => {
    if (!isAstNode(node)) {
        return null;
    }

    if (node.type === 'Literal') {
        const value = (node as { value?: unknown }).value;
        return typeof value === 'string' ? value : null;
    }

    if (node.type === 'TemplateLiteral') {
        const templateNode = node as {
            expressions?: unknown[];
            quasis?: Array<{ value?: { cooked?: string; raw?: string } }>;
        };
        if ((templateNode.expressions?.length ?? 0) > 0 || (templateNode.quasis?.length ?? 0) !== 1) {
            return null;
        }
        return templateNode.quasis?.[0]?.value?.cooked ?? templateNode.quasis?.[0]?.value?.raw ?? null;
    }

    return null;
};

const getStaticPropertyKey = (node: unknown): string | null => {
    if (!isAstNode(node)) {
        return null;
    }

    if (node.type === 'Identifier') {
        return (node as { name?: unknown }).name as string;
    }

    return getStaticStringValue(node);
};

const isFetchCallee = (callee: unknown) => {
    if (!isAstNode(callee)) {
        return false;
    }

    if (callee.type === 'Identifier') {
        return (callee as { name?: unknown }).name === 'fetch';
    }

    if (callee.type !== 'MemberExpression') {
        return false;
    }

    const memberExpression = callee as {
        computed?: boolean;
        object?: unknown;
        property?: unknown;
    };
    if (memberExpression.computed) {
        return false;
    }

    const object =
        isAstNode(memberExpression.object) && memberExpression.object.type === 'Identifier'
            ? (memberExpression.object as { name?: unknown }).name
            : null;
    const property =
        isAstNode(memberExpression.property) && memberExpression.property.type === 'Identifier'
            ? (memberExpression.property as { name?: unknown }).name
            : null;

    return property === 'fetch' && (object === 'window' || object === 'globalThis');
};

const isCompatibleStaticGetInit = (node: unknown) => {
    if (!isAstNode(node)) {
        return false;
    }

    if (node.type !== 'ObjectExpression') {
        return false;
    }

    const objectExpression = node as {
        properties?: unknown[];
    };
    let methodValue: string | null = null;

    for (const property of objectExpression.properties ?? []) {
        const normalizedProperty = normalizeStaticGetInitProperty(property);
        if (!normalizedProperty) {
            return false;
        }
        if (normalizedProperty.key === 'body') {
            return false;
        }
        if (normalizedProperty.key === 'method') {
            const value = getStaticGetMethodValue(normalizedProperty.value);
            if (!value) {
                return false;
            }
            methodValue = value;
        }
    }

    return methodValue === null || methodValue === 'GET';
};

const normalizeStaticGetInitProperty = (property: unknown) => {
    if (!isAstNode(property) || property.type !== 'Property') {
        return null;
    }

    const normalizedProperty = property as {
        computed?: boolean;
        key?: unknown;
        kind?: string;
        method?: boolean;
        value?: unknown;
    };
    if (normalizedProperty.computed || normalizedProperty.kind !== 'init' || normalizedProperty.method) {
        return null;
    }

    const key = getStaticPropertyKey(normalizedProperty.key);
    if (!key) {
        return null;
    }

    return {
        key,
        value: normalizedProperty.value,
    };
};

const getStaticGetMethodValue = (value: unknown) => {
    const methodValue = getStaticStringValue(value);
    return methodValue ? methodValue.toUpperCase() : null;
};

const normalizeRelativeFetchLiteral = (value: string) => {
    if (!value.startsWith('/')) {
        return null;
    }
    const url = new URL(value, 'https://shibuk-build.invalid');
    return `${url.pathname}${url.search}`;
};

const normalizeAbsoluteFetchLiteral = (value: string) => {
    try {
        const url = new URL(value);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            return null;
        }
        return url.toString();
    } catch {
        return null;
    }
};

const resolveRouteForFetchLiteral = (routeIndex: InlineStaticGetRouteIndex, literal: string) => {
    const absoluteUrl = normalizeAbsoluteFetchLiteral(literal);
    if (absoluteUrl) {
        return routeIndex.byAbsoluteUrl.get(absoluteUrl) ?? null;
    }

    const requestKey = normalizeRelativeFetchLiteral(literal);
    if (!requestKey) {
        return null;
    }

    return routeIndex.byRelativeRequestKey.get(requestKey) ?? null;
};

const prependImports = (code: string, imports: string) => {
    if (!code.startsWith('#!')) {
        return `${imports}${code}`;
    }

    const firstLineBreak = code.indexOf('\n');
    if (firstLineBreak === -1) {
        return `${code}\n${imports}`;
    }

    return `${code.slice(0, firstLineBreak + 1)}${imports}${code.slice(firstLineBreak + 1)}`;
};

export const buildInlineStaticGetRouteIndex = (routes: ReplayHttpRoute[]): InlineStaticGetRouteIndex => {
    const byAbsoluteUrl = new Map<string, IndexedStaticGetRoute>();
    const byRelativeRequestKey = new Map<string, IndexedStaticGetRoute>();
    const byResolvedVirtualId = new Map<string, IndexedStaticGetRoute>();
    const ambiguousAbsoluteUrls = new Set<string>();
    const ambiguousRelativeKeys = new Set<string>();

    for (const route of routes) {
        if (route.method !== 'GET') {
            continue;
        }

        const indexedRoute = {
            requestKey: toRouteRequestKey(route),
            resolvedVirtualId: `${RESOLVED_VIRTUAL_STATIC_GET_PREFIX}${buildVirtualId(route).slice(
                VIRTUAL_STATIC_GET_PREFIX.length,
            )}`,
            route,
            virtualId: buildVirtualId(route),
        } satisfies IndexedStaticGetRoute;
        byResolvedVirtualId.set(indexedRoute.resolvedVirtualId, indexedRoute);

        if (ambiguousRelativeKeys.has(indexedRoute.requestKey)) {
            continue;
        }
        if (byRelativeRequestKey.has(indexedRoute.requestKey)) {
            byRelativeRequestKey.delete(indexedRoute.requestKey);
            ambiguousRelativeKeys.add(indexedRoute.requestKey);
        } else {
            byRelativeRequestKey.set(indexedRoute.requestKey, indexedRoute);
        }

        if (ambiguousAbsoluteUrls.has(route.url)) {
            continue;
        }
        if (byAbsoluteUrl.has(route.url)) {
            byAbsoluteUrl.delete(route.url);
            ambiguousAbsoluteUrls.add(route.url);
        } else {
            byAbsoluteUrl.set(route.url, indexedRoute);
        }
    }

    return {
        byAbsoluteUrl,
        byRelativeRequestKey,
        byResolvedVirtualId,
    };
};

export const loadInlineStaticGetVirtualModule = (routeIndex: InlineStaticGetRouteIndex, resolvedId: string) => {
    const indexedRoute = routeIndex.byResolvedVirtualId.get(resolvedId);
    if (!indexedRoute) {
        return null;
    }

    const route = indexedRoute.route;
    return `const route = ${JSON.stringify(route, null, 2)};

const decodeRouteBody = () => {
  if (route.bodyEncoding === "base64") {
    return Uint8Array.from(atob(route.body), (char) => char.charCodeAt(0));
  }

  return route.body;
};

export const createStaticReplayResponse = () => {
  const body = decodeRouteBody();
  return new Response(body, {
    headers: route.contentType
      ? {
          "Content-Type": route.contentType,
          ...route.responseHeaders,
        }
      : route.responseHeaders,
    status: route.status,
  });
};
`;
};

export const resolveInlineStaticGetVirtualId = (routeIndex: InlineStaticGetRouteIndex, source: string) => {
    for (const [resolvedId, indexedRoute] of routeIndex.byResolvedVirtualId.entries()) {
        if (indexedRoute.virtualId === source || resolvedId === source) {
            return resolvedId;
        }
    }

    return null;
};

export const transformInlineStaticGetSource = ({
    code,
    routeIndex,
}: {
    code: string;
    routeIndex: InlineStaticGetRouteIndex;
}): TransformResult | null => {
    if (!code.includes('fetch')) {
        return null;
    }

    const ast = parse(code, {
        allowHashBang: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
    });
    const replacements: TransformReplacement[] = [];
    let importCounter = 0;

    walkAst(ast, (node) => {
        if (node.type !== 'CallExpression') {
            return;
        }

        const callExpression = node as {
            arguments?: unknown[];
            callee?: unknown;
        };
        if (!isFetchCallee(callExpression.callee)) {
            return;
        }

        const requestLiteral = getStaticStringValue(callExpression.arguments?.[0]);
        if (!requestLiteral) {
            return;
        }

        const indexedRoute = resolveRouteForFetchLiteral(routeIndex, requestLiteral);
        if (!indexedRoute) {
            return;
        }

        const initArgument = callExpression.arguments?.[1];
        if (initArgument && !isCompatibleStaticGetInit(initArgument)) {
            return;
        }

        const importName = `__shibukReplayStaticGet_${String(importCounter)}`;
        importCounter += 1;
        const replacement = initArgument
            ? `(${code.slice((initArgument as { start: number }).start, (initArgument as { end: number }).end)}, Promise.resolve(${importName}()))`
            : `Promise.resolve(${importName}())`;
        replacements.push({
            end: node.end,
            importId: indexedRoute.virtualId,
            importName,
            replacement,
            start: node.start,
        });
    });

    if (replacements.length === 0) {
        return null;
    }

    let transformed = code;
    for (const replacement of [...replacements].sort((left, right) => right.start - left.start)) {
        transformed =
            transformed.slice(0, replacement.start) + replacement.replacement + transformed.slice(replacement.end);
    }

    const importBlock = replacements
        .map(
            (replacement) =>
                `import { createStaticReplayResponse as ${replacement.importName} } from ${JSON.stringify(replacement.importId)};`,
        )
        .join('\n');

    return {
        code: prependImports(transformed, `${importBlock}\n`),
    };
};
