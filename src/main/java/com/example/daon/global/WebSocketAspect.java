package com.example.daon.global;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
@RequiredArgsConstructor
public class WebSocketAspect {

    private final SimpMessagingTemplate messagingTemplate;

    // @PostMapping이 붙은 모든 메소드가 정상 종료된 후 실행
    @AfterReturning("@annotation(org.springframework.web.bind.annotation.PostMapping)")
    public void afterPostMethods(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("[AOP] @PostMapping 메소드 정상 종료: " + methodName);

        // 메서드 시그니처를 통해 호출된 메서드 정보 확인
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        // AOP로 감싸진 실제 메서드의 파라미터 가져오기
        Object[] args = joinPoint.getArgs();

        // args를 순회하며 DTO를 특정 타입으로 캐스팅해 사용하는 예시
        for (Object arg : args) {
            // 여기서 DTO 정보 활용
            messagingTemplate.convertAndSend("/topic/updates", arg);
        }
    }
}