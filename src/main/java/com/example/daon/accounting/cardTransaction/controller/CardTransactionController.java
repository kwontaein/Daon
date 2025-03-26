package com.example.daon.accounting.cardTransaction.controller;

import com.example.daon.accounting.cardTransaction.service.CardTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardTransactionController {
    private final CardTransactionService cardTransactionService;

    //카드결제내역
    public void saveCardTransaction() {
        cardTransactionService.saveCardTransaction();
    }

    public void updateCardTransaction() {
        cardTransactionService.updateCardTransaction();
    }

    public void deleteCardTransaction() {
        cardTransactionService.deleteCardTransaction();
    }

    public void getCardTransaction() {
        cardTransactionService.getCardTransaction();
    }

    public void paidCardTransaction() {
        cardTransactionService.paidCardTransaction();
    }
}
