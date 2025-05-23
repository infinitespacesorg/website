import { NextRequest, NextResponse } from 'next/server';
console.log("logout");

export function GET(request: NextRequest) {
  // Build an absolute URL for the redirect
  const url = new URL('/', request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set('gate_auth', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
} 