package com.example.daon.accounting.cardTransaction.controller;

import com.example.daon.accounting.cardTransaction.dto.request.CardTransactionRequest;
import com.example.daon.accounting.cardTransaction.dto.response.CardTransactionResponse;
import com.example.daon.accounting.cardTransaction.service.CardTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CardTransactionController {
    private final CardTransactionService cardTransactionService;

    //카드결제내역 -> 전표전환
    @PostMapping("api/saveCardTransaction")
    public void saveCardTransaction(@RequestBody CardTransactionRequest cardTransactionRequest) {
        cardTransactionService.saveCardTransaction(cardTransactionRequest);
    }

    @PostMapping("api/updateCardTransaction")
    public void updateCardTransaction(@RequestBody CardTransactionRequest cardTransactionRequest) {
        cardTransactionService.updateCardTransaction(cardTransactionRequest);
    }

    @PostMapping("api/deleteCardTransaction")
    public void deleteCardTransaction(@RequestBody CardTransactionRequest cardTransactionRequest) {
        cardTransactionService.deleteCardTransaction(cardTransactionRequest);
    }

    @GetMapping("api/getAllCardTransaction")
    public List<CardTransactionResponse> getAllCardTransaction() {
        return cardTransactionService.getCardTransaction(new CardTransactionRequest());
    }

    @PostMapping("api/getCardTransaction")
    public List<CardTransactionResponse> getCardTransaction(@RequestBody CardTransactionRequest cardTransactionRequest) {
        return cardTransactionService.getCardTransaction(cardTransactionRequest);
    }


    @PostMapping("api/cardTransactionPaid")
    public void cardTransactionPaid(@RequestBody CardTransactionRequest cardTransactionRequest) {
        cardTransactionService.paidCardTransaction(cardTransactionRequest);
    }
}
