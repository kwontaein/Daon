package com.example.daon.task.model;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.model.CustomerEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
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
}
