// middleware.ts 예제
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, MAIN_URL, PUBLIC_ROUTES } from './model/constants/routes/asideOptions';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const { pathname } =request.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
    const cookie = (await cookies()).get('accessToken')?.value;
    console.log(isPublicRoute, cookie)
    if(!cookie && pathname.startsWith('/main')){
        console.log(isPublicRoute)
        return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.url));
    }
    if(cookie && isPublicRoute){
        return NextResponse.redirect(new URL(MAIN_URL, request.url));
    }

    const res = NextResponse.next();
    
    return response;
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};