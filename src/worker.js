/**
 * studior.cc — Cloudflare Worker
 * Routes requests to appropriate HTML pages
 */

const ROUTES = {
  '/':            () => import('./pages/index.html'),
  '/resume':      () => import('./pages/resume.html'),
  '/photography': () => import('./pages/photography.html'),
  '/tools':       () => import('./pages/tools.html'),
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '') || '/';

    // Serve static assets from /public via env.ASSETS (Cloudflare Pages binding)
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request).catch(() => null);
      if (assetResponse && assetResponse.status !== 404) return assetResponse;
    }

    // Route to HTML pages
    const handler = ROUTES[path];
    if (handler) {
      try {
        const mod = await handler();
        return new Response(mod.default, {
          headers: { 'Content-Type': 'text/html;charset=UTF-8' },
        });
      } catch {
        // fall through to 404
      }
    }

    return new Response(notFound(), {
      status: 404,
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  },
};

function notFound() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404 — studior.cc</title>
  <style>body{background:#0a0a0a;color:#f5f2ec;font-family:'Space Mono',monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;flex-direction:column;gap:24px;}
  h1{font-size:80px;color:#e8391d;margin:0;}p{opacity:.4;letter-spacing:.2em;font-size:12px;}a{color:#e8391d;text-decoration:none;font-size:11px;letter-spacing:.2em;border:1px solid #e8391d;padding:12px 24px;}</style>
  </head><body><h1>404</h1><p>PAGE NOT FOUND</p><a href="/">← BACK HOME</a></body></html>`;
}
