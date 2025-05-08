package com.example.daon.jwt;

import com.example.daon.global.service.RedisService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;

    //doFilter 메소드가 가장 먼저 실행되는 이유 : 클라이언트의 HTTP 요청이 서블릿 컨테이너에 도달하기 전에 필터가 요청을 가로채어 원하는 작업을 수행하기 때문
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String requestURI = httpRequest.getRequestURI();

        /**
         * 쿠키 확인용
         */
        Cookie[] cookies = httpRequest.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println("Cookie: " + cookie.getName() + " = " + cookie.getValue());
            }
        } else {
            System.out.println("요청에 쿠키 없음");
        }
        String uri = httpRequest.getRequestURI();        // /api/user/info
        String method = httpRequest.getMethod();         // GET, POST 등
        String queryString = httpRequest.getQueryString(); // 파라미터 ?id=1&name=test

        System.out.println("요청 API URI: " + uri);
        System.out.println("요청 메서드: " + method);
        System.out.println("Query String: " + queryString);
        System.out.println("전체 요청 URL: " + httpRequest.getRequestURL().toString());

        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
            System.out.println("프리플라이트 OPTIONS 요청 감지: " + httpRequest.getRequestURI());
        }


        // 특정 API는 필터링 없이 바로 통과
        if (isExcludedURI(requestURI)) {
            chain.doFilter(request, response);
            return;
        }

        // Request로부터 JWT 토큰을 추출
        String token = resolveCookieFilter(httpRequest)[0];
        if (token == null) {
            System.out.println("토큰 없음");
            // 토큰이 없으면 401 Unauthorized 응답
            respondWithUnauthorized(httpResponse);
            return;
        }

        // JWT 토큰에서 Authentication 객체를 생성하고, 저장된 리프레시 토큰을 가져옴
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        String dbRefreshToken = redisService.getUserTokenById(authentication.getName());
        String refreshValidate = jwtTokenProvider.validateToken(dbRefreshToken);

        // JWT 토큰의 유효성을 검사
        String tokenValidationResult = jwtTokenProvider.validateToken(token);
        if ("true".equals(tokenValidationResult)) {
            System.out.println("토큰 인증 성공");
            // 인증 객체를 SecurityContext에 세팅해야 함
            SecurityContextHolder.getContext().setAuthentication(authentication); // ✅ 추가 필요
            response = tokenTrue(token, httpResponse, authentication);
        } else if ("Expired JWT Token".equals(tokenValidationResult)) {
            // 토큰이 만료되었을 경우 처리
            System.out.println("만료된 토큰");
            handleExpiredToken(httpResponse, authentication, dbRefreshToken, refreshValidate);
        } else {
            // 토큰이 유효하지 않으면 401 Unauthorized 응답
            System.out.println("유효하지 않은 토큰");
            respondWithUnauthorized(httpResponse);
        }

        System.out.println();
        System.out.println();
        System.out.println();
        // 응답이 아직 커밋되지 않았다면, 필터 체인을 계속 진행
        if (!httpResponse.isCommitted()) {
            chain.doFilter(request, response);
        }
    }

    private boolean isExcludedURI(String requestURI) {
        // 인증 없이 접근 가능한 특정 URI를 확인
        return "/api/signIn".equals(requestURI) ||
                "/api/postCookie".equals(requestURI) ||
                /*"/api/getMyDetail".equals(requestURI) ||*/
                "/api/test".equals(requestURI);
    }

    private void respondWithUnauthorized(HttpServletResponse response) throws IOException {
        // 401 Unauthorized 응답을 작성
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Unauthorized");
    }

    private void handleExpiredToken(HttpServletResponse response, Authentication authentication, String dbRefreshToken, String refreshValidate) throws IOException {
        // 만료된 JWT 토큰을 처리
        if (dbRefreshToken == null) {
            // 리프레시 토큰이 없을 경우 403 Forbidden 응답
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("No Refresh Token");
        } else if ("true".equals(refreshValidate)) {
            // 리프레시 토큰이 유효하면 새로운 액세스 토큰을 발급
            JwtToken newToken = jwtTokenProvider.refreshAccessToken(authentication, dbRefreshToken);
            Authentication newAuth = jwtTokenProvider.getAuthentication(newToken.getAccessToken());
            SecurityContextHolder.getContext().setAuthentication(newAuth);
        } else {
            // 리프레시 토큰이 유효하지 않으면 401 Unauthorized 응답
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid JWT Token");
        }
    }


    private ServletResponse tokenTrue(String token, HttpServletResponse httpResponse, Authentication authentication) {
        // SecurityContext 에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);

        authentication = jwtTokenProvider.getAuthentication(token);
        String DbRefreshToken = redisService.getUserTokenById(authentication.getName());
        if (DbRefreshToken == null || !jwtTokenProvider.validateToken(DbRefreshToken).equals("true")) {
            //RefreshToken 값이 비었다면
            removeCookie(httpResponse);
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
            httpResponse.setContentType("application/json");
        }
        return httpResponse;
    }

    private ServletResponse tokenFalse(HttpServletResponse httpResponse, Authentication authentication) {
        //System.out.println("tokenFalse 실행");
        removeCookie(httpResponse);
        redisService.deleteUserToken(authentication.getName());
        // 리스폰스에 정보 담아 반환
        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
        httpResponse.setContentType("application/json"); // 본문의 형식을 지정합니다. 여기서는 일반 텍스트로 설정하였습니다.
        return httpResponse;
    }


    //헤더 쿠키에서 토큰 값 가져오는 메소드
    private String[] resolveCookieFilter(HttpServletRequest request) {
        Cookie[] requestCookie = request.getCookies(); // 리퀘스트 헤더에서 쿠키 목록 가져오기
        String[] tokenList = new String[2];

        if (requestCookie != null) {
            for (Cookie cookie : requestCookie) {
                if ("accessToken".equals(cookie.getName())) {
                    tokenList[0] = cookie.getValue();
                } else if ("refreshToken".equals(cookie.getName())) {
                    tokenList[1] = cookie.getValue();
                }
            }
        }
        return tokenList;
    }

    public void removeCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("accessToken", null);
        Cookie cookie2 = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie2.setMaxAge(0);
        cookie2.setPath("/");
        response.addCookie(cookie);
        response.addCookie(cookie2);
    }
}