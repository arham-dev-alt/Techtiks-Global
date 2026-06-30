// src/strip-runtime.ts
var resolveActiveStripDecisions = (decisions) => {
  const supersededIds = new Set(decisions.map((decision) => decision.supersedes).filter((decisionId) => typeof decisionId === "string" && decisionId.length > 0));
  return decisions.filter((decision) => !supersededIds.has(decision.id));
};
var resolveMatchingStripDecision = (url, decisions) => {
  const requestPath = `${url.pathname}${url.search}`;
  return decisions.find((decision) => {
    if (!decision?.target?.value || typeof decision.target.value !== "string") {
      return false;
    }
    if (decision.target.kind === "path") {
      return decision.target.value.includes("?") ? requestPath === decision.target.value : url.pathname === decision.target.value;
    }
    if (decision.target.kind === "host") {
      return url.host === decision.target.value;
    }
    return false;
  }) ?? null;
};
var markShapeStubPayload = (payload) => {
  try {
    const parsed = JSON.parse(payload);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return JSON.stringify({
        ...parsed,
        __shibuk_shape_only: true
      });
    }
  } catch {}
  return payload;
};
var buildBlockedResponse = () => {
  return new Response("", {
    status: 403
  });
};
var buildStubEmptyResponse = (route) => {
  return new Response("", {
    headers: route?.contentType ? { "Content-Type": route.contentType } : {},
    status: 200
  });
};
var buildShapeStubResponse = (route) => {
  let responseBody = route.bodyEncoding === "base64" ? Uint8Array.from(atob(route.body ?? ""), (char) => char.charCodeAt(0)) : route.body ?? "";
  const responseHeaders = {
    "X-Shibuk-Shape-Only": "1",
    ...route.responseHeaders
  };
  if (typeof responseBody === "string") {
    responseBody = markShapeStubPayload(responseBody);
  }
  return new Response(responseBody, {
    headers: route.contentType ? {
      "Content-Type": route.contentType,
      ...responseHeaders
    } : responseHeaders,
    status: route.status
  });
};
var buildStripDecisionResponse = ({
  decision,
  route
}) => {
  const handlers = {
    block: () => buildBlockedResponse(),
    "shape-stub-from-capture": () => route ? buildShapeStubResponse(route) : null,
    "stub-empty": () => buildStubEmptyResponse(route)
  };
  return handlers[decision.action]?.() ?? null;
};

