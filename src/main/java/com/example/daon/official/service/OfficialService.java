package com.example.daon.official.service;

import com.example.daon.official.dto.request.OfficialRequest;
import com.example.daon.official.model.OfficialEntity;
import com.example.daon.official.repository.OfficialRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OfficialService {
    private final OfficialRepository officialRepository;

    public void saveOfficial(OfficialRequest request) {
        OfficialEntity official = officialRepository.save(request.toEntity());
        request.setOfficialId(official.getOfficialId());
    }

    public List<OfficialEntity> getOfficial(OfficialRequest request) {
        return officialRepository.findAll(((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (request.getOfficialName() != null) {
                predicates.add(criteriaBuilder.like(root.get("officialName"), '%' + request.getOfficialName() + '%'));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }));
    }

    public void deleteOfficial(OfficialRequest request) {
        officialRepository.deleteById(request.getOfficialId());
    }

    public void updateOfficial(List<OfficialRequest> requests) {
        for (OfficialRequest request : requests) {
            OfficialEntity official = officialRepository.findById(request.getOfficialId()).orElse(null);
            official.updateFromRequest(request);
        }
    }
}
