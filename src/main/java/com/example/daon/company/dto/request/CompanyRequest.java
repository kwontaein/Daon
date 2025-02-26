package com.example.daon.company.dto.request;

import com.example.daon.company.model.CompanyEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyRequest {
    private UUID companyId;

    //회사이름
    private String companyName;

    //인쇄명
    private String printName;

    //ceo 이름
    private String ceo;

    //ceo 주민번호
    private String ceoCert;

    //사업자등록번호
    private String businessNum;

    //전화번호1
    private String tel;

    //전화번호2
    private String tel2;

    //fax 번호
    private String fax;

    //업태
    private String businessStatus;

    //종목
    private String businessKind;

    //우편번호
    private String zipcode;

    //주소
    private String address;

    //상세주소
    private String addressDetail;

    //은행이름
    private String bank;

    //은행계좌
    private String account;

    //은행계좌이름
    private String bankName;

    //메모
    private String memo;

    //견적서 파일
    private String estimate;

    //도장 파일
    private String stamp;

    public CompanyEntity toEntity() {
        return CompanyEntity
                .builder().
                companyId(companyId).

                //회사이름
                        companyName(companyName).

                //인쇄명
                        printName(printName).

                //ceo 이름
                        ceo(ceo).

                //ceo 주민번호
                        ceoCert(ceoCert).

                //사업자등록번호
                        businessNum(businessNum).

                //전화번호1
                        tel(tel).

                //전화번호2
                        tel2(tel2).

                //fax 번호
                        fax(fax).

                //업태
                        businessStatus(businessStatus).

                //종목
                        businessKind(businessKind).

                //우편번호
                        zipcode(zipcode).

                //주소
                        address(address).

                //상세주소
                        addressDetail(addressDetail).

                //은행이름
                        bank(bank).

                //은행계좌
                        account(account).

                //은행계좌이름
                        bankName(bankName).

                //메모
                        memo(memo).

                //견적서 파일
                        estimate(estimate).

                //도장 파일
                        stamp(stamp).build();
    }
}
