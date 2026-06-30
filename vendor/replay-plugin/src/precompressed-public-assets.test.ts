import { describe, expect, it } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { brotliCompressSync } from 'node:zlib';
import { servePrecompressedPublicAsset } from './precompressed-public-assets.ts';

const createResponse = () => {
    const bodyChunks: Buffer[] = [];
    const headers = new Map<string, string>();

    return {
        bodyChunks,
        headers,
        res: {
            end: (body?: string | Buffer | Uint8Array) => {
                if (body) {
                    bodyChunks.push(Buffer.from(body));
                }
            },
            setHeader: (name: string, value: string | number) => {
                headers.set(name.toLowerCase(), String(value));
            },
            statusCode: 200,
        },
    };
};

const createRequest = ({
    acceptEncoding,
    method = 'GET',
    url,
}: {
    acceptEncoding?: string;
    method?: string;
    url: string;
}) => {
    const req = new PassThrough() as PassThrough & {
        headers: Record<string, string>;
        method: string;
        url: string;
    };
    req.headers = acceptEncoding ? { 'accept-encoding': acceptEncoding } : {};
    req.method = method;
    req.url = url;
    req.end();
    return req;
};

describe('servePrecompressedPublicAsset', () => {
    it('should serve Brotli-compressed unity wasm assets with Brotli and wasm headers', async () => {
        const publicDir = mkdtempSync(path.join(tmpdir(), 'shibuk-precompressed-public-'));
        try {
            mkdirSync(path.join(publicDir, 'Build'), { recursive: true });
            await Bun.write(
                path.join(publicDir, 'Build', 'app.wasm.br'),
                brotliCompressSync(Buffer.from([0x00, 0x61, 0x73, 0x6d, 0x01])),
            );

            const req = createRequest({
                acceptEncoding: 'gzip, br',
                url: '/Build/app.wasm.br',
            });

            const { bodyChunks, headers, res } = createResponse();
            const served = await servePrecompressedPublicAsset({
                publicDir,
                req: req as never,
                res: res as never,
            });

            expect(served).toBeTrue();
            expect(res.statusCode).toBe(200);
            expect(headers.get('content-encoding')).toBe('br');
            expect(headers.get('content-type')).toBe('application/wasm');
            expect(headers.get('vary')).toBe('Accept-Encoding');
            expect(Buffer.concat(bodyChunks)).toEqual(brotliCompressSync(Buffer.from([0x00, 0x61, 0x73, 0x6d, 0x01])));
        } finally {
            rmSync(publicDir, { force: true, recursive: true });
        }
    });

    it('should avoid Brotli response headers when a .wasm.br file already contains raw wasm bytes', async () => {
        const publicDir = mkdtempSync(path.join(tmpdir(), 'shibuk-precompressed-public-'));
        try {
            mkdirSync(path.join(publicDir, 'Build'), { recursive: true });
            await Bun.write(path.join(publicDir, 'Build', 'app.wasm.br'), new Uint8Array([0x00, 0x61, 0x73, 0x6d]));

            const req = createRequest({
                acceptEncoding: 'gzip, br',
                url: '/Build/app.wasm.br',
            });

            const { headers, res } = createResponse();
            const served = await servePrecompressedPublicAsset({
                publicDir,
                req: req as never,
                res: res as never,
            });

            expect(served).toBeTrue();
            expect(res.statusCode).toBe(200);
            expect(headers.get('content-encoding')).toBeUndefined();
            expect(headers.get('content-type')).toBe('application/wasm');
        } finally {
            rmSync(publicDir, { force: true, recursive: true });
        }
    });

    it('should avoid Brotli response headers when a .data.br file already contains raw Unity data bytes', async () => {
        const publicDir = mkdtempSync(path.join(tmpdir(), 'shibuk-precompressed-public-'));
        try {
            mkdirSync(path.join(publicDir, 'Build'), { recursive: true });
            await Bun.write(path.join(publicDir, 'Build', 'app.data.br'), 'UnityWebData1.0\u0000payload');

            const req = createRequest({
                acceptEncoding: 'gzip, br',
                url: '/Build/app.data.br',
            });

            const { headers, res } = createResponse();
            const served = await servePrecompressedPublicAsset({
                publicDir,
                req: req as never,
                res: res as never,
            });

            expect(served).toBeTrue();
            expect(res.statusCode).toBe(200);
            expect(headers.get('content-encoding')).toBeUndefined();
            expect(headers.get('content-type')).toBe('application/octet-stream');
        } finally {
            rmSync(publicDir, { force: true, recursive: true });
        }
    });

    it('should refuse Brotli-only payloads when the client does not advertise Brotli support', async () => {
        const publicDir = mkdtempSync(path.join(tmpdir(), 'shibuk-precompressed-public-'));
        try {
            mkdirSync(path.join(publicDir, 'Build'), { recursive: true });
            await Bun.write(path.join(publicDir, 'Build', 'app.js.br'), brotliCompressSync('console.log("ready");\n'));

            const req = createRequest({
                acceptEncoding: 'gzip, deflate',
                url: '/Build/app.js.br',
            });

            const { bodyChunks, headers, res } = createResponse();
            const served = await servePrecompressedPublicAsset({
                publicDir,
                req: req as never,
                res: res as never,
            });

            expect(served).toBeTrue();
            expect(res.statusCode).toBe(406);
            expect(headers.get('content-encoding')).toBeUndefined();
            expect(Buffer.concat(bodyChunks).toString('utf8')).toContain('Brotli');
        } finally {
            rmSync(publicDir, { force: true, recursive: true });
        }
    });

    it('should serve raw text .br assets without Brotli headers when the payload is not compressed', async () => {
        const publicDir = mkdtempSync(path.join(tmpdir(), 'shibuk-precompressed-public-'));
        try {
            mkdirSync(path.join(publicDir, 'Build'), { recursive: true });
            await Bun.write(path.join(publicDir, 'Build', 'app.js.br'), 'console.log("plain-text");\n');

            const req = createRequest({
                acceptEncoding: 'gzip, br',
                url: '/Build/app.js.br',
            });

            const { bodyChunks, headers, res } = createResponse();
            const served = await servePrecompressedPublicAsset({
                publicDir,
                req: req as never,
                res: res as never,
            });

            expect(served).toBeTrue();
            expect(res.statusCode).toBe(200);
            expect(headers.get('content-encoding')).toBeUndefined();
            expect(headers.get('content-type')).toBe('application/javascript');
            expect(Buffer.concat(bodyChunks).toString('utf8')).toContain('plain-text');
        } finally {
            rmSync(publicDir, { force: true, recursive: true });
        }
    });

    it('should preserve svg content types for precompressed assets', async () => {
        const publicDir = mkdtempSync(path.join(tmpdir(), 'shibuk-precompressed-public-'));
        try {
            mkdirSync(path.join(publicDir, 'Build'), { recursive: true });
            await Bun.write(path.join(publicDir, 'Build', 'icon.svg.br'), '<svg viewBox="0 0 1 1"></svg>');

            const req = createRequest({
                acceptEncoding: 'gzip, br',
                url: '/Build/icon.svg.br',
            });

            const { headers, res } = createResponse();
            const served = await servePrecompressedPublicAsset({
                publicDir,
                req: req as never,
                res: res as never,
            });

            expect(served).toBeTrue();
            expect(res.statusCode).toBe(200);
            expect(headers.get('content-encoding')).toBeUndefined();
            expect(headers.get('content-type')).toBe('image/svg+xml');
        } finally {
            rmSync(publicDir, { force: true, recursive: true });
        }
    });
});
