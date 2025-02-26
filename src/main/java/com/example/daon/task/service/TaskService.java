package com.example.daon.task.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.task.dto.request.TaskRequest;
import com.example.daon.task.model.TaskEntity;
import com.example.daon.task.repository.TaskRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    //관리자데이터조회
    public List<TaskEntity> getTask() {
        return taskRepository.findAll();
    }

    //업무검색 - 거래처 구분 담당자 거래처분류
    public List<TaskEntity> getTaskByOption(TaskRequest taskRequest) {
        return taskRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            // 거래처 조건
            if (taskRequest.getCustomer() != null) {
                //거래처 얻기
                CustomerEntity customer = customerRepository.findById(taskRequest.getCustomer()).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("customer"), customer));
            }

            //구분
            if (taskRequest.getTaskType() != null) {
                predicates.add(criteriaBuilder.equal(root.get("taskType"), taskRequest.getTaskType()));
            }

            //담당자
            if (taskRequest.getAssignedUser() != null) {
                //거래처 얻기
                UserEntity assignedUser = userRepository.findById(taskRequest.getAssignedUser()).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("assignedUser"), assignedUser));
            }
            //거래처분류


            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    //업무조회 - 처리완료 안된 것들
    public List<TaskEntity> getTaskToday() {
        return taskRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            //처리완료 여부가 false 인 것들
            predicates.add(criteriaBuilder.equal(root.get("isCompleted"), false));

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }


    //업무등록
    public void saveTask(TaskRequest taskRequest) {
        CustomerEntity customer = customerRepository.findById(taskRequest.getCustomer()).orElse(null);
        UserEntity assignedUser = userRepository.findById(taskRequest.getAssignedUser()).orElse(null);
        taskRepository.save(taskRequest.toEntity(customer, assignedUser));
    }

    //업무수정
    public void updateTask() {

    }

    //업무삭제
    public void deleteTask(TaskRequest taskRequest) {
        taskRepository.deleteById(taskRequest.getTaskId());
    }

    //처리완료
    public void taskComplete(TaskRequest taskRequest) {
        TaskEntity task = taskRepository.findById(taskRequest.getTaskId()).orElse(null);
        task.setIsCompleted(true);
        taskRepository.save(task);
    }

    //담당교체
    public void updateTaskUser(TaskRequest taskRequest) {
        TaskEntity task = taskRepository.findById(taskRequest.getTaskId()).orElse(null);
        UserEntity user = userRepository.findById(taskRequest.getAssignedUser()).orElse(null);
        task.setAssignedUser(user);
        taskRepository.save(task);
    }
}
