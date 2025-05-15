// middleware.ts 예제
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, MAIN_URL, PUBLIC_ROUTES } from './model/constants/routes/asideOptions';
import { cookies } from 'next/headers';
import { kebabToCamel } from './features/share/kebabToCamel';


export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const { pathname, searchParams } =request.nextUrl;

    const cookie = (await cookies()).get('accessToken')?.value;
    const enable_url = (await cookies()).get('enable_url')?.value;
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    if(!enable_url){
      response.cookies.delete('accessToken');
      return response;
    }
    
    if(!cookie && !pathname.startsWith('/')){
        return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.url));
    }else if(cookie && isPublicRoute){
        return NextResponse.redirect(new URL(MAIN_URL, request.url));
    }
    const able_url = JSON.parse(enable_url)

    if(pathname.startsWith(`/main`)){
      const [main,,...route] = pathname.split('/')
      if(route.length>1){
        const [nav,aside,..._] = route
        if(!able_url[kebabToCamel(nav)][kebabToCamel(aside)]){
          // return NextResponse.redirect(new URL(MAIN_URL, request.url));
        }
      }
    }else{
      const mergeAside = Object.assign({},...Object.values(able_url)) //사용가능한 url 리스트
      const division = searchParams.get('division')

      // 검색은 예외 처리
      if (pathname.includes('search')) return response;

      const shouldBlock = () => {
        // division 접근 제한 => accounting의 division에 따른 제한
        if (division && !mergeAside[division]) return true;

        // 업무처리창 접근 제한
        if (pathname === 'action-taken' && !mergeAside['task']) return true;

        // 전표 전환 접근 제한
        if (pathname === 'trans-estimate' && !mergeAside['taskEstimate']) return true;

        // 일반적인 register 페이지 접근 제한
        const convertedKey = kebabToCamel(pathname.replace('register', ''));
        if (mergeAside[convertedKey] === false) return true;

        return false;
      };

      if (shouldBlock()) {
        return new NextResponse(null, { status: 404 });
      }
    }

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