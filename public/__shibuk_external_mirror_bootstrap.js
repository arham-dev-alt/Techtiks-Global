const capturedHostsManifest = {
  "generatedAt": "2026-06-16T13:38:53.276Z",
  "hosts": [
    "assets.itsoffbrand.io",
    "cdn.intellimize.co",
    "cdn.prod.website-files.com",
    "challenges.cloudflare.com",
    "d3e54v103j8qbb.cloudfront.net",
    "www.google.com.pk",
    "www.googletagmanager.com"
  ],
  "schemaVersion": "shibuk-captured-hosts/v1"
};

(function externalMirrorShimRuntime(T) {
  const D = globalThis, J = D.URL, W = new Set(Array.isArray(T?.hosts) ? T.hosts.map((j) => typeof j === "string" ? j.trim().toLowerCase() : "").filter(Boolean) : []), Y = () => {
    return D.document?.baseURI || D.location?.href || "http://127.0.0.1/";
  }, k = () => {
    if (typeof D.location?.origin === "string" && D.location.origin)
      return D.location.origin;
    try {
      return new J(Y()).origin;
    } catch {
      return "http://127.0.0.1";
    }
  }, Z = (j) => {
    if (typeof j !== "string" && !(j instanceof J))
      return null;
    const E = j instanceof J ? j.toString() : j;
    if (!E || E.startsWith("blob:") || E.startsWith("data:"))
      return null;
    let z;
    try {
      z = new J(E, Y());
    } catch {
      return null;
    }
    if (z.protocol !== "http:" && z.protocol !== "https:" || !W.has(z.host.toLowerCase()))
      return null;
    return `/_external/${z.host}${z.pathname}${z.search}${z.hash}`;
  }, _ = (j) => {
    if (!j)
      return null;
    try {
      return new J(j, k()).toString();
    } catch {
      return new J(j, "http://127.0.0.1/").toString();
    }
  }, M = (j) => {
    const E = Z(j);
    return E ? _(E) : null;
  }, C = () => {
    if (typeof J !== "function" || D.__shibukExternalMirrorPatchedUrl)
      return;

    class j extends J {
      constructor(E, z) {
        const G = z === void 0 ? new J(E) : new J(E, z);
        super(M(G) ?? G.toString());
      }
    }
    D.URL = j;
    D.__shibukExternalMirrorPatchedUrl = !0;
  }, X = (j, E) => {
    if (j instanceof Request) {
      const z = M(j.url), G = z ? new Request(z, j) : j;
      return E ? new Request(G, E) : G;
    }
    if (typeof j === "string" || j instanceof J) {
      const z = M(j);
      if (!z)
        return null;
      return new Request(z, E);
    }
    return null;
  }, A = () => {
    if (typeof D.fetch !== "function" || D.__shibukExternalMirrorPatchedFetch)
      return;
    const j = D.fetch, E = j.bind(D);
    D.__originalFetch ??= j;
    D.fetch = (z, G) => {
      const K = X(z, G);
      if (K)
        return E(K);
      return E(z, G);
    };
    D.__shibukExternalMirrorPatchedFetch = !0;
  }, B = () => {
    const j = D.XMLHttpRequest?.prototype;
    if (!j || typeof j.open !== "function" || j.__shibukExternalMirrorPatchedOpen)
      return;
    const E = j.open;
    j.open = function(z, G, ...K) {
      const $ = G instanceof J ? G.toString() : typeof G === "string" ? G : null, Q = $ ? Z($) : null, H = Q ? _(Q) ?? Q : G;
      return E.call(this, z, H, ...K);
    };
    j.__shibukExternalMirrorPatchedOpen = !0;
  };
  if (!D.__shibukExternalMirrorShimInstalled) {
    C();
    A();
    B();
    D.__shibukExternalMirrorShimInstalled = !0;
    console.info(`[shibuk] external mirror shim active for ${W.size} host(s)`);
  }
})(capturedHostsManifest);