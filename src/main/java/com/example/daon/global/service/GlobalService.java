package com.example.daon.global.service;


import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.company.dto.response.CompanyResponse;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.customer.dto.response.AffiliationResponse;
import com.example.daon.customer.dto.response.CustomerResponse;
import com.example.daon.customer.dto.response.UserResponse;
import com.example.daon.customer.model.AffiliationEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.dto.response.EstimateItemResponse;
import com.example.daon.estimate.dto.response.EstimateResponse;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.model.EstimateItem;
import com.example.daon.ledger.dto.response.LedgerResponse;
import com.example.daon.ledger.dto.response.NoPaidResponse;
import com.example.daon.receipts.dto.response.ReceiptResponse;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.stock.dto.response.StockResponse;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.task.dto.response.AssignedUser;
import com.example.daon.task.dto.response.TaskResponse;
import com.example.daon.task.model.TaskEntity;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GlobalService {

    private final UserRepository userRepository;

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
    public UserEntity getUserEntity(@Nullable String userId) {
        if (userId == null) {
            userId = extractFromSecurityContext().getUsername();
        }
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("유저 정보가 없습니다"));
        return userEntity;
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
                businessNum(companyEntity.getBusinessNum()).
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
        UserResponse userResponse = null;
        if (customer.getUser() != null) {
            userResponse = new UserResponse(customer.getUser().getUserId(), customer.getUser().getUsername());
        }
        return CustomerResponse
                .builder()
                .customerId(customer.getCustomerId())
                .ceo(customer.getCeo())
                .ceoNum(customer.getCeoNum())
                .companyNum(customer.getCustomerName())
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
                .user(userResponse)
                .affiliation(convertToAffiliationResponse(customer.getCustomerAffiliation()))
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
                .user(convertToUserResponse(estimate.getUser()))
                .receipted(estimate.isReceipted())
                .totalAmount(estimate.getTotalAmount())
                .estimateDate(estimate.getEstimateDate())
                .customerId(estimate.getCustomer().getCustomerId())
                .customerName(estimate.getCustomer().getCustomerName())
                .items(estimate.getItems().stream().map(this::convertToEstimateItemResponse).collect(Collectors.toList()))
                .build();
    }

    public EstimateItemResponse convertToEstimateItemResponse(EstimateItem estimateItem) {
        return EstimateItemResponse
                .builder()
                .itemId(estimateItem.getItemId())
                .productName(estimateItem.getStock().getProductName())
                .modelName(estimateItem.getStock().getModelName())
                .stockId(estimateItem.getStock().getStockId())
                .hand(estimateItem.isHand())
                .quantity(estimateItem.getQuantity())
                .unitPrice(estimateItem.getStock().getOutPrice())
                .build();
    }

    public com.example.daon.estimate.dto.response.UserResponse convertToUserResponse(UserEntity user) {
        return com.example.daon.estimate.dto.response.UserResponse
                .builder()
                .userId(user.getUserId())
                .name(user.getName())
                .build();
    }

    public ReceiptResponse convertToReceiptResponse(ReceiptEntity receipt) {
        return ReceiptResponse
                .builder()
                .receiptId(receipt.getReceiptId())
                .timeStamp(receipt.getTimeStamp())
                .category(receipt.getCategory())
                .stockId(receipt.getStock().getStockId())
                .quantity(receipt.getQuantity())
                .totalPrice(receipt.getTotalPrice())
                .description(receipt.getDescription())
                .customerId(receipt.getCustomer().getCustomerId())
                .customerName(receipt.getCustomer().getCustomerName())
                .unitPrice(receipt.getStock().getOutPrice())
                .modelName(receipt.getStock().getModelName())
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
                .keyWord(stock.getKeyWord())
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
                .isCompleted(false)
                .assignedUser(convertToAssignedUserResponse(task.getAssignedUser()))
                .details(task.getDetails())
                .remarks(task.getRemarks())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .estimateId(task.getEstimate() != null ? task.getEstimate().getEstimateId() : null)
                .build();
    }

    public LedgerResponse convertToLedgerResponse(ReceiptEntity receipt) {
        return LedgerResponse
                .builder()
                .build();
    }

    public NoPaidResponse convertToNoPaidResponse(ReceiptEntity receipt) {
        return NoPaidResponse
                .builder()
                .build();
    }
}