import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware para excluir archivos estáticos de auth/preview
export function middleware(request: NextRequest) {
  // Permitir todas las requests pasar sin modificación
  return NextResponse.next();
}

// Configuración para excluir archivos estáticos, manifests, etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap)
     * - site.webmanifest (web manifest)
     * - public folder assets (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico|.*\\.webp).*)',
  ],
};
