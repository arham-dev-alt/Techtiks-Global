import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { shibukReplayPlugin } from './vendor/replay-plugin/dist/index.js';

const pagePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const oldPortfolioAssetIds = [
  '6a0af3f0f9966932ded55387',
  '68ece3e91ef2f1125c5b57eb',
  '6980c243418b458602403062',
  '6734a0e12af1829d3c649f35',
  '688216a05de42d3adfe4bf47',
  '6863c2232943ccb7fa37b67e',
];

const stripOldPortfolioCaptureAssets = () => ({
  name: 'strip-old-portfolio-capture-assets',
  enforce: 'post' as const,
  generateBundle(_options: unknown, bundle: Record<string, { type: string; fileName: string; source?: string | Uint8Array }>) {
    for (const asset of Object.values(bundle)) {
      if (asset.type !== 'asset' || typeof asset.source !== 'string' || !asset.fileName.endsWith('.html')) continue;

      let source = asset.source;
      oldPortfolioAssetIds.forEach((id) => {
        source = source.replace(new RegExp(`\\s*"[^"]*${id}[^"]*":\\s*"image\\/(?:webp|jpg|jpeg|png)",?\\r?\\n`, 'g'), '\n');
      });
      asset.source = source;
    }
  },
});

export default defineConfig({
  plugins: [shibukReplayPlugin(), stripOldPortfolioCaptureAssets()],
  publicDir: 'public',
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: pagePath('./index.html'),
        ourWork: pagePath('./our-work/index.html'),
      },
    },
  },
});