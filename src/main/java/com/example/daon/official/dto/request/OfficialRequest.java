package com.example.daon.official.dto.request;

import com.example.daon.official.model.OfficialEntity;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
@Data
public class OfficialRequest {
    private UUID officialId;
    private String officialName;

    public OfficialEntity toEntity() {
        return OfficialEntity
                .builder()
                .officialName(officialName)
                .build();
    }
}
