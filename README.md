# shibuk v4 workspace

This workspace was captured from https://www.itsoffbrand.com/ at 2026-06-16T13:38:53.276Z.

- `asl/` stores immutable donor bytes.
- `.lab/` stores derived replay evidence, capture ledgers, and operator context.
- Runtime globals are sampled into `asl/_network/runtime-probe.json`, and detected dependency pins land in `.lab/capture/runtime-fingerprint.json`.
- Service worker findings and deployment header requirements live in `.lab/capture/service-workers.json` and `.lab/capture/security-headers.json`.
- `.lab/capture/donor-classification.json` is the donor-shape routing hint for downstream tooling.
- Captured third-party runtime hosts are recorded in `asl/donor/_external/.captured-hosts.json`, and the workspace boots `public/__shibuk_external_mirror_bootstrap.js` plus an entrypoint import of `src/_runtime/external-mirror-shim.js` so synchronous libraries and later module code both localize runtime-constructed CDN/WASM requests onto `/_external/<host>/...`.
- `.env.example` contains sanitized capture-time config hints when shibuk could extract them safely.
- The workspace root is the runnable Vite app surface.
- Operator docs in the shibuk source tree: `docs/v4-workspace-layout.md` and `docs/v4-workspace-troubleshooting.md`

Run:

```bash
bun install
bun run dev
```
