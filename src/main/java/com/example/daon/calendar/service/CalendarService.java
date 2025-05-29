package com.example.daon.calendar.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.calendar.dto.request.CalendarRequest;
import com.example.daon.calendar.dto.response.CalendarResponse;
import com.example.daon.calendar.model.CalendarEntity;
import com.example.daon.calendar.repository.CalendarRepository;
import com.example.daon.global.service.ConvertResponseService;
import com.example.daon.global.service.GlobalService;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final CalendarRepository calendarRepository;
    private final ConvertResponseService convertResponseService;
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

        return calendarEntities.stream().map(convertResponseService::convertToCalendarResponse).collect(Collectors.toList());
    }

    @Transactional
    public void saveSchedules(CalendarRequest calendarRequest) {
        UserEntity user = globalService.resolveUser(null);

        boolean isContentEmpty = isEmpty(calendarRequest.getMemo());
        Optional<CalendarEntity> optionalExisting = findExistingSchedule(calendarRequest);

        if (optionalExisting.isPresent()) {
            CalendarEntity existingEntity = optionalExisting.get();
            if (isContentEmpty) {
                calendarRepository.delete(existingEntity);
            } else {
                existingEntity.updateFromRequest(calendarRequest);
                calendarRepository.save(existingEntity);
            }
        } else if (!isContentEmpty) {
            calendarRepository.save(calendarRequest.toEntity(user));
        }
    }

    // 메모가 비어있는지 검사하는 헬퍼
    private boolean isEmpty(String content) {
        return content == null || content.trim().isEmpty();
    }

    // 기존 스케줄 조회
    private Optional<CalendarEntity> findExistingSchedule(CalendarRequest request) {
        List<CalendarEntity> results = calendarRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (request.getUserId() != null) {
                predicates.add(cb.equal(root.get("user").get("userId"), request.getUserId()));
            }

            if (request.getDate() != null) {
                predicates.add(cb.equal(root.get("date"), request.getDate()));
            }

            query.orderBy(cb.desc(root.get("date")));
            return cb.and(predicates.toArray(new Predicate[0]));
        });

        return results.stream().findFirst();
    }
}
