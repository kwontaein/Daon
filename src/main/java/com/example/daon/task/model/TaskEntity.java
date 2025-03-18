package com.example.daon.task.model;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.task.dto.request.TaskRequest;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "task")
public class TaskEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "task_id", columnDefinition = "BINARY(16)")
    private UUID taskId; // 업무 아이디

    @Enumerated(EnumType.STRING)
    @Column(name = "task_type", nullable = false)
    private TaskType taskType; // 구분 (ENUM 사용)

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer; // 거래처

    @Column(name = "requester_name", nullable = false)
    private String requesterName; // 의뢰자명

    @Column(name = "requester_contact", nullable = false)
    private String requesterContact; // 의뢰자 연락처

    @Column(name = "requester_contact2")
    private String requesterContact2; // 의뢰자 연락처2

    @Column(name = "model", nullable = false)
    private String model; // 모델

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted; // 처리 여부

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity assignedUser; // 담당 기사 (유저)

    @Column(name = "details", columnDefinition = "TEXT")
    private String details; // 내용

    @Column(name = "remarks", columnDefinition = "TEXT")
    private String remarks; // 비고

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // 생성일

    @Column(name = "updated_at")
    private LocalDateTime updatedAt; // 수정일

    @Column(name = "complete_at")
    private LocalDateTime completeAt; // 조치일

    @OneToOne
    @JoinColumn(name = "estimate")
    private EstimateEntity estimate;

    public void updateFromRequest(TaskRequest request, UserEntity user, EstimateEntity estimate) {
        this.taskType = request.getTaskType();
        this.requesterName = request.getRequesterName();
        this.requesterContact = request.getRequesterContact();
        this.requesterContact2 = request.getRequesterContact2();
        this.model = request.getModel();
        this.isCompleted = request.getIsCompleted();
        this.details = request.getDetails();
        this.remarks = request.getRemarks();
        this.assignedUser = user;
        this.estimate = estimate;
        this.updatedAt = LocalDateTime.now();
    }
}
