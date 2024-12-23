package com.example.daon.admin.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Stream;

@Entity(name = "user")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity implements UserDetails {
    //아이디 
    @Id
    @Column(nullable = false, name = "id")
    private String id;

    //비밀번호
    @Column(nullable = false, name = "password")
    private String password;

    //기혼여부
    @Column(nullable = false, name = "married")
    private boolean married;

    //가입일
    @Column(nullable = false, name = "join_date")
    private Timestamp joinDate;

    //생일
    @Column(nullable = false, name = "birthday")
    private Timestamp birthday;

    //이름
    @Column(nullable = false, name = "name")
    private String name;

    //영어이름
    @Column(name = "eng_name")
    private String engName;

    //한자이름
    @Column(name = "ch_name")
    private String chName;

    //우편번호
    @Column(name = "zipcode")
    private String zipcode;

    //주소
    @Column(name = "address")
    private String address;

    //상세주소
    @Column(name = "address_detail")
    private String addressDetail;

    //집전화
    @Column(name = "tel")
    private String tel;

    //휴대전화
    @Column(name = "phone")
    private String phone;

    //이메일
    @Column(name = "email")
    private String email;

    //비고
    @Column(name = "memo")
    private String memo;

    //직위 -> enum
    @Column(name = "user_class")
    private ClassType userClass;

    //관리자권한 -> enum
    @Column(name = "user_role")
    private RoleType userRole;

    //부서 -> enum
    @Column(name = "position")
    private Position position;

    @Getter
    @RequiredArgsConstructor
    public enum ClassType { //enum을 활용한 권한종류 설정
        CEO("대표"),
        DIRECTOR("이사"),
        MANAGER("과장"),
        STAFF("사원"),
        ASSISTANT_MANAGER("대리"),
        PROFESSIONAL("주임"),
        TEAM_LEADER("팀장"),
        DEPUTY_GENERAL_MANAGER("차장");

        private final String role;

        //user_role 유효성 검사
        @JsonCreator
        public static ClassType userRoleParsing(String inputValue) {

            return Stream.of(ClassType.values())
                    .filter(classType -> classType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(STAFF);
        }

    }


    @Getter
    @RequiredArgsConstructor
    public enum RoleType { //enum을 활용한 권한종류 설정
        USER("사용자"),
        ADMIN("관리자"),
        MANAGER("매니저");

        private final String role;

        //user_role 유효성 검사
        @JsonCreator
        public static RoleType userRoleParsing(String inputValue) {

            return Stream.of(RoleType.values())
                    .filter(roleType -> roleType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(USER);
        }

    }

    @Getter
    @RequiredArgsConstructor
    public enum Position { //enum을 활용한 권한종류 설정
        WEB("웹관리팀"),
        BUSINESS("영업부"),
        MANAGE("관리부");

        private final String role;

        //user_role 유효성 검사
        @JsonCreator
        public static Position positionParsing(String inputValue) {

            return Stream.of(Position.values())
                    .filter(position -> position.toString().equals(inputValue))
                    .findFirst()
                    .orElse(BUSINESS);
        }

    }


    //--여기서부터 UserDetails 요소들 오버라이드

    /**
     * 해당 유저의 권한 목록
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("ROLE_" + userRole.getRole()));

        return authorities;
    }

    /**
     * 비밀번호
     */
    @Override
    public String getPassword() {
        return password;
    }


    /**
     * PK값
     */
    @Override
    public String getUsername() {
        return String.valueOf(id);
    }

    /**
     * 계정 만료 여부
     * true : 만료 안됨
     * false : 만료
     *
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 계정 잠김 여부
     * true : 잠기지 않음
     * false : 잠김
     *
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 비밀번호 만료 여부
     * true : 만료 안됨
     * false : 만료
     *
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


}
