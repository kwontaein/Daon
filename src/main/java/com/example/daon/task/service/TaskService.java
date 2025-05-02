package com.example.daon.task.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.repository.EstimateRepository;
import com.example.daon.global.service.GlobalService;
import com.example.daon.task.dto.request.TaskRequest;
import com.example.daon.task.dto.response.TaskResponse;
import com.example.daon.task.model.TaskEntity;
import com.example.daon.task.repository.TaskRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final CustomerRepository customerRepository;
    private final EstimateRepository estimateRepository;
    private final GlobalService globalService;

    //관리자데이터조회
    public List<TaskResponse> getTasks() {
        List<TaskEntity> taskEntities = taskRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            query.orderBy(criteriaBuilder.desc(root.get("createdAt"))); // 조치일 순으로 교체하려면 complete_at
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        return taskEntities.stream().map(globalService::convertToTaskResponse).collect(Collectors.toList());
    }

    public TaskResponse getTask(UUID taskId) {
        TaskEntity taskEntity = taskRepository.findById(taskId).orElse(null);
        return globalService.convertToTaskResponse(taskEntity);
    }

    //업무검색 - 거래처 구분 담당자 거래처분류
    public List<TaskResponse> getTaskByOption(TaskRequest taskRequest) {
        List<TaskEntity> taskEntities = taskRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            // 거래처 조건
            if (taskRequest.getCustomer() != null) {
                //거래처 얻기
                predicates.add(criteriaBuilder.equal(root.get("customer").get("customerId"), taskRequest.getCustomer()));
            }

            //구분
            if (taskRequest.getTaskType() != null) {
                predicates.add(criteriaBuilder.equal(root.get("taskType"), taskRequest.getTaskType()));
            }

            //담당자
            if (taskRequest.getAssignedUser() != null) {
                //거래처 얻기
                predicates.add(criteriaBuilder.equal(root.get("assignedUser").get("userId"), taskRequest.getAssignedUser()));
            }

            query.orderBy(criteriaBuilder.desc(root.get("createdAt"))); // 조치일 순으로 교체하려면 complete_at

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        return taskEntities.stream().map(globalService::convertToTaskResponse).collect(Collectors.toList());
    }

    //업무조회 - 처리완료 안된 것들
    public List<TaskResponse> getTaskToday() {
        List<TaskEntity> taskEntities = taskRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            //처리완료 여부가 false 인 것들
            predicates.add(criteriaBuilder.equal(root.get("isCompleted"), false));

            query.orderBy(criteriaBuilder.desc(root.get("createdAt"))); // 조치일 순으로 교체하려면 complete_at
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        return taskEntities.stream().map(globalService::convertToTaskResponse).collect(Collectors.toList());
    }


    //업무등록
    public void saveTask(TaskRequest taskRequest) {
        CustomerEntity customer = customerRepository.findById(taskRequest.getCustomer()).orElse(null);
        UserEntity assignedUser = globalService.resolveUser(taskRequest.getAssignedUser());
        EstimateEntity estimate = null;
        if (taskRequest.getEstimateId() != null) {
            estimate = estimateRepository.findById(taskRequest.getEstimateId()).orElse(null);
        }
        LocalDateTime createdDate = LocalDateTime.now();
        TaskEntity task = taskRepository.save(taskRequest.toEntity(customer, assignedUser, createdDate, estimate));
        taskRequest.setTaskId(task.getTaskId());
    }

    //업무수정
    public void updateTask(TaskRequest taskRequest) {
        TaskEntity task = taskRepository.findById(taskRequest.taskId).orElse(null);
        if (task != null) {
            EstimateEntity estimate = estimateRepository.findById(taskRequest.getEstimateId()).orElse(null);
            UserEntity assignedUser = globalService.resolveUser(taskRequest.getAssignedUser());
            task.updateFromRequest(taskRequest, assignedUser, estimate);
        }
        taskRepository.save(task);
    }

    //업무삭제
    public void deleteTask(TaskRequest taskRequest) {
        for (UUID taskId : taskRequest.taskIds) {
            TaskEntity task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("존재하지 않는 업무입니다."));
            if (task.getEstimate() != null) {
                EstimateEntity estimate = task.getEstimate();
                estimate.setTask(null);     // EstimateEntity의 참조 해제
                task.setEstimate(null);   // TaskEntity의 참조 해제
                estimateRepository.deleteById(estimate.getEstimateId());
            }
            taskRepository.deleteById(taskId);
        }
    }

    //처리완료
    public void taskComplete(TaskRequest taskRequest) {
        TaskEntity task = taskRepository.findById(taskRequest.getTaskId()).orElse(null);
        task.setCompleteAt(LocalDateTime.now());
        task.setActionTaken(taskRequest.getActionTaken());
        taskRepository.save(task);
    }

    //담당교체
    public void updateTaskUser(TaskRequest taskRequest) {
        TaskEntity task = taskRepository.findById(taskRequest.getTaskId()).orElse(null);
        UserEntity user = globalService.resolveUser(taskRequest.getAssignedUser());
        task.setAssignedUser(user);
        taskRepository.save(task);
    }
}
