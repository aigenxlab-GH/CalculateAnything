/**
 * Cloudflare Pages Function to handle trailing slashes
 * Redirects /path to /path/ (except for files and existing trailing slashes)
 */
type PagesContext = { request: Request; next: () => Promise<Response> };

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Skip if already has trailing slash
  if (pathname.endsWith('/')) {
    return context.next();
  }

  // Skip if looks like a file (has extension)
  if (pathname.match(/\.\w+$/)) {
    return context.next();
  }

  // Skip root path
  if (pathname === '' || pathname === '/') {
    return context.next();
  }

  // Redirect to trailing slash version
  return new Response(null, {
    status: 301,
    headers: {
      'Location': pathname + '/',
    },
  });
};
