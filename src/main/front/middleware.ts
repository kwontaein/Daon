// middleware.ts 예제
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, MAIN_URL, PUBLIC_ROUTES } from './model/constants/routes/asideOptions';
import { cookies } from 'next/headers';
import { kebabToCamel } from './features/share/kebabToCamel';
import { revalidateAllPaths } from './features/revalidateHandler';
function camelToKebab(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const { pathname, searchParams } =request.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
    
    const enable_url = (await cookies()).get('enable_url')?.value;
    const cookie = (await cookies()).get('accessToken')?.value;

    if(pathname.startsWith('/logout')){
      const redirectResponse = NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.url));
      redirectResponse.cookies.delete('accessToken');
      redirectResponse.cookies.delete('enable_url');
      return redirectResponse;
    }

    if((!enable_url || !cookie)){
      //하나라도 없으면 전부 삭제
      const redirectResponse = NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.url));
      redirectResponse.cookies.delete('accessToken');
      redirectResponse.cookies.delete('enable_url');
      revalidateAllPaths()

      if(!isPublicRoute){ //권한이 없는데 공용라우트가 아니면 로그인창으로 우회
        return redirectResponse;
      }
    }else{ 
      if(cookie && pathname === AUTH_ROUTES.LOGIN){ //쿠키가 존재하는데 로그인창으로 이동 시도 시 => 다시 돌아가기
          return NextResponse.redirect(new URL(MAIN_URL, request.url));
      }
      try{
        const able_url = JSON.parse(enable_url)
        const mergeAside = Object.assign({},...Object.values(able_url)) //사용가능한 url 객체 {[key]:boolean}형식
  
        const findEnableRoute = ()=>{
            if(mergeAside['schedule']){ //스케줄 먼저 우회시도
              return NextResponse.redirect(new URL('/main/schedule/schedule', request.url));
            }else{
              const firstAbleRoute = Object.entries(able_url).flatMap(([nav, asides]) =>
                  Object.entries(asides)
                    .filter(([_, isAble]) => isAble)
                    .map(([aside]) => ({ nav, aside })))
              if(firstAbleRoute.length>0){
                const {nav, aside} = firstAbleRoute[0];
                return NextResponse.redirect(new URL(`/main/${camelToKebab(nav)}/${camelToKebab(aside)}`, request.url));
              }else{
                return new NextResponse(null, { status: 404 }); //우회 가능한 경로가 없으면 404
              }
            }
        }
  
        if(pathname.startsWith(`/main`)){
          const [,main,...route] = pathname.split('/')
          if(route.length>1){
            const [nav,aside,..._] = route

            if(!able_url[kebabToCamel(nav)][kebabToCamel(aside)]){ //접근 권한 없는 /main/... 경로 접근 시 첫 사용 가능 경로로 리다이렉트
              const enAbleAside =Object.entries(able_url[kebabToCamel(nav)]).find(([asdie, isAble])=>isAble)[0]
              if(enAbleAside){
                return NextResponse.redirect(new URL(`/main/${camelToKebab(nav)}/${camelToKebab(enAbleAside)}`, request.url));
              }else{
                return findEnableRoute()
              }
            }
          }else{// /main으로 시작하나 이후 설정된 주소가 없다면 => /main 인경우
              return findEnableRoute()
          }
        }else{
          const division = searchParams.get('division')
  
          // 검색은 예외 처리
          if (pathname.includes('search')) return response;
          const checkPathname = pathname.replace(/^\/?register-/, '');
          const shouldBlock = () => {
            // division 접근 제한 => accounting의 division에 따른 제한
            if (division && !mergeAside[division]) return true;
  
            // 업무처리창 접근 제한
            if (checkPathname === 'action-taken' && !mergeAside['task']) return true;
  
            // 전표 전환 접근 제한
            if (checkPathname === 'trans-estimate' && !mergeAside['taskEstimate']) return true;
  
            // 일반적인 register 페이지 접근 제한
            const convertedKey = kebabToCamel(checkPathname);
            if (mergeAside[convertedKey] === false) return true;
  
            return false;
          };
  
          if (shouldBlock()) {
            return new NextResponse(null, { status: 404 });
          }
        }
      }catch(e){
        const redirectResponse = NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.url));
        redirectResponse.cookies.delete('accessToken');
        redirectResponse.cookies.delete('user');
        redirectResponse.cookies.delete('enable_url');
        return redirectResponse;
      }  
    }
    
    return response

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