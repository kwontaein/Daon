package com.example.daon.customer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AffiliationResponse {
    private UUID customerAffiliationId;
    private String customerAffiliationName;
}
