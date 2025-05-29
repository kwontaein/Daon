package com.example.daon.global.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.company.repository.CompanyRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.repository.EstimateRepository;
import com.example.daon.official.model.OfficialEntity;
import com.example.daon.official.repository.OfficialRepository;
import com.example.daon.receipts.model.DailyTotalEntity;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.repository.DailyTotalRepository;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockRepository;
import com.example.daon.task.model.TaskEntity;
import com.example.daon.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GlobalService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    private final CompanyRepository companyRepository;
    private final DailyTotalRepository dailyTotalRepository;
    private final StockRepository stockRepository;
    private final EstimateRepository estimateRepository;
    private final CustomerRepository customerRepository;
    private final OfficialRepository officialRepository;
    private final TaskRepository taskRepository;

    /**
     * SecurityContext 에서 유저 정보 추출하는 메소드
     *
     * @return 유저 정보
     */
    public UserDetails extractFromSecurityContext() { //id , password , 권한
        // SecurityContext 에서 Authentication 객체 추출
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        // Authentication 객체에서 유저 정보 추출
        return (UserDetails) authentication.getPrincipal(); //->principal ->id , password , 권한
        // 유저 정보 사용
    }

    /**
     * 유저 정보 조회
     *
     * @param userId 조회할 유저 아이디(null일 경우 내 아이디)
     * @return 유저 정보
     */
    public UserEntity resolveUser(String userId) {
        if (userId != null) {
            Optional<UserEntity> optionalUser = userRepository.findById(userId);
            if (optionalUser.isPresent()) {
                return optionalUser.get();
            }
        }

        // userId가 null이거나 조회 실패 시 로그인 유저로 대체
        String ownUserId = extractFromSecurityContext().getUsername();
        return userRepository.findById(ownUserId)
                .orElseThrow(() -> new RuntimeException("로그인한 사용자 정보를 찾을 수 없습니다"));
    }

    // ID를 통해 견적서 조회 (nullable)
    public EstimateEntity getEstimate(UUID id) {
        return id != null ? estimateRepository.findById(id).orElse(null) : null;
    }

    // 고객 정보 조회 (필수, 없으면 예외)
    public CustomerEntity getCustomer(UUID id) {
        if (id == null) return null;
        return customerRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));
    }

    // 품목 정보 조회 (필수, 없으면 예외)
    public StockEntity getStock(UUID id) {
        if (id == null) return null;
        return stockRepository.findById(id).orElseThrow(() -> new RuntimeException("존재하지 않는 품목입니다."));
    }

    // 관리비 정보 조회 (nullable)
    public OfficialEntity getOfficial(UUID id) {
        return id != null ? officialRepository.findById(id).orElse(null) : null;
    }

    public CustomerEntity findCustomer(UUID customerId) {
        return customerId != null ? customerRepository.findById(customerId).orElse(null) : null;
    }

    public CompanyEntity findCompany(UUID companyId) {
        return companyId != null ? companyRepository.findById(companyId).orElse(null) : null;
    }

    public TaskEntity findTask(UUID taskId) {
        return taskId != null ? taskRepository.findById(taskId).orElse(null) : null;
    }

    public EstimateEntity findEstimate(UUID estimateId) {
        return estimateId != null ? estimateRepository.findById(estimateId).orElse(null) : null;
    }


    //일일정산 업데이트
    public void updateDailyTotal(BigDecimal count, ReceiptCategory category, LocalDateTime date) {
        //+전일잔고 -매입액 +매출액 -수금액 +지급액 -관리비 = 잔액
        DailyTotalEntity dailyTotalEntity = dailyTotalRepository.findDailyTotalEntityByDate(date.toLocalDate()).orElse(null);

        if (dailyTotalEntity == null) {
            DailyTotalEntity resentDailyTotalEntity = dailyTotalRepository.findTopByDateBeforeOrderByDateDesc(date.toLocalDate()).orElseThrow(null);
            dailyTotalEntity = new DailyTotalEntity(
                    null,
                    resentDailyTotalEntity.getRemainTotal(),
                    LocalDate.now(),
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    resentDailyTotalEntity.getRemainTotal());
        }

        switch (category) {
            case SALES, SALES_DISCOUNT -> dailyTotalEntity.setSales(dailyTotalEntity.getSales().add(count));
            case PURCHASE, PURCHASE_DISCOUNT -> dailyTotalEntity.setPurchase(dailyTotalEntity.getPurchase().add(count));
            case DEPOSIT -> dailyTotalEntity.setDeposit(dailyTotalEntity.getDeposit().add(count));
            case WITHDRAWAL -> dailyTotalEntity.setWithdrawal(dailyTotalEntity.getWithdrawal().add(count));
            case MAINTENANCE_FEE, OPERATING_PROFIT ->
                    dailyTotalEntity.setOfficial(dailyTotalEntity.getOfficial().add(count));
        }

        BigDecimal sales = dailyTotalEntity.getBeforeTotal();
        BigDecimal purchase = dailyTotalEntity.getBeforeTotal();
        BigDecimal deposit = dailyTotalEntity.getBeforeTotal();
        BigDecimal withdrawal = dailyTotalEntity.getBeforeTotal();
        BigDecimal official = dailyTotalEntity.getBeforeTotal();
        //현잔액 = 전일잔액 + 나머지
        BigDecimal total = dailyTotalEntity.getBeforeTotal()
                .add(sales)
                .add(purchase)
                .add(deposit)
                .add(withdrawal)
                .add(official);

        dailyTotalEntity.setRemainTotal(total);

        dailyTotalRepository.save(dailyTotalEntity);
    }


    //재고 수량 업데이트
    public void adjustStockQuantity(StockEntity stock, Integer quantity, ReceiptCategory category, boolean isRollback) {
        if (quantity == null || stock == null || category == null) return;

        int currentStock = stock.getQuantity();
        int q = quantity;

        switch (category) {
            case PURCHASE:
            case RETURN_IN:
                stock.setQuantity(currentStock + (isRollback ? -q : q)); // 입고
                break;

            case SALES:
            case RETURN_OUT:
                stock.setQuantity(currentStock + (isRollback ? q : -q)); // 출고
                break;

            // 기타 카테고리는 재고 변화 없음
            default:
                break;
        }

        stockRepository.save(stock);
    }
}
