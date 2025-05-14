package com.example.daon.admin.dto.request;

import com.example.daon.admin.model.EnableUrl;
import com.example.daon.admin.model.RoleType;
import com.example.daon.admin.model.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnableUrlRequest {

    private UUID urlId;
    private UserEntity user;
    private boolean receipt; // 전표입력
    private boolean task; // 업무관리
    private boolean admin; // 관리자데이터조회
    private boolean estimate; // 견적서관리
    private boolean taskEstimate; // 견적서관리 [업무]
    private boolean remain; // 미수/미지급현황
    private boolean official; // 관리비관리
    private boolean customer; // 거래처관리
    private boolean affiliation; // 소속관리
    private boolean stock; // 품목/재고 관리
    private boolean stockCate; // 분류관리
    private boolean point; // 구매적립금설정
    private boolean ledgerCustomer; // 거래처별원장출력
    private boolean ledgerCustomers; // 복수거래처원장출력
    private boolean ledgerStock; // 품목별원장출력
    private boolean ledgerSales; // 매출장 출력
    private boolean ledgerPurchase; // 매입장 출력
    private boolean ledgerOfficial; // 관리비 원장출력
    private boolean ledgerStockCount; // 재고조사서
    private boolean ledgerEtc; // 기타원장
    private boolean company; // 회사정보
    private boolean employee; // 사원관리
    private boolean dept; // 부서관리
    private boolean pvat; // 매입부가세
    private boolean svat; // 매출부가세
    private boolean pset; // 조달및수익계약정산
    private boolean card; // 카드결제내역
    private boolean proof; // 지출증빙
    private boolean board; // 사내게시판
    private boolean schedule; // 내일정관리

    public EnableUrl toEntityFirstTime(UserEntity user) {
        RoleType role = user.getUserRole(); // 또는 user.getUserRole().name() if it's enum

        EnableUrl.EnableUrlBuilder builder = EnableUrl.builder()
                .user(user);

        switch (role) {
            case ADMIN -> {
                builder
                        .receipt(true)
                        .task(true)
                        .admin(true)
                        .estimate(true)
                        .taskEstimate(true)
                        .remain(true)
                        .official(true)
                        .customer(true)
                        .affiliation(true)
                        .stock(true)
                        .stockCate(true)
                        .point(true)
                        .ledgerCustomer(true)
                        .ledgerCustomers(true)
                        .ledgerStock(true)
                        .ledgerSales(true)
                        .ledgerPurchase(true)
                        .ledgerOfficial(true)
                        .ledgerStockCount(true)
                        .ledgerEtc(true)
                        .company(true)
                        .employee(true)
                        .dept(true)
                        .pvat(true)
                        .svat(true)
                        .pset(true)
                        .card(true)
                        .proof(true)
                        .board(true)
                        .schedule(true);
            }
            case MANAGER -> {
                builder
                        .receipt(true)
                        .task(true)
                        .estimate(true)
                        .remain(true)
                        .customer(true)
                        .stock(true)
                        .ledgerCustomer(true)
                        .ledgerSales(true)
                        .schedule(true);
            }
            case USER -> {
                builder
                        .task(true)
                        .estimate(true)
                        .schedule(true);
            }
            default -> {
                // 기본적으로 아무 권한도 없음
            }
        }

        return builder.build();
    }

    public EnableUrl toEntity(UserEntity user) {
        return EnableUrl.builder()
                .user(user)
                .receipt(receipt)
                .task(task)
                .admin(admin)
                .estimate(estimate)
                .taskEstimate(taskEstimate)
                .remain(remain)
                .official(official)
                .customer(customer)
                .affiliation(affiliation)
                .stock(stock)
                .stockCate(stockCate)
                .point(point)
                .ledgerCustomer(ledgerCustomer)
                .ledgerCustomers(ledgerCustomers)
                .ledgerStock(ledgerStock)
                .ledgerSales(ledgerSales)
                .ledgerPurchase(ledgerPurchase)
                .ledgerOfficial(ledgerOfficial)
                .ledgerStockCount(ledgerStockCount)
                .ledgerEtc(ledgerEtc)
                .company(company)
                .employee(employee)
                .dept(dept)
                .pvat(pvat)
                .svat(svat)
                .pset(pset)
                .card(card)
                .proof(proof)
                .board(board)
                .schedule(schedule)
                .build();
    }
}

