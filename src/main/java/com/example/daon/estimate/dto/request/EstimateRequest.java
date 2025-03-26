package com.example.daon.estimate.dto.request;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.model.EstimateItem;
import com.example.daon.task.model.TaskEntity;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Data
public class EstimateRequest {
    private UUID estimateId;
    private UUID customerId;
    private UUID companyId;
    private UUID taskId;
    private String userId;
    private String estimateDate;
    private BigDecimal totalAmount;
    private List<EstimateItemRequest> items;

    //----------------------

    private LocalDate searchSDate;  //검색 날짜 시작일
    private LocalDate searchEDate;  //검색 날짜 종료일
    private String companyName;
    private String customerName;
    private String productName;
    private boolean receipted;
    private boolean task;
    private Condition condition;

    public EstimateEntity toEntity(CustomerEntity customer, CompanyEntity company, UserEntity user, TaskEntity task, List<EstimateItem> items) {
        return EstimateEntity
                .builder()
                .customer(customer)
                .company(company)
                .user(user)
                .receipted(false)
                .totalAmount(totalAmount)
                .estimateDate(LocalDateTime.now())
                .items(items)
                .task(task)
                .build();
    }


    @Getter
    @RequiredArgsConstructor
    public enum Condition {

        ALL("전체"),
        NORMAL("기본"),
        HAND("수기");

        private final String cate;

        //user_role 유효성 검사
        @JsonCreator
        public static Condition positionParsing(String inputValue) {

            return Stream.of(Condition.values())
                    .filter(condition -> condition.toString().equals(inputValue))
                    .findFirst()
                    .orElse(NORMAL);
        }
    }

}
