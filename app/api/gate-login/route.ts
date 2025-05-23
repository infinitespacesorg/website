import { NextRequest, NextResponse } from 'next/server';
console.log("login");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const password = formData.get('password');
  if (password === process.env.PASSWORD_GATE) {
    const res = NextResponse.redirect(new URL('/gateway', req.url));
    res.cookies.set('gate_auth', '1', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    });
    return res;
  }
  // Redirect back to the login page with an error query param
  return NextResponse.redirect(new URL('/gateway?error=1', req.url));
} 