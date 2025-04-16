package com.example.daon.accounting.cardTransaction.service;

import com.example.daon.accounting.cardTransaction.dto.request.CardTransactionRequest;
import com.example.daon.accounting.cardTransaction.model.CardTransactionEntity;
import com.example.daon.accounting.cardTransaction.repository.CardTransactionRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.receipts.model.FromCategory;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.receipts.repository.ReceiptRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardTransactionService {
    private final CustomerRepository customerRepository;
    private final CardTransactionRepository cardTransactionRepository;
    private final ReceiptRepository receiptRepository;

    //카드결제내역
    public void saveCardTransaction(CardTransactionRequest cardTransactionRequest) {
        CustomerEntity customer = customerRepository.findById(cardTransactionRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("잘못된 고객 아이디입니다."));
        cardTransactionRepository.save(cardTransactionRequest.toCardTransactionEntity(customer));
    }

    public void updateCardTransaction(CardTransactionRequest cardTransactionRequest) {
        CardTransactionEntity cardTransaction = cardTransactionRepository.findById(cardTransactionRequest.getCardTransactionId()).orElse(null);
        CustomerEntity customer = customerRepository.findById(cardTransactionRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("잘못된 고객 아이디입니다."));
        cardTransaction.updateFields(cardTransactionRequest, customer);
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
        CardTransactionEntity cardTransaction = cardTransactionRepository.findById(cardTransactionRequest.getCardTransactionId()).orElse(null);
        cardTransaction.setPaid(!cardTransaction.isPaid());

        if (cardTransaction.isPaid()) {
            ReceiptEntity receipt = receiptRepository.save(new ReceiptEntity(
                    null,
                    null,
                    LocalDateTime.now(),
                    ReceiptCategory.SALES,
                    cardTransaction.getCustomerId(),
                    null,
                    null,
                    1,
                    cardTransaction.getTotal(),
                    cardTransaction.getPaymentDetails(),
                    cardTransaction.getMemo(),
                    FromCategory.SALES));
            cardTransaction.setReceiptId(receipt.getReceiptId());
            cardTransaction.setPaidDate(LocalDate.now());
        } else {
            receiptRepository.deleteById(cardTransaction.getReceiptId());
            cardTransaction.setReceiptId(null);
            cardTransaction.setPaidDate(null);
        }

        cardTransactionRepository.save(cardTransaction);

    }
}
