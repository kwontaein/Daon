package com.example.daon.global.service;


import com.example.daon.accounting.cardTransaction.dto.response.CardTransactionResponse;
import com.example.daon.accounting.cardTransaction.model.CardTransactionEntity;
import com.example.daon.accounting.expenseProof.dto.response.ExpenseProofResponse;
import com.example.daon.accounting.expenseProof.model.ExpenseProofEntity;
import com.example.daon.accounting.procurement.dto.response.ProcurementResponse;
import com.example.daon.accounting.procurement.model.ProcurementEntity;
import com.example.daon.accounting.purchaseVAT.dto.response.PurchaseVATResponse;
import com.example.daon.accounting.purchaseVAT.model.PurchaseVATEntity;
import com.example.daon.accounting.salesVAT.dto.response.SalesVATResponse;
import com.example.daon.accounting.salesVAT.model.SalesVATEntity;
import com.example.daon.admin.dto.response.EnableUrlResponse;
import com.example.daon.admin.dto.response.UserResponse;
import com.example.daon.admin.model.EnableUrl;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.bbs.dto.response.BoardResponse;
import com.example.daon.bbs.dto.response.FileResponse;
import com.example.daon.bbs.model.BoardEntity;
import com.example.daon.bbs.model.FileEntity;
import com.example.daon.calendar.dto.response.CalendarResponse;
import com.example.daon.calendar.model.CalendarEntity;
import com.example.daon.company.dto.response.CompanyResponse;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.customer.dto.response.AffiliationResponse;
import com.example.daon.customer.dto.response.CustomerResponse;
import com.example.daon.customer.model.AffiliationEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.dto.response.EstimateItemResponse;
import com.example.daon.estimate.dto.response.EstimateResponse;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.model.EstimateItem;
import com.example.daon.ledger.dto.response.LedgerResponse;
import com.example.daon.ledger.dto.response.StockLedgerResponse;
import com.example.daon.receipts.dto.response.ReceiptResponse;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.stock.dto.response.StockResponse;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.task.dto.response.AssignedUser;
import com.example.daon.task.dto.response.TaskResponse;
import com.example.daon.task.model.TaskEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GlobalService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
        System.out.println("authentication.getPrincipal() : " + authentication.getPrincipal());
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


    public UserResponse convertToUserResponse(UserEntity user) {
        return UserResponse
                .builder()
                .userId(user.getUserId())
                .password(null)
                .married(user.isMarried())
                .joinDate(user.getJoinDate())
                .birthday(user.getBirthday())
                .name(user.getName())
                .engName(user.getEngName())
                .chName(user.getChName())
                .zipcode(user.getZipcode())
                .address(user.getAddress())
                .addressDetail(user.getAddressDetail())
                .tel(user.getTel())
                .phone(user.getPhone())
                .email(user.getEmail())
                .memo(user.getMemo())
                .userClass(user.getUserClass())
                .userRole(user.getUserRole())
                .dept(user.getDept())
                .build();
    }

    //응답 변환
    public CompanyResponse convertToCompanyResponse(CompanyEntity companyEntity) {
        return CompanyResponse
                .builder()
                .companyId(companyEntity.getCompanyId()).
                companyName(companyEntity.getCompanyName()).
                printName(companyEntity.getPrintName()).
                ceo(companyEntity.getCeo()).
                ceoCert(companyEntity.getCeoCert()).
                businessNumber(companyEntity.getBusinessNumber()).
                tel(companyEntity.getTel()).
                tel2(companyEntity.getTel2()).
                fax(companyEntity.getFax()).
                businessStatus(companyEntity.getBusinessStatus()).
                businessKind(companyEntity.getBusinessKind()).
                zipcode(companyEntity.getZipcode()).
                address(companyEntity.getAddress()).
                addressDetail(companyEntity.getAddressDetail()).
                bank(companyEntity.getBank()).
                account(companyEntity.getAccount()).
                bankName(companyEntity.getBankName()).
                memo(companyEntity.getMemo()).
                estimate(companyEntity.getEstimate()).
                stamp(companyEntity.getStamp())
                .build();
    }

    //응답 변환
    public CustomerResponse convertToCustomerResponse(CustomerEntity customer) {
        return CustomerResponse
                .builder()
                .customerId(customer.getCustomerId())
                .ceo(customer.getCeo())
                .ceoNum(customer.getCeoNum())
                .businessNumber(customer.getBusinessNumber())
                .businessType(customer.getBusinessType())
                .contents(customer.getContents())
                .customerRp(customer.getCustomerRp())
                .customerRpCall(customer.getCustomerRpCall())
                .bankName(customer.getBankName())
                .bankNum(customer.getBankNum())
                .bankOwner(customer.getBankOwner())
                .handlingItem(customer.getHandlingItem())
                .memo(customer.getMemo())
                .category(customer.getCategory())
                .zipCode(customer.getZipCode())
                .address1(customer.getAddress1())
                .address2(customer.getAddress2())
                .etc(customer.getEtc())
                .customerName(customer.getCustomerName())
                .billName(customer.getBillName())
                .contactInfo(customer.getContactInfo())
                .phoneNumber(customer.getPhoneNumber())
                .fax(customer.getFax())
                .userId(customer.getUser() != null ? customer.getUser().getUserId() : null)
                .affiliationId(customer.getCustomerAffiliation().getCustomerAffiliationId())
                .affiliationName(customer.getCustomerAffiliation().getCustomerAffiliationName())
                .build();
    }

    //응답 변환
    public AffiliationResponse convertToAffiliationResponse(AffiliationEntity affiliation) {
        return AffiliationResponse
                .builder()
                .affiliationId(affiliation.getCustomerAffiliationId())
                .affiliationName(affiliation.getCustomerAffiliationName())
                .build();
    }

    public EstimateResponse convertToEstimateResponse(EstimateEntity estimate) {
        return EstimateResponse
                .builder()
                .estimateId(estimate.getEstimateId())
                .company(convertToCompanyResponse(estimate.getCompany()))
                .assignedUser(estimate.getUser().getName())
                .receiptDate(estimate.getReceiptDate())
                .totalAmount(estimate.getTotalAmount())
                .estimateDate(estimate.getEstimateDate())
                .userId(estimate.getTask() != null ? estimate.getTask().getAssignedUser().getUserId() : null)
                .userName(estimate.getTask() != null ? estimate.getTask().getAssignedUser().getName() : null)
                .taskId(estimate.getTask() != null ? estimate.getTask().getTaskId() : null)
                .taskResponse(estimate.getTask() != null ? convertToTaskResponse(estimate.getTask()) : null)
                .customerId(estimate.getCustomer().getCustomerId())
                .customerName(estimate.getCustomer().getCustomerName())
                .items(estimate.getItems().stream().map(this::convertToEstimateItemResponse).collect(Collectors.toList()))
                .build();
    }

    public EstimateItemResponse convertToEstimateItemResponse(EstimateItem estimateItem) {
        return EstimateItemResponse
                .builder()
                .itemId(estimateItem.getItemId())
                .productName(estimateItem.getStock() != null ? estimateItem.getStock().getProductName() : estimateItem.getProductName())
                .modelName(estimateItem.getStock() != null ? estimateItem.getStock().getModelName() : estimateItem.getModelName())
                .stockId(estimateItem.getStock() != null ? estimateItem.getStock().getStockId() : null)
                .unitPrice(estimateItem.getStock() != null ? estimateItem.getStock().getOutPrice() : estimateItem.getUnitPrice())
                .hand(estimateItem.isHand())
                .quantity(estimateItem.getQuantity())
                .build();
    }

    public ReceiptResponse convertToReceiptResponse(ReceiptEntity receipt) {
        return ReceiptResponse
                .builder()
                .receiptId(receipt.getReceiptId())
                .timeStamp(receipt.getTimeStamp())
                .category(receipt.getCategory())
                .stockId(receipt.getStock() != null ? receipt.getStock().getStockId() : null)
                .unitPrice(receipt.getStock() != null ? receipt.getStock().getOutPrice() : BigDecimal.valueOf(0))
                .modelName(receipt.getStock() != null ? receipt.getStock().getModelName() : null)
                .productName(receipt.getStock() != null ? receipt.getStock().getProductName() : null)
                .quantity(receipt.getQuantity())
                .totalPrice(receipt.getTotalPrice())
                .description(receipt.getDescription())
                .officialId(receipt.getOfficialId() != null ? receipt.getOfficialId().getOfficialId() : null)
                .officialName(receipt.getOfficialId() != null ? receipt.getOfficialId().getOfficialName() : null)
                .customerId(receipt.getCustomer() != null ? receipt.getCustomer().getCustomerId() : null)
                .customerName(receipt.getCustomer() != null ? receipt.getCustomer().getCustomerName() : null)
                .estimateId(receipt.getEstimate() != null ? receipt.getEstimate().getEstimateId() : null)
                .build();
    }

    public StockResponse convertToStockResponse(StockEntity stock) {
        return StockResponse
                .builder()
                .stockId(stock.getStockId())
                .productName(stock.getProductName())
                .quantity(stock.getQuantity())
                .inPrice(stock.getInPrice())
                .outPrice(stock.getOutPrice())
                .modelName(stock.getModelName())
                .category(stock.getCategory())
                .taxation(stock.getTaxation())
                .note(stock.getNote())
                .stockUseEa(stock.isStockUseEa())
                .compatibleModel(stock.getCompatibleModel())
                .build();
    }

    public AssignedUser convertToAssignedUserResponse(UserEntity user) {
        return AssignedUser
                .builder()
                .userId(user.getUserId())
                .name(user.getName())
                .build();
    }

    public TaskResponse convertToTaskResponse(TaskEntity task) {
        return TaskResponse
                .builder()
                .taskId(task.getTaskId())
                .taskType(task.getTaskType())
                .customer(convertToCustomerResponse(task.getCustomer()))
                .requesterName(task.getRequesterName())
                .requesterContact(task.getRequesterContact())
                .requesterContact2(task.getRequesterContact2())
                .model(task.getModel())
                .assignedUser(convertToAssignedUserResponse(task.getAssignedUser()))
                .details(task.getDetails())
                .remarks(task.getRemarks())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .completeAt(task.getCompleteAt())
                .estimateId(task.getEstimate() != null ? task.getEstimate().getEstimateId() : null)
                .build();
    }


    public LedgerResponse convertToLedgerResponse(ReceiptEntity receipt) {
        return LedgerResponse
                .builder()
                .receiptId(receipt.getReceiptId())
                .timeStamp(receipt.getTimeStamp())
                .category(receipt.getCategory())
                .customerName(receipt.getCustomer() != null ? receipt.getCustomer().getCustomerName() : null)
                .productName(receipt.getStock() != null ? receipt.getStock().getProductName() : null)
                .modelName(receipt.getStock() != null ? receipt.getStock().getModelName() : null)
                .outPrice(receipt.getStock() != null ? receipt.getStock().getOutPrice() : null)
                .officialName(receipt.getOfficialId() != null ? receipt.getOfficialId().getOfficialName() : null)
                .officialId(receipt.getOfficialId() != null ? receipt.getOfficialId().getOfficialId() : null)
                .quantity(receipt.getQuantity())
                .totalPrice(receipt.getTotalPrice())
                .memo(receipt.getMemo())
                .description(receipt.getDescription())
                .build();
    }

    public StockLedgerResponse convertToStockLedgerResponse(StockEntity stock) {
        return StockLedgerResponse
                .builder()
                .productName(stock.getProductName())
                .modelName(stock.getModelName())
                .quantity(stock.getQuantity())
                .inPrice(stock.getInPrice())
                .outPrice(stock.getOutPrice())
                .stockCateId(stock.getCategory().getStockCateId())
                .build();
    }


    public CardTransactionResponse convertToCardTransactionResponse(CardTransactionEntity cardTransaction) {
        return CardTransactionResponse
                .builder()
                .cardTransactionId(cardTransaction.getCardTransactionId())
                .categorySelection(cardTransaction.getCategorySelection())
                .date(cardTransaction.getDate())
                .paidDate(cardTransaction.getPaidDate())
                .customerName(cardTransaction.getCustomerId().getCustomerName())
                .customerId(cardTransaction.getCustomerId().getCustomerId())
                .paymentDetails(cardTransaction.getPaymentDetails())
                .amount(cardTransaction.getAmount())
                .vat(cardTransaction.getVat())
                .total(cardTransaction.getTotal())
                .memo(cardTransaction.getMemo())
                .cardCompany(cardTransaction.getCardCompany())
                .build();
    }

    public ExpenseProofResponse convertToExpenseProofResponse(ExpenseProofEntity expenseProof) {
        return ExpenseProofResponse
                .builder()
                .expenseProofId(expenseProof.getExpenseProofId())
                .categorySelection(expenseProof.getCategorySelection())
                .date(expenseProof.getDate())
                .paidDate(expenseProof.getPaidDate())
                .customerName(expenseProof.getCustomerId().getCustomerName())
                .customerId(expenseProof.getCustomerId().getCustomerId())
                .paymentDetails(expenseProof.getPaymentDetails())
                .amount(expenseProof.getAmount())
                .vat(expenseProof.getVat())
                .total(expenseProof.getTotal())
                .memo(expenseProof.getMemo())
                .cardCompany(expenseProof.getCardCompany())
                .build();
    }

    public ProcurementResponse convertToProcurementResponse(ProcurementEntity procurement) {
        return ProcurementResponse
                .builder()
                .procurementSettlementId(procurement.getProcurementSettlementId())
                .categorySelection(procurement.getCategorySelection())
                .date(procurement.getDate())
                .customerId(procurement.getCustomerId().getCustomerId())
                .customerName(procurement.getCustomerId().getCustomerName())
                .memo(procurement.getMemo())
                .modelName(procurement.getModelName())
                .vendor(procurement.getVendor())
                .quantity(procurement.getQuantity())
                .acceptance(procurement.getAcceptance())
                .installation(procurement.getInstallation())
                .payment(procurement.getPayment())
                .build();
    }

    public PurchaseVATResponse convertToPurchaseVATResponse(PurchaseVATEntity purchaseVAT) {
        return PurchaseVATResponse
                .builder()
                .purchaseVATId(purchaseVAT.getPurchaseVATId())
                .categorySelection(purchaseVAT.getCategorySelection())
                .date(purchaseVAT.getDate())
                .customerName(purchaseVAT.getCustomerId().getCustomerName())
                .customerId(purchaseVAT.getCustomerId().getCustomerId())
                .businessNumber(purchaseVAT.getCustomerId().getBusinessNumber())
                .amount(purchaseVAT.getAmount())
                .vat(purchaseVAT.getVat())
                .total(purchaseVAT.getTotal())
                .note(purchaseVAT.getNote())
                .memo(purchaseVAT.getMemo())
                .build();
    }

    public SalesVATResponse convertToSalesVATResponse(SalesVATEntity salesVAT) {
        return SalesVATResponse
                .builder()
                .salesVATId(salesVAT.getSalesVATId())
                .categorySelection(salesVAT.getCategorySelection())
                .date(salesVAT.getDate())
                .paidDate(salesVAT.getPaidDate())
                .customerName(salesVAT.getCustomerId().getCustomerName())
                .customerId(salesVAT.getCustomerId().getCustomerId())
                .businessNumber(salesVAT.getCustomerId().getBusinessNumber())
                .paymentDetails(salesVAT.getPaymentDetails())
                .amount(salesVAT.getAmount())
                .vat(salesVAT.getVat())
                .total(salesVAT.getTotal())
                .memo(salesVAT.getMemo())
                .build();
    }

    public CalendarResponse convertToCalendarResponse(CalendarEntity calendar) {
        return CalendarResponse
                .builder()
                .calendarId(calendar.getCalendarId())
                .date(calendar.getDate())
                .memo(calendar.getMemo())
                .userId(calendar.getUser().getUserId())
                .userName(calendar.getUser().getName())
                .build();
    }

    public BoardResponse convertToBoardResponse(BoardEntity boardEntity) {
        return BoardResponse
                .builder()
                .boardId(boardEntity.getBoardId())
                .title(boardEntity.getTitle())
                .notice(boardEntity.isNotice())
                .views(boardEntity.getViews())
                .content(boardEntity.getContent())
                .createAt(boardEntity.getCreateAt())
                .writer(boardEntity.getWriter())
                .build();
    }

    public FileResponse convertToFileResponse(FileEntity fileEntity) {
        return FileResponse
                .builder()
                .fileId(fileEntity.getFileId())
                .boardId(fileEntity.getBoardId().getBoardId())
                .fileName(fileEntity.getFileName())
                .fileLink(fileEntity.getFilePath())
                .build();
    }

    public EnableUrlResponse convertToEnableUrlResponse(EnableUrl enableUrl) {
        return EnableUrlResponse.builder()
                .urlId(enableUrl.getUrlId())
                .user(enableUrl.getUser())
                .sales(EnableUrlResponse.Sales.builder()
                        .receipt(enableUrl.isReceipt())
                        .task(enableUrl.isTask())
                        .admin(enableUrl.isAdmin())
                        .estimate(enableUrl.isEstimate())
                        .taskEstimate(enableUrl.isTaskEstimate())
                        .remain(enableUrl.isRemain())
                        .official(enableUrl.isOfficial())
                        .build())
                .customer(EnableUrlResponse.Customer.builder()
                        .customer(enableUrl.isCustomer())
                        .affiliation(enableUrl.isAffiliation())
                        .build())
                .stock(EnableUrlResponse.Stock.builder()
                        .stock(enableUrl.isStock())
                        .stockCate(enableUrl.isStockCate())
                        .point(enableUrl.isPoint())
                        .build())
                .ledger(EnableUrlResponse.Ledger.builder()
                        .ledgerCustomer(enableUrl.isLedgerCustomer())
                        .ledgerCustomers(enableUrl.isLedgerCustomers())
                        .ledgerStock(enableUrl.isLedgerStock())
                        .ledgerSales(enableUrl.isLedgerSales())
                        .ledgerPurchase(enableUrl.isLedgerPurchase())
                        .ledgerOfficial(enableUrl.isLedgerOfficial())
                        .ledgerStockCount(enableUrl.isLedgerStockCount())
                        .ledgerEtc(enableUrl.isLedgerEtc())
                        .build())
                .staff(EnableUrlResponse.Staff.builder()
                        .company(enableUrl.isCompany())
                        .employee(enableUrl.isEmployee())
                        .dept(enableUrl.isDept())
                        .build())
                .accounting(EnableUrlResponse.Accounting.builder()
                        .pvat(enableUrl.isPvat())
                        .svat(enableUrl.isSvat())
                        .pset(enableUrl.isPset())
                        .card(enableUrl.isCard())
                        .proof(enableUrl.isProof())
                        .build())
                .board(EnableUrlResponse.Board.builder()
                        .board(enableUrl.isBoard())
                        .build())
                .schedule(EnableUrlResponse.Schedule.builder()
                        .schedule(enableUrl.isSchedule())
                        .build())
                .build();
    }

}