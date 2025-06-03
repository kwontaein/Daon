package com.example.daon.jwt.service;

import com.example.daon.jwt.model.UserToken;
import com.example.daon.jwt.repository.UserTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserTokenService {

    private final UserTokenRepository userTokenRepository;

    public void saveUserToken(String userId, String token) {
        long expireAt = System.currentTimeMillis() + 12 * 60 * 60 * 1000; // 12시간 후 타임스탬프
        UserToken userToken = new UserToken(userId, token, expireAt);
        userTokenRepository.save(userToken);
    }

    public String getUserTokenById(String userId) {
        Optional<UserToken> userToken = userTokenRepository.findById(userId);
        return userToken.map(UserToken::getToken).orElse(null);
    }

    public boolean isUserTokenValid(String userId, String token) {
        return userTokenRepository.findById(userId)
                .map(userToken -> token.equals(userToken.getToken()))
                .orElse(false);
    }

    public void deleteUserToken(String userId) {
        userTokenRepository.deleteById(userId);
    }

    public void updateUserToken(String userId, String newToken) {
        Optional<UserToken> userTokenOptional = userTokenRepository.findById(userId);
        if (userTokenOptional.isPresent()) {
            UserToken userToken = userTokenOptional.get();
            userToken.setToken(newToken);
            userTokenRepository.save(userToken);
        } else {
            throw new RuntimeException("Token not found for user: " + userId);
        }
    }
}
