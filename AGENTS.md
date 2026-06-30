# Workspace Guide

This directory is a shibuk v4 workspace captured from https://www.itsoffbrand.com/. All paths
below are relative to this workspace root.

- Use the app root directly: `bun run dev`, `bun run build`, `bun run preview`
- Read `.lab/AGENT_SKILL.md` for workspace-local context
- Check `.lab/capture/runtime-fingerprint.json` before swapping framework/runtime package versions
- Check `.lab/capture/donor-classification.json` before choosing inline-split vs bundled extraction workflows
- Review `.lab/capture/service-workers.json` and `.lab/capture/security-headers.json` before changing replay boot policy
- Check `asl/donor/_external/.captured-hosts.json`, `public/__shibuk_external_mirror_bootstrap.js`, and `src/_runtime/external-mirror-shim.js` before debugging runtime-constructed CDN or WASM requests. The bootstrap covers pre-module snapshots; the entrypoint import keeps the same rewrite layer in the module graph.
- Review `.env.example` before creating a local `.env`
- Do not edit `asl/` by hand
- Do not hand-edit `.lab/capture/strip-decisions.json`
- Operator docs in the shibuk source tree: `docs/v4-workspace-layout.md` and `docs/v4-workspace-troubleshooting.md`
