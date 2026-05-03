export const config = {
  matcher: ['/', '/work/:path*'],
};

export default function middleware(request) {
  const cookie = request.headers.get('cookie') || '';
  const isAuth = cookie.split(';').some(c => c.trim() === 'auth=unlocked');
  if (isAuth) return;

  const from = new URL(request.url).pathname;
  return Response.redirect(
    new URL(`/gate.html?from=${encodeURIComponent(from)}`, request.url)
  );
}
