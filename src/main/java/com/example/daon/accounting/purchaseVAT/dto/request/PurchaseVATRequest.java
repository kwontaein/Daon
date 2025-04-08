package com.example.daon.accounting.purchaseVAT.dto.request;

import com.example.daon.accounting.purchaseVAT.model.PurchaseVATEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseVATRequest {

    private UUID purchaseVATId;

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;

    // 업체명
    private String companyName;

    // 사업자번호
    private String businessNumber;

    // 금액
    private BigDecimal amount;

    // 부가세
    private BigDecimal vat;

    // 합계
    private BigDecimal total;

    // 비고
    private String note;

    // 메모
    private String memo;

    public PurchaseVATEntity toPurchaseVATEntity() {
        return PurchaseVATEntity
                .builder()
                .categorySelection(categorySelection)
                .date(date)
                .companyName(companyName)
                .businessNumber(businessNumber)
                .amount(amount)
                .vat(vat)
                .total(total)
                .note(note)
                .memo(memo)
                .build();
    }

}
