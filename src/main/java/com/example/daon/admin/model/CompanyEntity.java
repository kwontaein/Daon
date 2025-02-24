package com.example.daon.admin.model;

import com.example.daon.admin.dto.request.CompanyRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "company")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "company_id", columnDefinition = "BINARY(16)")
    private UUID companyId;

    //회사이름
    @Column(nullable = false, unique = false, name = "company_name")
    private String companyName;

    //인쇄명
    @Column(nullable = false, unique = false, name = "print_name")
    private String printName;

    //ceo 이름
    @Column(nullable = false, unique = false, name = "ceo")
    private String ceo;

    //ceo 주민번호
    @Column(name = "ceo_cert")
    private String ceoCert;

    //사업자등록번호
    @Column(name = "business_num")
    private String businessNum;

    //전화번호1
    @Column(name = "tel")
    private String tel;

    //전화번호2
    @Column(name = "tel2")
    private String tel2;

    //fax 번호
    @Column(name = "fax")
    private String fax;

    //업태
    @Column(name = "business_status")
    private String businessStatus;

    //종목
    @Column(name = "business_kind")
    private String businessKind;

    //우편번호
    @Column(name = "zip_code")
    private String zipcode;

    //주소
    @Column(name = "address")
    private String address;

    //상세주소
    @Column(name = "address_detail")
    private String addressDetail;

    //은행이름
    @Column(name = "bank")
    private String bank;

    //은행계좌
    @Column(name = "account")
    private String account;

    //은행계좌이름
    @Column(name = "bank_name")
    private String bankName;

    //메모
    @Column(name = "memo")
    private String memo;

    //견적서 파일
    @Column(name = "estimate")
    private String estimate;

    //도장 파일
    @Column(name = "stamp")
    private String stamp;

    public void updateFromRequest(CompanyRequest request) {

        //회사이름
        this.companyName = request.getCompanyName();

        //인쇄명
        this.printName = request.getPrintName();

        //ceo 이름
        this.ceo = request.getCeo();

        //ceo 주민번호
        this.ceoCert = request.getCeoCert();

        //사업자등록번호
        this.businessNum = request.getBusinessNum();

        //전화번호1
        this.tel = request.getTel();

        //전화번호2
        this.tel2 = request.getTel2();

        //fax 번호
        this.fax = request.getFax();

        //업태
        this.businessStatus = request.getBusinessStatus();

        //종목
        this.businessKind = request.getBusinessKind();

        //우편번호
        this.zipcode = request.getZipcode();

        //주소
        this.address = request.getAddress();

        //상세주소
        this.addressDetail = request.getAddressDetail();

        //은행이름
        this.bank = request.getBank();

        //은행계좌
        this.account = request.getAccount();

        //은행계좌이름
        this.bankName = request.getBankName();

        //메모
        this.memo = request.getMemo();

        //견적서 파일
        this.estimate = request.getEstimate();

        //도장 파일
        this.stamp = request.getStamp();
    }
}
