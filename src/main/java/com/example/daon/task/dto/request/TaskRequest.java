package com.example.daon.task.dto.request;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.task.model.TaskEntity;
import com.example.daon.task.model.TaskType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class TaskRequest {
    public UUID taskId; // 업무 아이디

    public TaskType taskType; // 구분 (ENUM 사용)

    public UUID customer; // 거래처

    public String requesterName; // 의뢰자명

    public String requesterContact; // 의뢰자 연락처

    public String requesterContact2; // 의뢰자 연락처2

    public String model; // 모델

    public Boolean isCompleted; // 처리 여부

    public String assignedUser; // 담당 기사 (유저)

    public String details; // 내용

    public String remarks; // 비고

    public LocalDateTime createdAt; // 생성일

    public LocalDateTime updatedAt; // 수정일

    private UUID estimateId;
    //--------------------------------------

    public String receiptCate;

    public UUID[] taskIds;

    private String actionTaken;

    public TaskEntity toEntity(CustomerEntity customer, UserEntity user, LocalDateTime createdAt, EstimateEntity estimate) {
        return TaskEntity
                .builder()
                .taskId(taskId)
                .taskType(taskType)
                .customer(customer)
                .requesterName(requesterName)
                .requesterContact(requesterContact)
                .requesterContact2(requesterContact2)
                .model(model)
                .isCompleted(false)
                .assignedUser(user)
                .details(details)
                .remarks(remarks)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .estimate(estimate)
                .build();
    }
}
