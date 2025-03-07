package com.example.daon.admin.service;

import com.example.daon.admin.dto.request.DeptRequest;
import com.example.daon.admin.dto.request.UserRequest;
import com.example.daon.admin.model.DeptEntity;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.DeptRepository;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

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

    //test
    public void test() {

        System.out.println("실행");
        Timestamp joinDate = new Timestamp(System.currentTimeMillis());
        Calendar calendar = Calendar.getInstance();
        calendar.set(2000, Calendar.DECEMBER, 11, 00, 00, 10); // 월은 0부터 시작!
        Timestamp birthDay = new Timestamp(calendar.getTimeInMillis());

      /*  UserRequest userRequest = new UserRequest
                ("권태인",
                        passwordEncoder.encode("guswlsxodls"),
                        false, joinDate,
                        birthDay, "권태인",
                        "kta",
                        "權泰人",
                        "12061",
                        "경기도 남양주시 진접읍 금곡리",
                        "예당마을 신안인스빌 2308-801",
                        "0315157759",
                        "01025023964",
                        "kosq3964@naver.com",
                        "",
                        ClassType.STAFF,
                        RoleType.ADMIN,
                        Dept.WEB);*/

        // CreateEmployee(userRequest);

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

    //사원정보 crud

    public void CreateEmployee(UserRequest userRequest) {
        DeptEntity dept = deptRepository.findById(userRequest.getDeptId()).orElse(null);
        userRepository.save(userRequest.toEntity(passwordEncoder, dept));
    }

    public List<UserEntity> GetEmployees() {
        return userRepository.findAll();
    }

    public void UpdateEmployee(UserRequest userRequest) {
        System.out.println(userRequest.toString());
        UserEntity user = userRepository.findById(userRequest.getUserId()).orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다."));
        DeptEntity dept = deptRepository.findById(userRequest.getDeptId()).orElse(null);
        user.updateFromRequest(userRequest, dept);
        userRepository.save(user);
    }

    public void DeleteEmployee(UserRequest userRequest) {
        userRepository.deleteById(userRequest.getUserId());
    }

    public UserEntity GetEmployeeDetail(UserRequest userRequest) {
        return userRepository.findById(userRequest.getUserId()).orElse(null);
    }

    public List<DeptEntity> getDept() {
        return deptRepository.findAll();
    }

    public void CreateDept(DeptRequest deptRequest) {
        deptRepository.save(deptRequest.toEntity());
    }

    public void UpdateDept(DeptRequest deptRequest) {
        DeptEntity dept = deptRepository.findById(deptRequest.getDeptId()).orElse(null);
        dept.updateFromRequest(deptRequest);
        deptRepository.save(dept);
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
}
