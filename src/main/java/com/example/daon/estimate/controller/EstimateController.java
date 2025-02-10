package com.example.daon.estimate.controller;

import com.example.daon.estimate.dto.request.EstimateRequest;
import com.example.daon.estimate.service.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 판매회계
 **/
@RestController
@RequiredArgsConstructor
public class EstimateController {
    private final EstimateService estimateService;

    //견적서관리-----------------------------------
    @PostMapping("api/getEstimates")
    public void getEstimates(@RequestBody EstimateRequest request) {
        estimateService.getEstimates(request.getSearchSDate(), request.getSearchEDate(), request.getCustomerName(), request.getItemName());
    }

    //수정
    @PostMapping("api/updateEstimate")
    public void updateEstimate(@RequestBody EstimateRequest request) {
        estimateService.updateTest(request);
    }

    //전표전환
    @PostMapping("api/estimatesPaid")
    public void estimatesPaid(@RequestBody EstimateRequest request) {
        estimateService.estimatesPaid(request);
    }


}
