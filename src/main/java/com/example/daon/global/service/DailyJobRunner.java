package com.example.daon.global.service;

import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.receipts.model.DailyTotalEntity;
import com.example.daon.receipts.repository.DailyTotalRepository;
import com.example.daon.receipts.repository.ReceiptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DailyJobRunner {

    private final ReceiptRepository receiptRepository;
    private final DailyTotalRepository dailyTotalRepository;
    private final CustomerRepository customerRepository;

    //매일 자정
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul") // 매일 00:00:00
    public void runDailyTask() {
        System.out.println("매일 자정에 실행됩니다.");
        // 여기에 원하는 로직 실행
        DailyTotalEntity dailyTotalEntity =
                dailyTotalRepository.findDailyTotalEntityByDate(LocalDate.now().minusDays(1)).orElseThrow(() -> new RuntimeException("기록이 남지 않았습니다."));

        dailyTotalRepository.save(new DailyTotalEntity(
                UUID.randomUUID()
                , dailyTotalEntity.getBeforeTotal()
                , LocalDate.now()
                , BigDecimal.ZERO
                , BigDecimal.ZERO
                , BigDecimal.ZERO
                , BigDecimal.ZERO
                , BigDecimal.ZERO
                , dailyTotalEntity.getBeforeTotal()));
    }

    //매월 1일 자정
    @Scheduled(cron = "0 0 0 1 * *", zone = "Asia/Seoul")
    public void runMonthlyTask() {
        System.out.println("매월 1일 자정(한국 시간)에 실행됩니다.");
        //전기이월 저장

    }
}