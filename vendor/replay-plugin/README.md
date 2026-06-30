# @shibuk/replay-plugin

Vite replay support for `shibuk` v4 workspaces.

## Scope

- Replays captured HTTP cassette routes during `vite dev` through dev-server middleware.
- Injects storage seeds and applies service-worker replay policy during `vite dev` and `vite preview`.
- Serves captured service-worker scripts when `.lab/capture/strip-decisions.json` opts into `replay-script`.
- Emits COOP/COEP headers in dev/preview and writes `dist/_headers`, `dist/headers.json`, and `dist/SHIPPING.md` when the donor requires cross-origin isolation.
- Rewrites `window.WebSocket` targets to the local replay endpoint during `vite dev`.
- Supports `buildBehaviour: 'inline-static-get'` by rewriting matching static `fetch()` GET callsites into per-route virtual imports during production builds.
- Emits ledger-backed runtime events for strip stubs and shape-stub hits or misses when the workspace ledger is available.
- Uses `ws` because Vite's dev/preview middleware hooks expose a Node HTTP server rather than Bun-native websocket primitives.

## Options

```ts
type ShibukReplayPluginOptions = {
  labCapturePath?: string;
  buildBehaviour?: 'inline-static-get' | 'drop-all';
  loudTelemetry?: boolean;
};
```

- `labCapturePath`
  Default: `.lab/capture`
- `buildBehaviour`
  Default: `inline-static-get`
  In build mode the injected browser runtime strips storage seeds, websocket scripts, and donor header echoes while still preserving service-worker policy and COOP/COEP warnings.
- `loudTelemetry`
  Default: `true` in dev, `false` in build

## Capture Inputs

The plugin consumes these replay artifacts from `.lab/capture/`:

- `strip-decisions.json`
  Service worker actions use `neutralise`, `replay-script`, and `preserve`.
- `service-workers.json`
  Captured worker scripts plus their inferred purpose and registration origins.
- `security-headers.json`
  Donor COOP/COEP observations and whether replay must force cross-origin isolation.

## Build Outputs

The `inline-static-get` build path emits one virtual ESM module per rewritten static GET route. Those modules inline the recorded response body into the production bundle and avoid any runtime dependency on `.lab/capture/http/`.

When replay needs deployment-side cross-origin isolation, the plugin writes:

- `dist/_headers`
  Netlify-style path matcher plus HTTP header lines.
- `dist/headers.json`
  Plain JSON map using standard header names, for example:
  ```json
  {
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin"
  }
  ```
- `dist/SHIPPING.md`
  Operator guidance for carrying those headers into the final hosting platform.

Verification and doctor-style smoke checks should fail if any of those three files are missing while replay still requires COOP/COEP deployment headers.

## Current Gaps

- Dynamic, ambiguous, or body-sensitive `fetch()` callsites are intentionally left untouched in build output and fall back to the app's normal runtime behavior.
- Runtime-event ledger emission is a dev/preview aid. Static builds do not ship a writable ledger sink into the published bundle.

## Security Model

- `replay-script` intentionally executes the captured service worker source in the local replay environment.
- Use `neutralise` unless the donor genuinely needs the worker to boot or stay interactive.
- Review `.lab/capture/service-workers.json` and `.lab/capture/security-headers.json` before switching a worker to `replay-script`.

## Shape Stub Marking

- HTTP shape stubs add `X-Shibuk-Shape-Only: 1`.
- JSON object HTTP shape stubs add `__shibuk_shape_only: true` to the payload body.
- WebSocket shape stubs mark JSON object text frames with `__shibuk_shape_only: true`.
- Non-JSON and binary payloads keep protocol-compatible bodies and rely on telemetry plus headers where applicable.
