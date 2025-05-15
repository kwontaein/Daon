package com.example.daon.admin.dto.response;

import com.example.daon.admin.model.ClassType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminCookie {
    private String userId;

    //이름
    private String name;

    //직위 -> enum
    private ClassType userClass;

    //부서 -> enum
    private String deptName;
}
