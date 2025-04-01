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
import java.util.Arrays;
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
        System.out.println("Extracted IDs: " + ids);
    }

    // 단일 DTO 파라미터를 처리하여 toString() 결과를 파싱함으로써 [paramName + "Id"]와 추가 조건에 따른 값을 추출
    private void processSingleParam(String paramName, Object paramValue, Message message) {
        boolean isEstimate = "estimate".equals(paramName);
        String targetSingularFieldName = paramName + "Id";
        String targetPluralFieldName = paramName + "Ids";

        String dtoString = paramValue.toString();
        int startIndex = dtoString.indexOf("(");
        int endIndex = dtoString.lastIndexOf(")");

        if (startIndex != -1 && endIndex != -1) {
            String fieldsPart = dtoString.substring(startIndex + 1, endIndex);
            // 주의: 값에 쉼표가 포함된 경우를 고려하면 보다 정교한 파싱이 필요할 수 있음
            String[] fieldParts = fieldsPart.split(",");

            for (String field : fieldParts) {
                String[] keyValue = field.split("=");
                if (keyValue.length == 2) {
                    String key = keyValue[0].trim();
                    String value = keyValue[1].trim();

                    // 복수형 필드 (UUID 배열) 처리
                    if (key.equals(targetPluralFieldName)) {
                        // 예시: value가 "[uuid1, uuid2, uuid3]" 형태일 것으로 가정
                        String arrayString = value;
                        if (arrayString.startsWith("[") && arrayString.endsWith("]")) {
                            arrayString = arrayString.substring(1, arrayString.length() - 1);
                        }
                        String[] uuidValues = arrayString.split(",");
                        List<String> uuidList = new ArrayList<>();
                        for (String uuid : uuidValues) {
                            String trimmed = uuid.trim();
                            if (!trimmed.isEmpty()) {
                                uuidList.add(trimmed);
                            }
                        }
                        message.setId(uuidList.toString());
                    }
                    // 단일 값 필드 처리
                    else if (key.equals(targetSingularFieldName)) {
                        message.setId(value);
                    }

                    // paramName이 "estimate"인 경우 추가 taskId 처리
                    if (isEstimate && key.equals("taskId")) {
                        Message taskMsg = new Message();
                        taskMsg.setDestination("task");
                        taskMsg.setId(value);
                        messagingTemplate.convertAndSend("/topic/transaction_alert", taskMsg);
                    }
                }
            }
        }
    }


}