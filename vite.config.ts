import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** Chrome 常请求站点根路径 /favicon.ico；把请求转到 public 里的图标 */
function rootFaviconPlugin(): Plugin {
  const send = (res: import('http').ServerResponse, file: string, type: string) => {
    if (!fs.existsSync(file)) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', 'no-cache');
    fs.createReadStream(file).pipe(res);
  };

  return {
    name: 'root-favicon',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        const pub = path.resolve(rootDir, 'public');
        if (url === '/favicon.ico' || url === '/YFBDocument/favicon.ico') {
          return send(res, path.join(pub, 'favicon.ico'), 'image/x-icon');
        }
        if (url === '/favicon.png' || url === '/YFBDocument/favicon.png') {
          return send(res, path.join(pub, 'favicon.png'), 'image/png');
        }
        if (url === '/favicon.svg' || url === '/YFBDocument/favicon.svg') {
          return send(res, path.join(pub, 'favicon.svg'), 'image/svg+xml');
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        const dist = path.resolve(rootDir, 'dist');
        if (url === '/favicon.ico' || url === '/YFBDocument/favicon.ico') {
          return send(res, path.join(dist, 'favicon.ico'), 'image/x-icon');
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), rootFaviconPlugin()],
  base: '/YFBDocument/',
  server: {
    host: true,
    port: 3001,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 3001,
    strictPort: true,
  },
});
