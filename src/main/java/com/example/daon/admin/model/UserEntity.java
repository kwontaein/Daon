package com.example.daon.admin.model;

import com.example.daon.admin.dto.request.UserRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;

@Entity(name = "user")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity implements UserDetails {
    //아이디 
    @Id
    @Column(nullable = false, name = "user_id")
    private String userId;

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
    @JoinColumn(name = "dept_id")
    @ManyToOne
    private DeptEntity dept;


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
        return String.valueOf(userId);
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


    public void updateFromRequest(UserRequest userRequest, DeptEntity dept) {
        this.married = userRequest.isMarried();
        this.joinDate = userRequest.getJoinDate();
        this.birthday = userRequest.getBirthday();
        this.name = userRequest.getName();
        this.engName = userRequest.getEngName();
        this.chName = userRequest.getChName();
        this.zipcode = userRequest.getZipcode();
        this.address = userRequest.getAddress();
        this.addressDetail = userRequest.getAddressDetail();
        this.tel = userRequest.getTel();
        this.phone = userRequest.getPhone();
        this.email = userRequest.getEmail();
        this.memo = userRequest.getMemo();
        this.userClass = userRequest.getUserClass();
        this.userRole = userRequest.getUserRole();
        this.dept = dept;
    }
}
