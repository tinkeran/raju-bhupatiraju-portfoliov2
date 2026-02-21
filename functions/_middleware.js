// Cloudflare Pages Middleware
// Handles routing for .html-less URLs (e.g. /resume → /resume.html)

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Direct asset requests pass through
  if (path.includes('.')) {
    return next();
  }

  // Route clean URLs to HTML files
  const routes = {
    '/': '/index.html',
    '/resume': '/resume.html',
    '/photography': '/photography.html',
    '/tools': '/tools.html',
  };

  const htmlPath = routes[path] || routes[path.replace(/\/$/, '')];
  if (htmlPath) {
    url.pathname = htmlPath;
    return env.ASSETS.fetch(new Request(url.toString(), request));
  }

  return next();
}
