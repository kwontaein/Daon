package com.example.daon.admin.service;

import com.example.daon.admin.dto.request.DeptRequest;
import com.example.daon.admin.dto.request.EnableUrlRequest;
import com.example.daon.admin.dto.request.UserRequest;
import com.example.daon.admin.dto.response.EnableUrlResponse;
import com.example.daon.admin.dto.response.UserResponse;
import com.example.daon.admin.model.DeptEntity;
import com.example.daon.admin.model.EnableUrl;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.DeptRepository;
import com.example.daon.admin.repository.EnableUrlRepository;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.global.service.GlobalService;
import com.example.daon.global.service.RedisService;
import com.example.daon.jwt.JwtToken;
import com.example.daon.jwt.JwtTokenProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
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

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

//회사, 사원관리
@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final DeptRepository deptRepository;
    private final EnableUrlRepository enableUrlRepository;
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
    public ResponseEntity<String> SignIn(String id, String password, HttpServletResponse response) {
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
            tokenInfo = jwtTokenProvider.generateToken(authentication, response);
            redisService.saveUserToken(userEntity.getUsername(), tokenInfo.getRefreshToken());

            EnableUrl enableUrl = enableUrlRepository.findByUser(userEntity).orElse(null);

            if (enableUrl != null) {
                setEnableUrlCookie(enableUrl, response); // ✅ 분리된 메서드 호출
            }

            return ResponseEntity.status(HttpStatus.OK).body("로그인 성공");

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("NON_EXISTENT_ERROR");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("PW_ERROR");
        }
    }


    //접근가능경로 쿠키 생성
    public void setEnableUrlCookie(EnableUrl enableUrl, HttpServletResponse response) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String enableUrlJson = objectMapper.writeValueAsString(enableUrl);
            String encoded = URLEncoder.encode(enableUrlJson, StandardCharsets.UTF_8);

            Cookie cookie = new Cookie("enable_url", encoded);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60); // 1시간

            response.addCookie(cookie);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("EnableUrl 쿠키 직렬화 실패", e);
        }
    }


    //사원정보 crud

    public void CreateEmployee(UserRequest userRequest) {
        DeptEntity dept = deptRepository.findById(userRequest.getDeptId()).orElse(null);
        UserEntity user = userRepository.save(userRequest.toEntity(passwordEncoder, dept));
        EnableUrlRequest enableUrlRequest = new EnableUrlRequest();
        enableUrlRepository.save(enableUrlRequest.toEntityFirstTime(user));
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
        try {
            userRepository.deleteById(userRequest.getUserId());
        } catch (DataIntegrityViolationException e) {
            // 외래키 제약 조건 위반 처리
            throw new IllegalStateException("유저를 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }
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
        try {
            deptRepository.deleteById(deptRequest.getDeptId());
        } catch (DataIntegrityViolationException e) {
            // 외래키 제약 조건 위반 처리
            throw new IllegalStateException("부서를 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }
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


    //접근가능링크 수정
    public void UpdateEnableUrl(EnableUrlRequest enableUrlRequest) {
        EnableUrl enableUrl = enableUrlRepository.findById(enableUrlRequest.getUrlId()).orElse(null);
        enableUrl.updateFromRequest(enableUrlRequest);
        enableUrlRepository.save(enableUrl);
    }

    //접근가능링크 읽기
    public EnableUrlResponse getEnableUrl(EnableUrlRequest enableUrlRequest) {
        EnableUrl enableUrl = enableUrlRepository.findByUser(globalService.resolveUser(enableUrlRequest.getUserId())).orElse(null);
        return globalService.convertToEnableUrlResponse(enableUrl);
    }

}
