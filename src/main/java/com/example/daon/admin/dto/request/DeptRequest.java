package com.example.daon.admin.dto.request;

import com.example.daon.admin.model.DeptEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeptRequest {
    private UUID deptId;
    private String deptName;

    public DeptEntity toEntity() {
        return DeptEntity.builder().deptId(deptId).deptName(deptName).build();
    }
}
