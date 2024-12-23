package com.example.daon.config;

import com.example.daon.global.RedisService;
import com.example.daon.jwt.JwtAuthenticationEntryPoint;
import com.example.daon.jwt.JwtAuthenticationFilter;
import com.example.daon.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final String[] allAllowedUrls = {"/api/postCookie", "/api/SignIn", "/api/test",};    // 모두 허가
    private final String[] UserAllowedUrls = {"/**"};    // 유저만 허가
    private final String[] AdminAllowedUrls = {"/**"};    // 매니저만 허가
    private final String[] ManagerAllowedUrls = {"/api/testSuccess"};    // 관리자만 허가

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;


    //private String logout_url = "https://kauth.kakao.com/oauth/logout?client_id=${kakao.client.id}&logout_redirect_utl=${kakao.logout_redirect_url}";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                // USER, ADMIN 접근 허용
                .headers((headers) -> headers.addHeaderWriter(
                        new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)))
                .authorizeHttpRequests(requests ->
                        requests.requestMatchers(allAllowedUrls).permitAll()    // 허용할 url 목록을 배열로 분리했다
                                //.requestMatchers(ManagerAllowedUrls).hasRole("MANAGER")   // Manager 역할을 갖고 있는 경우

                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .formLogin(AbstractHttpConfigurer::disable)
                // 필터처리 후 에러처리하는 핸들러
                .exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(new JwtAuthenticationEntryPoint()))
                // JWT 인증을 위하여 직접 구현한 필터를 UsernamePasswordAuthenticationFilter 전에 실행하겠다는 설정이다.
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisService), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

  /*  @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() { //Oauth2 로그인
        return new DefaultOAuth2UserService();
    }*/

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
       /* 비밀번호 암호화 단일한 암호화 알고리즘을 사용합니다. 주로 BCrypt 해시 함수를 이용하여 비밀번호를 해싱합니다.
        강력한 해시 함수를 사용하여 보안성이 높습니다.
        사용자가 설정한 알고리즘을 사용하는 대신 BCrypt 알고리즘을 고정적으로 사용*/
        return new BCryptPasswordEncoder();
    }

}
