package com.example.daon.admin.model;

import com.example.daon.admin.dto.request.EnableUrlRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "enable_url")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnableUrl {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "url_id", columnDefinition = "BINARY(16)")
    private UUID urlId;

    @OneToOne
    @JoinColumn(name = "user")
    private UserEntity user;
    @Builder.Default
    private boolean receipt = false;
    @Builder.Default
    private boolean task = false;
    @Builder.Default
    private boolean admin = false;
    @Builder.Default
    private boolean estimate = false;
    @Builder.Default
    @Column(name = "task_estimate")
    private boolean taskEstimate = false;
    @Builder.Default
    private boolean remain = false;
    @Builder.Default
    private boolean official = false;
    @Builder.Default
    private boolean customer = false;
    @Builder.Default
    private boolean affiliation = false;
    @Builder.Default
    private boolean stock = false;
    @Builder.Default
    @Column(name = "stock_cate")
    private boolean stockCate = false;
    @Builder.Default
    private boolean point = false;
    @Builder.Default
    @Column(name = "ledger_customer")
    private boolean ledgerCustomer = false;
    @Builder.Default
    @Column(name = "ledger_customers")
    private boolean ledgerCustomers = false;
    @Builder.Default
    @Column(name = "ledger_stock")
    private boolean ledgerStock = false;
    @Builder.Default
    @Column(name = "ledger_sales")
    private boolean ledgerSales = false;
    @Builder.Default
    @Column(name = "ledger_purchase")
    private boolean ledgerPurchase = false;
    @Builder.Default
    @Column(name = "ledger_official")
    private boolean ledgerOfficial = false;
    @Builder.Default
    @Column(name = "ledger_stock_count")
    private boolean ledgerStockCount = false;
    @Builder.Default
    @Column(name = "ledger_etc")
    private boolean ledgerEtc = false;
    @Builder.Default
    private boolean company = false;
    @Builder.Default
    private boolean employee = false;
    @Builder.Default
    private boolean dept = false;
    @Builder.Default
    private boolean pvat = false;
    @Builder.Default
    private boolean svat = false;
    @Builder.Default
    private boolean pset = false;
    @Builder.Default
    private boolean card = false;
    @Builder.Default
    private boolean proof = false;
    @Builder.Default
    private boolean board = false;
    @Builder.Default
    private boolean schedule = false;

    public void updateFromRequest(EnableUrlRequest request) {

        this.receipt = request.isReceipt(); // 전표입력
        this.task = request.isTask(); // 업무관리
        this.admin = request.isAdmin(); // 관리자데이터조회
        this.estimate = request.isEstimate(); // 견적서관리
        this.taskEstimate = request.isTaskEstimate(); // 견적서관리 [업무]
        this.remain = request.isRemain(); // 미수/미지급현황
        this.official = request.isOfficial(); // 관리비관리
        this.customer = request.isCustomer(); // 거래처관리
        this.affiliation = request.isAffiliation(); // 소속관리
        this.stock = request.isStock(); // 품목/재고 관리
        this.stockCate = request.isStockCate(); // 분류관리
        this.point = request.isPoint(); // 구매적립금설정
        this.ledgerCustomer = request.isLedgerCustomer(); // 거래처별원장출력
        this.ledgerCustomers = request.isLedgerCustomers(); // 복수거래처원장출력
        this.ledgerStock = request.isLedgerStock(); // 품목별원장출력
        this.ledgerSales = request.isLedgerSales(); // 매출장 출력
        this.ledgerPurchase = request.isLedgerPurchase(); // 매입장 출력
        this.ledgerOfficial = request.isLedgerOfficial(); // 관리비 원장출력
        this.ledgerStockCount = request.isLedgerStockCount(); // 재고조사서
        this.ledgerEtc = request.isLedgerEtc(); // 기타원장
        this.company = request.isCompany(); // 회사정보
        this.employee = request.isEmployee(); // 사원관리
        this.dept = request.isDept(); // 부서관리
        this.pvat = request.isPvat(); // 매입부가세
        this.svat = request.isSvat(); // 매출부가세
        this.pset = request.isPset(); // 조달및수익계약정산
        this.card = request.isCard(); // 카드결제내역
        this.proof = request.isProof(); // 지출증빙
        this.board = request.isBoard(); // 사내게시판
        this.schedule = request.isSchedule(); // 내일정관리
    }
}

