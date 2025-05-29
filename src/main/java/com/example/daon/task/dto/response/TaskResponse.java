package com.example.daon.task.dto.response;

import com.example.daon.customer.dto.response.CustomerResponse;
import com.example.daon.task.model.TaskType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskResponse {
    public UUID taskId; // 업무 아이디

    public TaskType taskType; // 구분 (ENUM 사용)

    public CustomerResponse customer; // 거래처

    public String requesterName; // 의뢰자명

    public String requesterContact; // 의뢰자 연락처

    public String requesterContact2; // 의뢰자 연락처2

    public String model; // 모델

    public AssignedUser assignedUser; // 담당 기사 (유저)

    public AssignedUser createUser; // 생성자 (유저)

    public String details; // 내용

    public String remarks; // 비고

    public LocalDateTime createdAt; // 생성일

    public LocalDateTime updatedAt; // 수정일

    public LocalDateTime completeAt; // 조치일

    //--------------------------------------

    public String receiptCate;

    public UUID estimateId;

}
