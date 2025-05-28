package com.example.daon.global.aspect;

import com.example.daon.global.dto.Message;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.List;
import java.util.UUID;

@Aspect
@Component
@RequiredArgsConstructor
public class WebSocketAspect {

    private final SimpMessagingTemplate messagingTemplate;

    // @PostMapping이 붙은 모든 메소드가 정상 종료된 후 실행
    @AfterReturning("@annotation(org.springframework.web.bind.annotation.PostMapping)")
    public void afterPostMethods(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String[] parameterNames = signature.getParameterNames();
        Object[] args = joinPoint.getArgs();

        Message message = new Message();

        for (int i = 0; i < parameterNames.length; i++) {
            // 파라미터 이름에서 "Request" 또는 "Requests"를 제거하여 대상 이름을 구함
            String paramName = parameterNames[i].replace("Requests", "").replace("Request", "");
            Object paramValue = args[i];
            String methodName = signature.getName();
            if (methodName.contains("get") || methodName.contains("Get")) {
                return;
            }

            if (paramName.equals("boardJson")) {
                message.setDestination(paramName.replace("Json", ""));
                message.setId(UUID.randomUUID().toString());
                messagingTemplate.convertAndSend("/topic/transaction_alert", message);
                return;
            }
            // 메시지의 목적지를 해당 파라미터 이름으로 설정
            message.setDestination(paramName);

            if (paramValue instanceof List<?>) {
                processListParam((List<?>) paramValue);
            } else {
                processSingleParam(paramValue);
            }
        }

        if (message.getId() != null) {
            messagingTemplate.convertAndSend("/topic/transaction_alert", message);
        }
    }

    // List 타입 파라미터를 처리하여 각 DTO의 [paramName + "Id"] 필드 값을 추출
    private void processListParam(List<?> dtoList) {
        for (Object dto : dtoList) {
            processSingleParam(dto);
        }
    }


    /**
     * 주어진 객체(paramValue)의 모든 필드를 순회하면서,
     * 필드명이 "Id" 또는 "Ids"를 포함한 경우 해당 값을 추출하여
     * 대상(destination)을 설정하고 메시지를 생성한 후,
     * "/topic/transaction_alert" 경로로 메시지를 전송한다.
     * <p>
     * 사용 예:
     * - estimateId → destination: "estimate"
     * - taskIds → destination: "task"
     *
     * @param paramValue 메시지 전송 대상 정보를 담은 객체
     */
    private void processSingleParam(Object paramValue) {
        // 파라미터가 null인 경우, 로그만 남기고 처리하지 않음
        if (paramValue == null) {
            System.out.println("paramValue is null. Skipping processing.");
            return;
        }

        if (paramValue.getClass().getSimpleName().equals("EstimateRequest")) {
            sendToTaskEstimate(paramValue);
        }

        // 객체의 모든 선언된 필드(프라이빗 포함)를 가져옴
        Field[] fields = paramValue.getClass().getDeclaredFields();

        for (Field field : fields) {
            String fieldName = field.getName();

            // 필드명이 "Id"를 포함할 경우만 처리 대상
            if (fieldName.contains("Id")) {
                field.setAccessible(true); // private 필드 접근 허용

                try {
                    Object value = field.get(paramValue); // 필드의 실제 값 추출

                    // 값이 null이 아닌 경우만 메시지 생성
                    if (value != null) {
                        // "taskIds" → "task", "estimateId" → "estimate" 등으로 목적지(destination) 이름 변환
                        String destination = fieldName
                                .replace("Ids", "")
                                .replace("Id", "");

                        // 메시지 객체 생성 및 설정
                        Message msg = new Message();
                        msg.setDestination(destination);     // 목적지 설정
                        msg.setId(value.toString());         // ID 설정

                        // 메시지 브로커에 메시지 전송
                        messagingTemplate.convertAndSend("/topic/transaction_alert", msg);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace(); // 필드 접근 예외 발생 시 로그 출력
                }
            }
        }
    }

    private void sendToTaskEstimate(Object paramValue) {

        // 클래스 이름이 "EstimateRequest"인지 확인
        try {
            // 명시적으로 estimateId, taskId 필드 추출
            Field estimateField = paramValue.getClass().getDeclaredField("estimateId");
            Field taskField = paramValue.getClass().getDeclaredField("taskId");

            estimateField.setAccessible(true);
            taskField.setAccessible(true);

            Object estimateIdValue = estimateField.get(paramValue);
            Object taskIdValue = taskField.get(paramValue);

            // 둘 다 null이 아닐 경우에만 메시지 전송
            if (estimateIdValue != null && taskIdValue != null) {
                Message msg = new Message();
                msg.setDestination("taskEstimate");
                msg.setId(UUID.randomUUID().toString());

                messagingTemplate.convertAndSend("/topic/transaction_alert", msg);
            }

        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }

}