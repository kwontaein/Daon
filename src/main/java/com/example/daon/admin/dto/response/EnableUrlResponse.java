package com.example.daon.admin.dto.response;

import com.example.daon.admin.model.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EnableUrlResponse {

    private UUID urlId;
    private UserEntity user;

    private Sales sales;
    private Customer customer;
    private Stock stock;
    private Ledger ledger;
    private Staff staff;
    private Accounting accounting;
    private Board board;
    private Schedule schedule;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class Sales {
        private boolean receipt; // 전표입력
        private boolean task; // 업무관리
        private boolean admin; // 관리자데이터조회
        private boolean estimate; // 견적서관리
        private boolean taskEstimate; // 견적서관리 [업무]
        private boolean remain; // 미수/미지급현황
        private boolean official; // 관리비관리
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class Customer {
        private boolean customer; // 거래처관리
        private boolean affiliation; // 소속관리
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class Stock {
        private boolean stock; // 품목/재고 관리
        private boolean stockCate; // 분류관리
        private boolean point; // 구매적립금설정
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class Ledger {
        private boolean ledgerCustomer; // 거래처별원장출력
        private boolean ledgerCustomers; // 복수거래처원장출력
        private boolean ledgerStock; // 품목별원장출력
        private boolean ledgerSales; // 매출장 출력
        private boolean ledgerPurchase; // 매입장 출력
        private boolean ledgerOfficial; // 관리비 원장출력
        private boolean ledgerStockCount; // 재고조사서
        private boolean ledgerEtc; // 기타원장
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class Staff {
        private boolean company; // 회사정보
        private boolean employee; // 사원관리
        private boolean dept; // 부서관리
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class Accounting {
        private boolean pvat; // 매입부가세
        private boolean svat; // 매출부가세
        private boolean pset; // 조달및수익계약정산
        private boolean card; // 카드결제내역
        private boolean proof; // 지출증빙
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class Board {
        private boolean board; // 사내게시판

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class Schedule {
        private boolean schedule; // 내일정관리
    }
}

