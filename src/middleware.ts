//  pos-frontend/src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getValidate, getRefreshToken } from './services/auth-service';

export const config = {
  matcher: ['/dashboard/:path*'],
};

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  console.log('Current Path:', currentPath);
  if (!currentPath.startsWith('/dashboard')) return NextResponse.next();
  if (currentPath.endsWith('dashboard')) return NextResponse.next();

  // const accessToken = req.cookies.get('access_token')?.value;
  // const refreshToken = req.cookies.get('refresh_token')?.value;
  console.log("middleware");
  


 
    return NextResponse.redirect(new URL('/', req.url));
  
}
