package com.example.daon.global.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        // 사용자 정보 반환
        return createUserDetails(userEntity);
    }

    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴
    // 사용자 로딩 프로세스 중에는 올바르지 않습니다.
    // 패스워드는 데이터베이스에 인코딩된 형태로 저장되어야 합니다.
    // 회원가입 중에는 패스워드를 평문으로 저장하고, Spring Security 가 인증 중에 인코딩을 처리합니다
    private UserDetails createUserDetails(UserEntity userEntity) {
        return UserEntity.builder()
                .userId(userEntity.getUserId())
                .password(userEntity.getPassword())
                .name(userEntity.getName())
                .userClass(userEntity.getUserClass())
                .userRole(userEntity.getUserRole())
                .dept(userEntity.getDept())
                .build();
    }
}