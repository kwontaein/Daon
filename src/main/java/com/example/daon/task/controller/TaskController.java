package com.example.daon.task.controller;

import com.example.daon.task.dto.request.TaskRequest;
import com.example.daon.task.dto.response.TaskResponse;
import com.example.daon.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 업무관리
 */
@RestController
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    //관리자데이터조회
    @GetMapping("api/getTasks")
    public List<TaskResponse> getTasks() {
        List<TaskResponse> taskResponses = taskService.getTasks();
        return taskResponses;
    }

    @GetMapping("api/getAdminTask")
    public List<TaskResponse> getAdminTask() {
        List<TaskResponse> taskResponses = taskService.getAdminTasks();
        return taskResponses;
    }


    //업무 하나만 조회
    @PostMapping("api/getTask")
    public TaskResponse getTask(@RequestBody TaskRequest taskRequest) {
        TaskResponse taskResponse = taskService.getTask(taskRequest.getTaskId());
        return taskResponse;
    }

    //업무검색-조건
    @PostMapping("api/getTaskByOption")
    public List<TaskResponse> getTaskByOption(@RequestBody TaskRequest taskRequest) {
        return taskService.getTaskByOption(taskRequest);
    }

    //업무등록
    @PostMapping("api/saveTask")
    public void saveTask(@RequestBody TaskRequest taskRequest) {
        taskService.saveTask(taskRequest);
    }

    //업무수정
    @PostMapping("api/updateTask")
    public void updateTask(@RequestBody TaskRequest taskRequest) {
        taskService.updateTask(taskRequest);
    }


    //업무삭제
    @PostMapping("api/deleteTask")
    public void deleteTask(@RequestBody TaskRequest taskRequest) {
        taskService.deleteTask(taskRequest);
    }


    //처리완료
    @PostMapping("api/taskComplete")
    public void taskComplete(@RequestBody TaskRequest taskRequest) {
        taskService.taskComplete(taskRequest);
    }

    //담당유저변경
    @PostMapping("api/updateTaskUser")
    public void updateTaskUser(@RequestBody TaskRequest taskRequest) {
        taskService.updateTaskUser(taskRequest);
    }
}
