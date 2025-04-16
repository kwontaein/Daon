package com.example.daon.accounting.salesVAT.service;

import com.example.daon.accounting.salesVAT.dto.request.SalesVATRequest;
import com.example.daon.accounting.salesVAT.model.SalesVATEntity;
import com.example.daon.accounting.salesVAT.repository.SalesVATRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
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

@RestController
@RequiredArgsConstructor
public class SalesVATService {

    private final SalesVATRepository salesVATRepository;
    private final CustomerRepository customerRepository;
    private final ReceiptRepository receiptRepository;

    //매출부가세
    public void saveSalesVAT(SalesVATRequest salesVATRequest) {
        CustomerEntity customer = customerRepository.findById(salesVATRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("존재하지 않는 고객입니다."));
        salesVATRepository.save(salesVATRequest.toSalesVATEntity(customer));
    }

    public void updateSalesVAT(SalesVATRequest salesVATRequest) {
        SalesVATEntity salesVATEntity = salesVATRepository.findById(salesVATRequest.getSalesVATId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        CustomerEntity customer = customerRepository.findById(salesVATRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("존재하지 않는 고객입니다."));
        salesVATEntity.updateFromRequest(salesVATRequest, customer);
        salesVATRepository.save(salesVATEntity);
    }

    public void deleteSalesVAT(SalesVATRequest salesVATRequest) {
        salesVATRepository.deleteById(salesVATRequest.getSalesVATId());
    }

    public void getSalesVAT(SalesVATRequest salesVATRequest) {
        List<SalesVATEntity> salesVATEntities = salesVATRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            // 거래처 분류
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public void paidSalesVAT(SalesVATRequest salesVATRequest) {
        SalesVATEntity salesVATEntity = salesVATRepository.findById(salesVATRequest.getSalesVATId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        salesVATEntity.setPaid(!salesVATEntity.isPaid());

        if (salesVATEntity.isPaid()) {
            ReceiptEntity receipt = receiptRepository.save(new ReceiptEntity(
                    null,
                    null,
                    LocalDateTime.now(),
                    ReceiptCategory.SALES,
                    salesVATEntity.getCustomerId(),
                    null,
                    null,
                    1,
                    salesVATEntity.getTotal(),
                    salesVATEntity.getPaymentDetails(),
                    salesVATEntity.getMemo(),
                    FromCategory.SALES));
            salesVATEntity.setReceiptId(receipt.getReceiptId());
            salesVATEntity.setPaidDate(LocalDate.now());
        } else {
            receiptRepository.deleteById(salesVATEntity.getReceiptId());
            salesVATEntity.setReceiptId(null);
            salesVATEntity.setPaidDate(null);
        }
        salesVATRepository.save(salesVATEntity);
    }
}
