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
  if (!currentPath.startsWith('/dashboard')) return NextResponse.next();

  const authHeader = req.headers.get('authorization');

  console.log('🔐 Authorization Header:', authHeader);

  if (!authHeader) {
    console.log('❌ Token ausente');
    return NextResponse.redirect(new URL('/', req.url));
  }

  const accessToken = authHeader.replace('Bearer ', '');

  try {
    const user = await getValidate(accessToken);
    console.log('✅ Token válido:', user);
    return NextResponse.next();
  } catch (error: any) {
    console.log('❌ Token inválido o expirado');
    return NextResponse.redirect(new URL('/', req.url));
  }
}