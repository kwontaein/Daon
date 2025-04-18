package com.example.daon.customer.model;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.dto.request.CustomerRequest;
import com.example.daon.estimate.model.EstimateEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "customer")
public class CustomerEntity {

    //고객아이디
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "customer_id", columnDefinition = "BINARY(16)")
    private UUID customerId;

    //상호명
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    //고객정보
    @Column(name = "contact_info")
    private String contactInfo;

    //계산서명
    @Column(name = "bill_name")
    private String billName;

    //대표자
    @Column(name = "ceo")
    private String ceo;

    //대표자 주민등록번호
    @Column(name = "ceo_num")
    private String ceoNum;

    //사업자등록번호
    @Column(name = "business_num")
    private String businessNumber;

    //업태
    @Column(name = "business_type")
    private String businessType;

    //종목
    @Column(name = "contents")
    private String contents;

    //담당
    @Column(name = "customer_rp")
    private String customerRp;

    //담당자 연락처
    @Column(name = "customer_rp_call")
    private String customerRpCall;

    //통장명
    @Column(name = "bank_name")
    private String bankName;

    //계좌번호
    @Column(name = "bank_num")
    private String bankNum;

    //예금주
    @Column(name = "bank_owner")
    private String bankOwner;

    //취급품목
    @Column(name = "handling_item")
    private String handlingItem;

    //메모
    @Column(name = "memo", columnDefinition = "TEXT")
    private String memo;

    //구분
    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private CustomerCate category;

    //전화
    @Column(name = "phone_number")
    private String phoneNumber;

    //팩스
    @Column(name = "fax")
    private String fax;

    //고객분류
    @ManyToOne
    @JoinColumn(name = "customer_affiliation_id")
    private AffiliationEntity customerAffiliation;

    //견적서 목록
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstimateEntity> estimates;

    //우편번호
    @Column(name = "zip_code")
    private String zipCode;

    //주소
    @Column(name = "address_1")
    private String address1;

    //상세주소
    @Column(name = "address_2")
    private String address2;

    //담당기사명
    @Column(name = "etc")
    private String etc;

    //담당기사
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    //전기이월
    @Column(name = "remain_cost")
    private BigDecimal remainCost;

    @OneToOne
    private CustomerBillEntity customerBills;

    public void updateFromRequest(CustomerRequest request, AffiliationEntity affiliation) {
        //상호명
        this.customerName = request.getCustomerName();
        //고객정보
        this.contactInfo = request.getContactInfo();
        //계산서명
        this.billName = request.getBillName();
        //대표자
        this.ceo = request.getCeo();
        //대표자 주민등록번호
        this.ceoNum = request.getCeoNum();
        //사업자등록번호
        this.businessNumber = request.getBusinessNumber();
        //업태
        this.businessType = request.getBusinessType();
        //종목
        this.contents = request.getContents();
        //담당
        this.customerRp = request.getCustomerRp();
        //담당자 연락처
        this.customerRpCall = request.getCustomerRpCall();
        //통장명
        this.bankName = request.getBankName();
        //계좌번호
        this.bankNum = request.getBankNum();
        //예금주
        this.bankOwner = request.getBankOwner();
        //취급품목
        this.handlingItem = request.getHandlingItem();
        //메모
        this.memo = request.getMemo();
        //구분
        this.category = request.getCategory();
        //전화
        this.phoneNumber = request.getPhoneNumber();
        //팩스
        this.fax = request.getFax();
        //고객분류
        this.customerAffiliation = affiliation;
        //우편번호
        this.zipCode = request.getZipCode();
        //주소
        this.address1 = request.getAddress1();
        //상세주소
        this.address2 = request.getAddress2();
        //담당기사명
        this.etc = request.getEtc();
        //담당기사
        this.user = request.getUser();

    }
}
