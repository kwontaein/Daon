package com.example.daon.jwt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "user_tokens")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserToken {

    @Id
    private String userId;

    private String token;

    private Long expireAt; // UNIX timestamp 형태로 저장 (예: System.currentTimeMillis() + 유효기간)
}
