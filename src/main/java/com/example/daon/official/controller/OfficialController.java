package com.example.daon.official.controller;

import com.example.daon.official.dto.request.OfficialRequest;
import com.example.daon.official.model.OfficialEntity;
import com.example.daon.official.service.OfficialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OfficialController {
    private final OfficialService officialService;

    @PostMapping("api/saveOfficial")
    public void saveOfficial(@RequestBody OfficialRequest officialRequest) {
        officialService.saveOfficial(officialRequest);
    }

    @PostMapping("api/getOfficial")
    public List<OfficialEntity> getOfficial(@RequestBody OfficialRequest officialRequest) {
        return officialService.getOfficial(officialRequest);
    }

    @PostMapping("api/deleteOfficial")
    public void deleteOfficial(@RequestBody OfficialRequest officialRequest) {
        officialService.deleteOfficial(officialRequest);
    }

    @PostMapping("api/updateOfficial")
    public void updateOfficial(@RequestBody List<OfficialRequest> officialRequest) {
        officialService.updateOfficial(officialRequest);

    }
}
