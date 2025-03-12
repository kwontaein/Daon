package com.example.daon.global.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * 남은 유효 시간 계산
     *
     * @param key 유효 시간 확인할 키
     * @return 유효 시간
     */
    public long getRemainingTTL(String key) {
        Duration duration = Duration.ofDays(redisTemplate.getExpire(key));
        return duration != null ? duration.getSeconds() : -2;  // Duration이 null인 경우는 키가 존재하지 않을 때
    }

    /**
     * 유저 토큰 저장
     *
     * @param userId 유저 아이디
     * @param token  리프레시 토큰
     */
    public void saveUserToken(String userId, String token) {
        HashOperations<String, Object, Object> hashOps = redisTemplate.opsForHash();
        Map<String, Object> userTokenMap = new HashMap<>();
        userTokenMap.put("token", token);
        hashOps.putAll("user:" + userId, userTokenMap);
    }

    /**
     * 유저 아이디로 토큰 조회
     *
     * @param userId 유저 아이디
     * @return 리프레시 토큰 조회 값
     */
    public String getUserTokenById(String userId) {
        HashOperations<String, Object, Object> hashOps = redisTemplate.opsForHash();
        Map<Object, Object> userTokenMap = hashOps.entries("user:" + userId);
        return (String) userTokenMap.get("token");
    }

    /**
     * 유효한(저장된) 토큰인지 검사
     *
     * @param userId 유저아이디
     * @param token  리프레시토큰
     * @return boolean
     */
    public boolean isUserTokenValid(String userId, String token) {
        HashOperations<String, String, String> hashOps = redisTemplate.opsForHash();
        String storedToken = hashOps.get("user:" + userId, "token");
        return token.equals(storedToken);
    }

    /**
     * 토큰 삭제
     *
     * @param userId 유저아이디
     */
    public void deleteUserToken(String userId) {
        HashOperations<String, Object, Object> hashOps = redisTemplate.opsForHash();
        hashOps.delete("user:" + userId, "token");
    }


    /**
     * 리프레시 토큰 재발급 시 갱신
     *
     * @param userId   유저아이디
     * @param newToken 새로운 리프레시 토큰
     */
    public void updateUserToken(String userId, String newToken) {
        HashOperations<String, Object, Object> hashOps = redisTemplate.opsForHash();

        // Get the current token (optional step, for validation if needed)
        String currentToken = getUserTokenById(userId);
        if (currentToken != null) {
            // Update the token value
            hashOps.put("user:" + userId, "token", newToken);
        } else {
            // Handle case where the token does not exist
            throw new RuntimeException("Token not found for user: " + userId);
        }
    }

}