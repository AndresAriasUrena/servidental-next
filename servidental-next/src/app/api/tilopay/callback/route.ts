export function GET(request: Request): Response {
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL('/checkout/tilopay-callback', request.url).pathname,
      'Cache-Control': 'no-store',
    },
  });
}
