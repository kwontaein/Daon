package com.example.daon.official.model;

import com.example.daon.official.dto.request.OfficialRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "official")
public class OfficialEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "official_id", columnDefinition = "BINARY(16)")
    private UUID officialId; // 아이디 - uuid

    @Column(nullable = false, name = "official_name")
    private String officialName; // 품목명

    public void updateFromRequest(OfficialRequest request) {
        this.officialId = request.getOfficialId();
        this.officialName = request.getOfficialName();
    }
}
