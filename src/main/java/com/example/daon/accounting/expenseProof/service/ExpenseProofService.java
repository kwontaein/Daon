package com.example.daon.accounting.expenseProof.service;

import com.example.daon.accounting.expenseProof.dto.request.ExpenseProofRequest;
import com.example.daon.accounting.expenseProof.model.ExpenseProofEntity;
import com.example.daon.accounting.expenseProof.repository.ExpenseProofRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ExpenseProofService {

    private final ExpenseProofRepository expenseProofRepository;

    //지출증빙
    public void saveExpenseProof(ExpenseProofRequest expenseProofRequest) {
        expenseProofRepository.save(expenseProofRequest.toExpenseProofEntity());
    }

    public void updateExpenseProof(ExpenseProofRequest expenseProofRequest) {
        ExpenseProofEntity expenseProofEntity = expenseProofRepository.findById(expenseProofRequest.getExpenseProofId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        expenseProofEntity.updateFromRequest(expenseProofRequest);
        expenseProofRepository.save(expenseProofEntity);
    }

    public void deleteExpenseProof(ExpenseProofRequest expenseProofRequest) {
        expenseProofRepository.deleteById(expenseProofRequest.getExpenseProofId());
    }

    public void getExpenseProof(ExpenseProofRequest expenseProofRequest) {
        List<ExpenseProofEntity> expenseProofEntities = expenseProofRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            // 거래처 분류
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public void paidExpenseProof(ExpenseProofRequest expenseProofRequest) {
        ExpenseProofEntity expenseProofEntity = expenseProofRepository.findById(expenseProofRequest.getExpenseProofId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        expenseProofEntity.setPaid(!expenseProofEntity.isPaid());
        expenseProofRepository.save(expenseProofEntity);
    }
}
