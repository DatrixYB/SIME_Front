// pos-frontend/src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getValidate } from './services/auth-service';

export const config = {
  matcher: ['/dashboard/:path*'],
};

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  console.log('Current Path:', currentPath);
  console.log('REQ:', req);
  console.log(localStorage.getItem('access_token'))
  console.log(localStorage.getItem('refresh_token'))
  if (!currentPath.startsWith('/dashboard')) return NextResponse.next();

  const authHeader = req.headers.get('authorization');
  const token = localStorage.getItem('access_token');

  console.log('🔐 Authorization Header:', authHeader);

  if (!token) {
    console.log('❌ Token ausente');
    return NextResponse.redirect(new URL('/', req.url));
  }

  const accessToken = token

  try {
    const user = await getValidate(accessToken);
    console.log('✅ Token válido:', user);
    return NextResponse.next();
  } catch (error: any) {
    console.log('❌ Token inválido o expirado');
    return NextResponse.redirect(new URL('/', req.url));
  }
}