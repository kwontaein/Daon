package com.example.daon.admin.model;

import com.example.daon.admin.dto.request.DeptRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "Dept")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeptEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "dept_id", columnDefinition = "BINARY(16)")
    private UUID deptId;

    @Column(nullable = false, name = "dept_name")
    private String deptName;

    public void updateFromRequest(DeptRequest deptRequest) {
        this.deptName = deptRequest.getDeptName();
    }
}
