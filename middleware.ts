import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/S3-canvas/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle redirect from /account to /account/profile
  if (pathname === '/account') {
    const url = request.nextUrl.clone()
    url.pathname = '/account/profile'
    return NextResponse.redirect(url)
  }

  // Otherwise, continue session update as usual
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    // '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',

    '/account/:path*',
    '/forum/:path*',
    '/reset-password/:path*'

    // '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|ico)$).*)'
  ],
}