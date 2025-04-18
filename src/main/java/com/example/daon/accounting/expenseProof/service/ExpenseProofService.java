package com.example.daon.accounting.expenseProof.service;

import com.example.daon.accounting.categorySelection.service.CategorySelectionService;
import com.example.daon.accounting.expenseProof.dto.request.ExpenseProofRequest;
import com.example.daon.accounting.expenseProof.dto.response.ExpenseProofResponse;
import com.example.daon.accounting.expenseProof.model.ExpenseProofEntity;
import com.example.daon.accounting.expenseProof.repository.ExpenseProofRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.global.service.GlobalService;
import com.example.daon.receipts.model.FromCategory;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.receipts.repository.ReceiptRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class ExpenseProofService {


    private final ExpenseProofRepository expenseProofRepository;
    private final CustomerRepository customerRepository;
    private final ReceiptRepository receiptRepository;
    private final CategorySelectionService categorySelectionService;
    private final GlobalService globalService;

    //지출증빙
    public void saveExpenseProof(ExpenseProofRequest expenseProofRequest) {
        CustomerEntity customer = customerRepository.findById(expenseProofRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("잘못된 고객 아이디입니다."));
        categorySelectionService.findAndSave(expenseProofRequest.getCategorySelection());
        expenseProofRepository.save(expenseProofRequest.toExpenseProofEntity(customer));
    }

    public void updateExpenseProof(ExpenseProofRequest expenseProofRequest) {
        ExpenseProofEntity expenseProofEntity = expenseProofRepository.findById(expenseProofRequest.getExpenseProofId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        CustomerEntity customer = customerRepository.findById(expenseProofRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("잘못된 고객 아이디입니다."));
        expenseProofEntity.updateFromRequest(expenseProofRequest, customer);
        expenseProofRepository.save(expenseProofEntity);
    }

    public void deleteExpenseProof(ExpenseProofRequest expenseProofRequest) {
        expenseProofRepository.deleteById(expenseProofRequest.getExpenseProofId());
    }

    public List<ExpenseProofResponse> getExpenseProof(ExpenseProofRequest expenseProofRequest) {
        List<ExpenseProofEntity> expenseProofEntities = expenseProofRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            if (expenseProofRequest.getExpenseProofId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("expenseProofId"), expenseProofRequest.getExpenseProofId()));
            } else {

                if (expenseProofRequest.getSearchSDate() != null && expenseProofRequest.getSearchEDate() != null) {
                    predicates.add(criteriaBuilder.between(root.get("date"), expenseProofRequest.getSearchSDate(), expenseProofRequest.getSearchEDate()));
                }

                if (expenseProofRequest.getCustomerId() != null) {
                    predicates.add(criteriaBuilder.like(root.get("customerId").get("customerName"), "%" + expenseProofRequest.getCustomerName() + "%"));
                }
            }
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        return expenseProofEntities.stream().map(globalService::convertToExpenseProofResponse).collect(Collectors.toList());
    }

    public void paidExpenseProof(ExpenseProofRequest expenseProofRequest) {
        ExpenseProofEntity expenseProofEntity = expenseProofRepository.findById(expenseProofRequest.getExpenseProofId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        expenseProofEntity.setPaid(!expenseProofEntity.isPaid());

        if (expenseProofEntity.isPaid()) {
            ReceiptEntity receipt = receiptRepository.save(new ReceiptEntity(
                    null,
                    null,
                    LocalDateTime.now(),
                    ReceiptCategory.SALES,
                    expenseProofEntity.getCustomerId(),
                    null,
                    null,
                    1,
                    expenseProofEntity.getTotal(),
                    expenseProofEntity.getPaymentDetails(),
                    expenseProofEntity.getMemo(),
                    FromCategory.SALES));
            expenseProofEntity.setReceiptId(receipt.getReceiptId());
            expenseProofEntity.setPaidDate(LocalDate.now());
        } else {
            receiptRepository.deleteById(expenseProofEntity.getReceiptId());
            expenseProofEntity.setReceiptId(null);
            expenseProofEntity.setPaidDate(null);
        }

        expenseProofRepository.save(expenseProofEntity);
    }
}
