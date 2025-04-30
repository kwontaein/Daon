package com.example.daon.admin.service;

import com.example.daon.admin.dto.request.DeptRequest;
import com.example.daon.admin.dto.request.UserRequest;
import com.example.daon.admin.dto.response.UserResponse;
import com.example.daon.admin.model.DeptEntity;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.DeptRepository;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.global.service.GlobalService;
import com.example.daon.global.service.RedisService;
import com.example.daon.jwt.JwtToken;
import com.example.daon.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

//회사, 사원관리
@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final DeptRepository deptRepository;
    private final RedisService redisService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final GlobalService globalService;

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

            // 사용자 존재 여부 확인
            userEntity = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

            // 인증 수행
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            // ✅ 인증 정보를 SecurityContext에 저장 (중요!)
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 토큰 생성 및 저장
            tokenInfo = jwtTokenProvider.generateToken(authentication);
            redisService.saveUserToken(userEntity.getUsername(), tokenInfo.getRefreshToken());

            return ResponseEntity.status(HttpStatus.OK).body("로그인 성공");

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("NON_EXISTENT_ERROR");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("PW_ERROR");
        }
    }


    //사원정보 crud

    public void CreateEmployee(UserRequest userRequest) {
        DeptEntity dept = deptRepository.findById(userRequest.getDeptId()).orElse(null);
        userRepository.save(userRequest.toEntity(passwordEncoder, dept));
    }

    public List<UserResponse> GetEmployees() {
        List<UserEntity> userEntities = userRepository.findAll();
        return userEntities.stream().map(globalService::convertToUserResponse).collect(Collectors.toList());
    }

    public void UpdateEmployee(UserRequest userRequest) {
        UserEntity user = userRepository.findById(userRequest.getUserId()).orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다."));
        DeptEntity dept = deptRepository.findById(userRequest.getDeptId()).orElse(null);
        user.updateFromRequest(userRequest, dept, passwordEncoder);
        userRepository.save(user);
    }

    public void DeleteEmployee(UserRequest userRequest) {
        userRepository.deleteById(userRequest.getUserId());
    }

    public UserResponse GetEmployeeDetail(UserRequest userRequest) {
        UserEntity user = userRepository.findById(userRequest.getUserId()).orElse(null);
        return globalService.convertToUserResponse(user);
    }

    public List<DeptEntity> getDept() {
        return deptRepository.findAll();
    }

    public void CreateDept(DeptRequest deptRequest) {
        DeptEntity dept = deptRepository.save(deptRequest.toEntity());
        deptRequest.setDeptId(dept.getDeptId());
    }

    public void UpdateDept(List<DeptRequest> deptRequests) {
        for (DeptRequest deptRequest : deptRequests) {
            DeptEntity dept = deptRepository.findById(deptRequest.getDeptId()).orElse(null);
            dept.updateFromRequest(deptRequest);
            deptRepository.save(dept);
        }
    }

    public void DeleteDept(DeptRequest deptRequest) {
        deptRepository.deleteById(deptRequest.getDeptId());
    }

    public boolean duplicationCheck(String userId) {
        UserEntity user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return false;
        }
        return true;
    }

    public UserResponse getMyDetail() {
        return globalService.convertToUserResponse(globalService.resolveUser(null));
    }
}
