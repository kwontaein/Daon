package com.example.daon.jwt;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.global.service.RedisService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {

    final UserRepository userRepository;
    final HttpServletResponse response;
    final RedisService redisService;
    private final Key key;
    private final long Hours = 60 * 60 * 1000L;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey, UserRepository userRepository, HttpServletResponse response, RedisService redisService) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.userRepository = userRepository;
        this.response = response;
        this.redisService = redisService;
    }

    // 클레임에서 권한 추출을 위한 도우미 메서드
    private Collection<? extends GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
        if (claims.get("auth") == null) {
            throw new RuntimeException("토큰에 권한이 포함되어 있지 않습니다.");
        }
        return Arrays.stream(claims.get("auth").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    // 유저 정보를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
    // -> DB 에서 refreshToken 값이 있다면 AccessToken 생성 메소드만 실행.
    // 없다면 두개 다 생성 메소드 실행
    public JwtToken generateToken(Authentication authentication, HttpServletResponse response) {
        String accessToken = generateAccessTokenBy(authentication.getName(), authentication.getAuthorities());
        String refreshToken = generateRefreshToken();

        createCookie(response, "accessToken", accessToken);
        redisService.saveUserToken(authentication.getName(), refreshToken);

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }


    //AccessToken 생성 메소드
    private String generateAccessTokenBy(String subject, Collection<? extends GrantedAuthority> authorities) {
        long now = (new Date()).getTime();
        //TODO 나중에 수정
        Date accessTokenExpiresIn = new Date(now + Hours);

        return Jwts.builder()
                .setSubject(subject)
                .claim("auth", authorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(",")))
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // RefreshToken 을 사용하여 AccessToken 재발급 메소드
    public JwtToken refreshAccessToken(Authentication authentication, String refreshToken) {
        String newAccessToken;
        String newRefreshToken;

        //토큰에서 id 찾기
        boolean token = redisService.isUserTokenValid(authentication.getName(), refreshToken);
        if (!token) {
            //System.out.println("유효하지 않은 리프레시 토큰입니다");
            return null;
        }

        // 리프레시 토큰에서 사용자 정보 및 권한 추출 -> 불가능
        UserEntity userEntity = userRepository.findById(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        newAccessToken = generateAccessTokenBy(userEntity.getUsername(), userEntity.getAuthorities());

        //리프레시 토큰도 새로 발급
        newRefreshToken = generateRefreshToken();
        //redis 에 저장
        redisService.updateUserToken(userEntity.getUsername(), newRefreshToken);

        //쿠키 값 재지정
        createCookie(response, "accessToken", newAccessToken);

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    // 새로운 RefreshToken 생성 메서드
    private String generateRefreshToken() {
        //리프레시 토큰의 기간 1주일
        long now = (new Date()).getTime();
        //TODO 나중에 수정
        Date accessTokenExpiresIn = new Date(now + 7 * Hours);

        return Jwts.builder()
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        if (accessToken == null || accessToken.trim().split("\\.").length != 3) {
            System.out.println("Invalid token format: " + accessToken);
            throw new MalformedJwtException("Invalid JWT format: " + accessToken);
        }

        // 토큰 복호화 [email(이메일), auth(권한) 정보를 가져옴], claims.getSubject = email
        Claims claims = parseClaims(accessToken);
        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities = getAuthoritiesFromClaims(claims);

        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보를 검증하는 메서드
    public String validateToken(String token) {

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return "true";
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            // log.info("Invalid JWT Token", e);//잘못된 토큰
            return "Invalid JWT Token";
        } catch (ExpiredJwtException e) {
            // log.info("Expired JWT Token", e);//만료된 토큰
            return "Expired JWT Token";
        } catch (UnsupportedJwtException e) {
            // log.info("Unsupported JWT Token", e);//지원하지 않는 토큰
            return "Unsupported JWT Token";
        } catch (IllegalArgumentException e) {
            // log.info("JWT claims string is empty.", e);//토큰이 비었음
            return "JWT claims string is empty";
        }
    }
    
    private Claims parseClaims(String accessToken) {
        if (accessToken == null || accessToken.trim().split("\\.").length != 3) {
            throw new MalformedJwtException("Invalid JWT format: " + accessToken);
        }

        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims(); // 만료된 토큰이라도 claim은 파싱 가능
        }
    }

    //쿠키 생성 메소드
    public void createCookie(HttpServletResponse response, String tokenName, String tokenValue) {
        Claims claims = parseClaims(tokenValue);

        long now = System.currentTimeMillis() / 1000;
        long expirationTime = claims.getExpiration().getTime() / 1000;
        int maxAge = (int) (expirationTime - now);

        Cookie cookie = new Cookie(tokenName, tokenValue); // 인코딩 제거

        cookie.setHttpOnly(true);
        cookie.setSecure(false); // 개발 환경에서는 false
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);

        response.addCookie(cookie);
    }

}