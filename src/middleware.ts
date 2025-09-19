import { NextRequest, NextResponse } from 'next/server';
import { getValidate, getRefreshToken } from './services/auth-service';

export const config = {
  matcher: ['/dashboard/:path*'],
};

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  console.log('Current Path:', currentPath);
  if (!currentPath.startsWith('/dashboard')) return NextResponse.next();

  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;
  console.log("middleware");
  console.log(accessToken);
  if (!accessToken || !refreshToken) {
    console.log('❌ Tokens ausentes');
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const user = await getValidate(accessToken);
    console.log('✅ Token válido:', user);
    return NextResponse.next();
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log('⚠️ Access token inválido, intentando refresh');

      try {
        const refreshed = await getRefreshToken(refreshToken);
        const newAccessToken = refreshed.access_token;

        const response = NextResponse.next();
        response.cookies.set('access_token', newAccessToken, {
          httpOnly: true,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 15,
        });

        return response;
      } catch (refreshError: any) {
        console.log('❌ Refresh token inválido, redirigiendo al login');
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    console.error('Error inesperado en validación:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
