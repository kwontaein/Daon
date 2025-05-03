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
import java.util.ArrayList;
import java.util.List;

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
            if (methodName.contains("get")) {
                return;
            }
            // 메시지의 목적지를 해당 파라미터 이름으로 설정
            message.setDestination(paramName);

            if (paramValue instanceof List<?>) {
                processListParam(paramName, (List<?>) paramValue, message);
            } else {
                processSingleParam(paramName, paramValue, message);
            }
        }

        if (!message.getId().toString().equals("null")) {
            messagingTemplate.convertAndSend("/topic/transaction_alert", message);
        }
    }

    // List 타입 파라미터를 처리하여 각 DTO의 [paramName + "Id"] 필드 값을 추출
    private void processListParam(String paramName, List<?> dtoList, Message message) {
        String targetFieldName = paramName + "Id";
        List<String> ids = new ArrayList<>();

        for (Object dto : dtoList) {
            try {
                Field idField = dto.getClass().getDeclaredField(targetFieldName);
                idField.setAccessible(true);
                Object idValue = idField.get(dto);
                if (idValue != null) {
                    ids.add(idValue.toString());
                }
            } catch (NoSuchFieldException | IllegalAccessException e) {
                // 필요에 따라 로깅 처리
                e.printStackTrace();
            }
        }
        message.setId(ids.toString());
    }

    // 단일 DTO 파라미터를 처리하여 toString() 결과를 파싱함으로써 [paramName + "Id"]와 추가 조건에 따른 값을 추출
    private void processSingleParam(String paramName, Object paramValue, Message defaultMessage) {
        Field[] fields = paramValue.getClass().getDeclaredFields();

        for (Field field : fields) {
            String fieldName = field.getName();

            if (fieldName.contains("Id")) {
                field.setAccessible(true);
                try {
                    Object value = field.get(paramValue);
                    if (value != null) {
                        // "estimateId" -> "estimate", "userId" -> "user", "taskIds" -> "task"
                        String destination = fieldName.replace("Ids", "").replace("Id", "");
                        Message msg = new Message();
                        msg.setDestination(destination);
                        msg.setId(value.toString());
                        messagingTemplate.convertAndSend("/topic/transaction_alert", msg);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
    }


}