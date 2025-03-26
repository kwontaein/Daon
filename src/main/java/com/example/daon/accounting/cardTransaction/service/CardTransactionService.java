package com.example.daon.accounting.cardTransaction.service;

import com.example.daon.accounting.cardTransaction.dto.request.CardTransactionRequest;
import com.example.daon.accounting.cardTransaction.model.CardTransactionEntity;
import com.example.daon.accounting.cardTransaction.repository.CardTransactionRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardTransactionService {
    private final CardTransactionRepository cardTransactionRepository;

    //카드결제내역
    public void saveCardTransaction(CardTransactionRequest cardTransactionRequest) {
        cardTransactionRepository.save(cardTransactionRequest.toCardTransactionEntity());
    }

    public void updateCardTransaction(CardTransactionRequest cardTransactionRequest) {
        CardTransactionEntity cardTransaction = cardTransactionRepository.findById(cardTransactionRequest.getCardTransactionId()).orElse(null);
        cardTransaction.updateFields(cardTransactionRequest);
    }

    public void deleteCardTransaction(CardTransactionRequest cardTransactionRequest) {
        cardTransactionRepository.deleteById(cardTransactionRequest.getCardTransactionId());
    }

    public void getCardTransaction(CardTransactionRequest cardTransactionRequest) {
        List<CardTransactionEntity> cardTransactions = cardTransactionRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            // 거래처 분류
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

    }

    public void paidCardTransaction(CardTransactionRequest cardTransactionRequest) {
        cardTransactionRepository.findById(cardTransactionRequest.getCardTransactionId()).orElse(null);
        
    }
}
