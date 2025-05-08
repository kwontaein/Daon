package com.example.daon.calendar.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.calendar.dto.request.CalendarRequest;
import com.example.daon.calendar.dto.response.CalendarResponse;
import com.example.daon.calendar.model.CalendarEntity;
import com.example.daon.calendar.repository.CalendarRepository;
import com.example.daon.global.service.GlobalService;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final CalendarRepository calendarRepository;
    private final GlobalService globalService;

    public List<CalendarResponse> getSchedules(CalendarRequest calendarRequest) {
        List<CalendarEntity> calendarEntities = calendarRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            if (calendarRequest.getUserId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("userId"), calendarRequest.getUserId()));
            }

            Integer year = calendarRequest.getYear();
            if (year == null || year == 0) {
                year = LocalDate.now().getMonthValue();
            }
            Expression<Integer> yearExpress = criteriaBuilder.function("year", Integer.class, root.get("date"));
            predicates.add(criteriaBuilder.equal(yearExpress, year));

            query.orderBy(criteriaBuilder.desc(root.get("date")));
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return calendarEntities.stream().map(globalService::convertToCalendarResponse).collect(Collectors.toList());
    }

    @Transactional
    public void saveSchedules(CalendarRequest calendarRequest) {
        UserEntity user = globalService.resolveUser(null);

        List<CalendarEntity> calendarEntities = calendarRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (calendarRequest.getUserId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("userId"), calendarRequest.getUserId()));
            }

            if (calendarRequest.getDate() != null) {
                predicates.add(criteriaBuilder.equal(root.get("date"), calendarRequest.getDate()));
            }

            query.orderBy(criteriaBuilder.desc(root.get("date")));
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        // 내용이 공백일 경우 (== 비어있으면) 처리: 업데이트도 저장도 하지 않음
        boolean isContentEmpty = calendarRequest.getMemo() == null || calendarRequest.getMemo().trim().isEmpty();

        if (!calendarEntities.isEmpty()) {
            CalendarEntity existingEntity = calendarEntities.get(0);

            if (isContentEmpty) {
                // 기존 일정 삭제
                calendarRepository.delete(existingEntity);
            } else {
                // 내용이 있으면 수정
                existingEntity.updateFromRequest(calendarRequest);
                calendarRepository.save(existingEntity);
            }
        } else {
            if (!isContentEmpty) {
                // 기존 일정 없고 내용이 있으면 저장
                calendarRepository.save(calendarRequest.toEntity(user));
            }
        }
    }
}
