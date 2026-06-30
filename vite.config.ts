import { defineConfig } from 'vite';
import { shibukReplayPlugin } from './vendor/replay-plugin/dist/index.js';

export default defineConfig({
  plugins: [shibukReplayPlugin()],
  publicDir: 'public',
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});
