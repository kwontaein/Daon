package com.example.daon.global.aspect;

import com.example.daon.global.dto.Message;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

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

        Message message = new Message();

        Object[] args = joinPoint.getArgs();

        for (int i = 0; i < parameterNames.length; i++) {
            String paramName = parameterNames[i];
            Object paramValue = args[i];
            System.out.println(paramName);
            System.out.println(paramValue);
            message.setDestination(paramName.replace("Request", ""));
            if (paramValue instanceof List<?>) {
                break;
            }
            String dtoString = paramValue.toString();

            int startIndex = dtoString.indexOf("(");
            if (startIndex != -1) {

                int endIndex = dtoString.indexOf(",", startIndex);

                if (endIndex == -1) {
                    endIndex = dtoString.indexOf(")", startIndex);
                }

                String firstFieldPart = dtoString.substring(startIndex + 1, endIndex).trim();

                String[] keyValue = firstFieldPart.split("=");
                if (keyValue.length == 2) {
                    String fieldKey = keyValue[0];   // "stockCateId"
                    String fieldValue = keyValue[1]; // "null"

                    message.setId(fieldValue);
                }
            }
        }
        System.out.println(message);
        messagingTemplate.convertAndSend("/topic/transaction_alert", message);
    }
}