package com.example.daon.admin.service;

import com.example.daon.admin.dto.request.UserRequest;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.global.RedisService;
import com.example.daon.jwt.JwtToken;
import com.example.daon.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;

//회사, 사원관리
@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final RedisService redisService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    //test
    public void test() {
    }

    /**
     * 로그인
     *
     * @param id       유저 아이디
     * @param password 유저 비밀번호
     **/
    @Transactional
    public ResponseEntity<String> SignIn(String id, String password) {
        JwtToken tokenInfo;
        UserEntity userEntity;
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, password);
            try {
                // 사용자 정보 반환
                userEntity = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
            } catch (UsernameNotFoundException e) {
                // 존재하지 않는 사용자인 경우
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("NON_EXISTENT_ERROR");
            }
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            tokenInfo = jwtTokenProvider.generateToken(authentication);
            redisService.saveUserToken(userEntity.getUsername(), tokenInfo.getRefreshToken());
            return ResponseEntity.status(HttpStatus.OK).body("로그인 성공");
        } catch (BadCredentialsException e) {
            // 비밀번호가 틀린 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("PW_ERROR");
        }

    }

    //회원가입
    public void SignUp(UserRequest userRequest) {
        userRepository.save(userRequest.toEntity());
    }

    //회사정보 crud
    public void CreateCompany() {

    }

    public void ReadCompany() {

    }

    public void UpdateCompany() {

    }

    public void DeleteCompany() {

    }


    //사원정보 crud

    public void CreateEmployee() {

    }

    public void ReadEmployee() {

    }

    public void UpdateEmployee() {

    }

    public void DeleteEmployee() {

    }

}