// src/service-worker-runtime.ts
var toWorkerRequestKey = (value, pageHref) => {
  const workerUrl = new URL(value, pageHref);
  return `${workerUrl.pathname}${workerUrl.search}`;
};
var buildNeutralizedRegistration = (worker, requestedScope) => {
  return {
    __shibukNeutralized: true,
    active: {
      postMessage() {},
      scriptURL: worker?.scriptUrl ?? "",
      state: "activated"
    },
    addEventListener() {},
    getNotifications: async () => [],
    installing: null,
    navigationPreload: undefined,
    onupdatefound: null,
    periodicSync: {
      register: async () => {
        return;
      }
    },
    pushManager: {
      getSubscription: async () => null,
      permissionState: async () => "denied",
      subscribe: async () => {
        throw new DOMException("Service worker registration has been disabled.", "NotAllowedError");
      }
    },
    removeEventListener() {},
    scope: requestedScope || worker?.scope || window.location.origin,
    showNotification: async () => {
      return;
    },
    sync: {
      register: async () => {
        return;
      }
    },
    unregister: async () => true,
    update: async () => {
      return;
    },
    updateViaCache: "none",
    waiting: null
  };
};
var resolveWorkerByPath = (serviceWorkers, value, pageHref) => {
  try {
    const requestKey = toWorkerRequestKey(value, pageHref);
    return serviceWorkers.find((worker) => {
      return toWorkerRequestKey(worker.scriptUrl, pageHref) === requestKey;
    }) ?? null;
  } catch {
    return null;
  }
};
var resolveDecisionForWorker = ({
  pageHref,
  serviceWorkerDecisions,
  worker
}) => {
  return serviceWorkerDecisions.find((decision) => {
    if (decision.target.value === worker.scriptUrl) {
      return true;
    }
    try {
      return toWorkerRequestKey(decision.target.value, pageHref) === toWorkerRequestKey(worker.scriptUrl, pageHref);
    } catch {
      return false;
    }
  }) ?? null;
};
var tryAssignMethod = (target, name, value) => {
  if (!target) {
    return false;
  }
  try {
    target[name] = value;
    return target[name] === value;
  } catch {
    return false;
  }
};
var tryDefineMethod = (target, name, value) => {
  if (!target) {
    return false;
  }
  try {
    Object.defineProperty(target, name, {
      configurable: true,
      value,
      writable: true
    });
    return true;
  } catch {
    return false;
  }
};
var installServiceWorkerPolicy = ({ serviceWorkers, stripDecisions }) => {
  if (typeof window === "undefined" || typeof navigator === "undefined" || !navigator.serviceWorker) {
    return;
  }
  const serviceWorkerDecisions = resolveActiveStripDecisions(stripDecisions).filter((decision) => decision.category === "service-worker");
  if (serviceWorkerDecisions.length === 0) {
    return;
  }
  const pageHref = window.location.href;
  const serviceWorkerContainer = navigator.serviceWorker;
  const serviceWorkerPrototype = Object.getPrototypeOf(serviceWorkerContainer);
  const originalRegister = typeof serviceWorkerContainer.register === "function" ? serviceWorkerContainer.register.bind(serviceWorkerContainer) : null;
  const originalGetRegistration = typeof serviceWorkerContainer.getRegistration === "function" ? serviceWorkerContainer.getRegistration.bind(serviceWorkerContainer) : null;
  const originalGetRegistrations = typeof serviceWorkerContainer.getRegistrations === "function" ? serviceWorkerContainer.getRegistrations.bind(serviceWorkerContainer) : null;
  const neutralizeOnly = serviceWorkerDecisions.every((decision) => decision.action === "neutralise");
  const replaceMethod = (name, value) => {
    const targets = [serviceWorkerContainer, serviceWorkerPrototype];
    for (const target of targets) {
      if (tryAssignMethod(target, name, value) || tryDefineMethod(target, name, value)) {
        return;
      }
    }
  };
  const replaceReady = (value) => {
    try {
      Object.defineProperty(serviceWorkerContainer, "ready", {
        configurable: true,
        enumerable: false,
        get() {
          return value;
        }
      });
      return;
    } catch {}
    try {
      if (serviceWorkerPrototype) {
        Object.defineProperty(serviceWorkerPrototype, "ready", {
          configurable: true,
          enumerable: false,
          get() {
            return value;
          }
        });
      }
    } catch {}
  };
  replaceMethod("register", async (scriptURL, options = {}) => {
    const worker = resolveWorkerByPath(serviceWorkers, String(scriptURL ?? ""), pageHref);
    if (!worker || !originalRegister) {
      return originalRegister ? await originalRegister(scriptURL, options) : buildNeutralizedRegistration(null, options.scope);
    }
    const decision = resolveDecisionForWorker({
      pageHref,
      serviceWorkerDecisions,
      worker
    });
    if (!decision || decision.action === "preserve") {
      return await originalRegister(scriptURL, options);
    }
    if (decision.action === "replay-script") {
      const workerUrl = new URL(worker.scriptUrl);
      return await originalRegister(workerUrl.pathname + workerUrl.search, {
        ...options,
        scope: options.scope || worker.scope
      });
    }
    console.warn("[shibuk-replay] serviceWorker.register neutralised:", worker.scriptUrl);
    return buildNeutralizedRegistration(worker, options.scope);
  });
  if (neutralizeOnly) {
    replaceMethod("getRegistration", async (value) => {
      if (value && originalGetRegistration) {
        return await originalGetRegistration(value);
      }
      return;
    });
    replaceMethod("getRegistrations", async () => []);
    replaceReady(Promise.resolve(buildNeutralizedRegistration(serviceWorkers[0] ?? null, serviceWorkers[0]?.scope)));
    return;
  }
  if (originalGetRegistrations) {
    replaceMethod("getRegistrations", originalGetRegistrations);
  }
};

