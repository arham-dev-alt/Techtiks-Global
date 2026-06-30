import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { brotliDecompressSync } from 'node:zlib';

const PRECOMPRESSED_CONTENT_TYPES: Record<string, string> = {
    '.bin': 'application/octet-stream',
    '.css': 'text/css',
    '.data': 'application/octet-stream',
    '.htm': 'text/html',
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.mjs': 'application/javascript',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.wasm': 'application/wasm',
    '.webmanifest': 'application/manifest+json',
    '.xml': 'application/xml',
};
const RAW_WASM_MAGIC = new Uint8Array([0x00, 0x61, 0x73, 0x6d]);
const RAW_UNITY_DATA_PREFIX = new TextEncoder().encode('UnityWebData1.0\0');
const BROTLI_REQUIRED_RESPONSE = 'Requested asset requires Brotli support.\n';

const resolvePublicAssetPath = (publicDir: string, pathname: string) => {
    const decodedPath = decodeURIComponent(pathname);
    const assetPath = path.resolve(publicDir, `.${decodedPath}`);
    const publicRoot = `${path.resolve(publicDir)}${path.sep}`;

    if (assetPath !== path.resolve(publicDir) && !assetPath.startsWith(publicRoot)) {
        return null;
    }

    return assetPath;
};

const startsWithBytes = (input: Uint8Array, prefix: Uint8Array) => {
    if (input.length < prefix.length) {
        return false;
    }

    for (let index = 0; index < prefix.length; index++) {
        if (input[index] !== prefix[index]) {
            return false;
        }
    }

    return true;
};

const shouldSendBrotliEncoding = (sourceExtension: string, body: Uint8Array) => {
    if (sourceExtension === '.wasm' && startsWithBytes(body, RAW_WASM_MAGIC)) {
        return false;
    }

    if (sourceExtension === '.data' && startsWithBytes(body, RAW_UNITY_DATA_PREFIX)) {
        return false;
    }

    try {
        brotliDecompressSync(body);
        return true;
    } catch {
        return false;
    }
};

const resolvePrecompressedAssetHeaders = (pathname: string, body: Uint8Array) => {
    if (!pathname.endsWith('.br')) {
        return null;
    }

    const sourcePathname = pathname.slice(0, -'.br'.length);
    const sourceExtension = path.extname(sourcePathname).toLowerCase();
    return {
        ...(shouldSendBrotliEncoding(sourceExtension, body)
            ? {
                  'Content-Encoding': 'br',
                  Vary: 'Accept-Encoding',
              }
            : {}),
        'Content-Type': PRECOMPRESSED_CONTENT_TYPES[sourceExtension] ?? 'application/octet-stream',
    };
};

const clientAcceptsBrotli = (req: IncomingMessage) => {
    const acceptEncoding = req.headers['accept-encoding'];
    const headerValue = Array.isArray(acceptEncoding) ? acceptEncoding.join(',') : (acceptEncoding ?? '');
    return headerValue
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .some((value) => value === 'br' || value.startsWith('br;'));
};

const writeBrotliNotAcceptableResponse = ({
    method,
    res,
}: {
    method: string;
    res: ServerResponse<IncomingMessage>;
}) => {
    res.statusCode = 406;
    res.setHeader('Content-Length', String(Buffer.byteLength(BROTLI_REQUIRED_RESPONSE)));
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Vary', 'Accept-Encoding');
    if (method !== 'HEAD') {
        res.end(BROTLI_REQUIRED_RESPONSE);
        return;
    }

    res.end();
};

export const servePrecompressedPublicAsset = async ({
    publicDir,
    req,
    res,
}: {
    publicDir: string;
    req: IncomingMessage;
    res: ServerResponse<IncomingMessage>;
}) => {
    const method = (req.method ?? 'GET').toUpperCase();
    if (method !== 'GET' && method !== 'HEAD') {
        return false;
    }

    const requestUrl = new URL(req.url ?? '/', 'http://127.0.0.1');
    if (!requestUrl.pathname.endsWith('.br')) {
        return false;
    }

    const assetPath = resolvePublicAssetPath(publicDir, requestUrl.pathname);
    if (!assetPath) {
        return false;
    }

    const assetFile = Bun.file(assetPath);
    if (!(await assetFile.exists())) {
        return false;
    }

    const body = new Uint8Array(await assetFile.arrayBuffer());
    const headers = resolvePrecompressedAssetHeaders(requestUrl.pathname, body);
    if (!headers) {
        return false;
    }
    if (headers['Content-Encoding'] === 'br' && !clientAcceptsBrotli(req)) {
        writeBrotliNotAcceptableResponse({ method, res });
        return true;
    }

    res.statusCode = 200;
    for (const [name, value] of Object.entries(headers)) {
        res.setHeader(name, value);
    }
    res.setHeader('Content-Length', String(body.byteLength));
    if (method !== 'HEAD') {
        res.end(body);
    } else {
        res.end();
    }

    return true;
};