// src/websocket-runtime.ts
var normalizeSocketUrl = (protocol, host, pathname, search, hash) => {
  if (!host) {
    return null;
  }
  const normalizedPathname = pathname && pathname !== "/" ? pathname : "/";
  return `${protocol}//${host}${normalizedPathname}${search}${hash}`;
};
var resolveWebSocketRuntimeTarget = (value, pageUrl, originalHost = "", preferredOriginalProtocol = "") => {
  if (typeof value !== "string" || !value) {
    return null;
  }
  const explicitExternalTarget = resolveExplicitExternalSocketTarget(value);
  if (explicitExternalTarget) {
    return explicitExternalTarget;
  }
  const page = new URL(pageUrl);
  const defaultProtocol = page.protocol === "http:" ? "ws:" : "wss:";
  let url;
  try {
    url = new URL(value, page);
  } catch {
    return null;
  }
  const rewrittenExternalTarget = resolveRewrittenExternalSocketTarget(url, defaultProtocol);
  if (rewrittenExternalTarget) {
    return rewrittenExternalTarget;
  }
  if (url.protocol !== "ws:" && url.protocol !== "wss:") {
    return null;
  }
  return resolveStandardSocketTarget(url, page, originalHost, preferredOriginalProtocol);
};
var resolveExplicitExternalSocketTarget = (value) => {
  const explicitExternalSocketMatch = value.match(/^(wss?:)\/\/_external\/([^/?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i);
  if (!explicitExternalSocketMatch?.[1] || !explicitExternalSocketMatch[2]) {
    return null;
  }
  return normalizeSocketUrl(explicitExternalSocketMatch[1].toLowerCase(), explicitExternalSocketMatch[2], explicitExternalSocketMatch[3] ?? "/", explicitExternalSocketMatch[4] ?? "", explicitExternalSocketMatch[5] ?? "");
};
var resolveRewrittenExternalSocketTarget = (url, defaultProtocol) => {
  const externalSocketMatch = url.pathname.match(/^\/_external\/([^/]+)(\/.*)?$/);
  if (!externalSocketMatch?.[1]) {
    return null;
  }
  const protocol = url.protocol === "ws:" || url.protocol === "wss:" ? url.protocol : defaultProtocol;
  return normalizeSocketUrl(protocol, externalSocketMatch[1], externalSocketMatch[2] ?? "/", url.search, url.hash);
};
var resolveStandardSocketTarget = (url, page, originalHost, preferredOriginalProtocol = "") => {
  const protocol = preferredOriginalProtocol || url.protocol;
  if (url.hostname === "." || url.host === ".") {
    return normalizeSocketUrl(protocol, originalHost || page.host, url.pathname, url.search, url.hash);
  }
  if (originalHost && url.host === page.host && page.host !== originalHost) {
    return normalizeSocketUrl(protocol, originalHost, url.pathname, url.search, url.hash);
  }
  return url.toString();
};
var buildReplayClientUrl = (localHref, targetUrl, replayEndpoint = "/__shibuk/replay/websocket") => {
  const local = new URL(localHref);
  local.protocol = local.protocol === "https:" ? "wss:" : "ws:";
  local.pathname = replayEndpoint;
  local.search = "";
  local.hash = "";
  local.searchParams.set("url", targetUrl);
  local.searchParams.set("mode", "hybrid");
  return local.toString();
};
var installWebSocketRewrite = ({ pageUrl, scripts }) => {
  if (typeof globalThis !== "object" || typeof window === "undefined") {
    return;
  }
  const targetUrls = scripts.map((script) => script.url).sort();
  if (targetUrls.length === 0) {
    return;
  }
  const originalHosts = Array.from(new Set(targetUrls.map((value) => {
    try {
      return new URL(value).host;
    } catch {
      return "";
    }
  }).filter(Boolean)));
  const preferredOriginalHost = originalHosts.length === 1 ? originalHosts[0] : "";
  const originalProtocols = Array.from(new Set(targetUrls.map((value) => {
    try {
      return new URL(value).protocol;
    } catch {
      return "";
    }
  }).filter(Boolean)));
  const preferredOriginalProtocol = originalProtocols.length === 1 ? originalProtocols[0] : "";
  const webSocketReplayTargets = new Set(targetUrls);
  const NativeWebSocket = window.WebSocket;
  const replayGlobal = globalThis;
  replayGlobal.__SHIBUK_REWRITE_WEBSOCKET_URL__ = (value) => {
    const rawValue = value instanceof URL ? value.toString() : String(value ?? "");
    if (!rawValue) {
      return rawValue;
    }
    const targetUrl = resolveWebSocketRuntimeTarget(rawValue, pageUrl, preferredOriginalHost, preferredOriginalProtocol);
    if (!targetUrl || !webSocketReplayTargets.has(targetUrl)) {
      return rawValue;
    }
    return buildReplayClientUrl(pageUrl, targetUrl);
  };

  class ShibukReplayWebSocket extends NativeWebSocket {
    constructor(url, protocols) {
      const rewrittenUrl = replayGlobal.__SHIBUK_REWRITE_WEBSOCKET_URL__?.(url) ?? url;
      super(rewrittenUrl, protocols);
    }
  }
  Object.defineProperty(ShibukReplayWebSocket, "CONNECTING", { value: NativeWebSocket.CONNECTING });
  Object.defineProperty(ShibukReplayWebSocket, "OPEN", { value: NativeWebSocket.OPEN });
  Object.defineProperty(ShibukReplayWebSocket, "CLOSING", { value: NativeWebSocket.CLOSING });
  Object.defineProperty(ShibukReplayWebSocket, "CLOSED", { value: NativeWebSocket.CLOSED });
  window.WebSocket = ShibukReplayWebSocket;
};

// src/browser-runtime.ts
var applyStorageSeed = (capture) => {
  const seed = capture.storageSeed;
  if (!hasReplayStorageSeed(seed) || typeof window === "undefined") {
    return;
  }
  try {
    applyCookieSeed(seed.cookies);
    applyStorageEntries(window.localStorage, seed.localStorage);
    applyStorageEntries(window.sessionStorage, seed.sessionStorage);
  } catch {}
};
var hasReplayStorageSeed = (seed) => {
  return seed.cookies.length > 0 || Object.keys(seed.localStorage).length > 0 || Object.keys(seed.sessionStorage).length > 0;
};
var writeDocumentCookie = (value) => {
  document.cookie = value;
};
var applyCookieSeed = (cookies) => {
  for (const cookie of cookies) {
    writeDocumentCookie(buildCookieSegments(cookie).join("; "));
  }
};
var buildCookieSegments = (cookie) => {
  const segments = [`${cookie.name}=${cookie.value}`];
  if (cookie.path) {
    segments.push(`Path=${cookie.path}`);
  }
  if (cookie.domain) {
    segments.push(`Domain=${cookie.domain}`);
  }
  if (typeof cookie.expires === "number" && Number.isFinite(cookie.expires) && cookie.expires > 0) {
    segments.push(`Expires=${new Date(cookie.expires * 1000).toUTCString()}`);
  }
  if (cookie.sameSite) {
    segments.push(`SameSite=${cookie.sameSite}`);
  }
  if (cookie.secure) {
    segments.push("Secure");
  }
  return segments;
};
var applyStorageEntries = (storage, entries) => {
  for (const [key, value] of Object.entries(entries)) {
    storage.setItem(key, value);
  }
};
var decodeRouteBody = (route) => {
  const body = route.body ?? "";
  if (route.bodyEncoding === "base64") {
    return Uint8Array.from(atob(body), (char) => char.charCodeAt(0));
  }
  return body;
};
var sha1Hex = async (value) => {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-1", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 12);
};
var findReplayRoute = async (request, routes) => {
  const url = new URL(request.url, window.location.origin);
  const method = request.method.toUpperCase();
  const directMatches = routes.filter((route) => {
    return (route.method === "*" || route.method === method) && route.pathname === url.pathname && route.search === url.search;
  });
  if (directMatches.length === 0) {
    return null;
  }
  if (directMatches.length === 1) {
    return directMatches[0] ?? null;
  }
  const body = ["GET", "HEAD", "OPTIONS"].includes(method) ? "" : await request.clone().text();
  if (!body) {
    return directMatches[0] ?? null;
  }
  const bodyHash = await sha1Hex(body);
  return directMatches.find((route) => route.requestBodyHash === bodyHash) ?? directMatches[0] ?? null;
};
var warnMissingCrossOriginIsolation = (capture) => {
  if (!capture.securityHeaders.required.crossOriginIsolated || typeof window === "undefined") {
    return;
  }
  if (!window.crossOriginIsolated) {
    console.warn("[shibuk-replay] SharedArrayBuffer code path requires deployment-side COOP/COEP headers");
  }
};
var installFetchReplay = ({
  loudTelemetry,
  routes,
  stripDecisions
}) => {
  if (typeof window === "undefined" || typeof window.fetch !== "function") {
    return;
  }
  const logReplayEvent = (...parts) => {
    if (!loudTelemetry) {
      return;
    }
    console.info("[shibuk-replay]", ...parts);
  };
  const originalFetch = window.fetch.bind(window);
  const replayFetch = async (input, init) => {
    const request = new Request(input, init);
    const url = new URL(request.url, window.location.origin);
    const route = await findReplayRoute(request, routes);
    const stripDecision = resolveMatchingStripDecision(url, stripDecisions);
    if (stripDecision) {
      const stripResponse = buildStripDecisionResponse({
        decision: stripDecision,
        route
      });
      if (stripResponse) {
        logReplayEvent(stripDecision.action, stripDecision.target.value);
        return stripResponse;
      }
      logReplayEvent("shape-stub-miss", stripDecision.target.value);
    }
    if (!route) {
      return await originalFetch(input, init);
    }
    logReplayEvent("served", route.method, route.pathname + route.search);
    return new Response(decodeRouteBody(route), {
      headers: route.contentType ? {
        "Content-Type": route.contentType,
        ...route.responseHeaders
      } : route.responseHeaders,
      status: route.status
    });
  };
  window.fetch = replayFetch;
};
var installReplayRuntime = ({
  capture,
  includeClientHttpReplay,
  includeDevOnlyFeatures,
  loudTelemetry
}) => {
  const activeStripDecisions = resolveActiveStripDecisions(capture.stripDecisions.decisions);
  if (includeClientHttpReplay && capture.httpRoutes.length > 0) {
    installFetchReplay({
      loudTelemetry,
      routes: capture.httpRoutes,
      stripDecisions: activeStripDecisions
    });
  }
  if (includeDevOnlyFeatures) {
    applyStorageSeed(capture);
  }
  if (capture.serviceWorkers.length > 0) {
    installServiceWorkerPolicy({
      serviceWorkers: capture.serviceWorkers,
      stripDecisions: activeStripDecisions
    });
  }
  warnMissingCrossOriginIsolation(capture);
  if (includeDevOnlyFeatures && capture.websocketScripts.length > 0) {
    installWebSocketRewrite({
      pageUrl: window.location.href,
      scripts: capture.websocketScripts
    });
  }
};
export {
  installReplayRuntime
};
