package com.example.daon.estimate.controller;

import com.example.daon.estimate.dto.request.EstimateRequest;
import com.example.daon.estimate.dto.response.EstimateResponse;
import com.example.daon.estimate.service.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public List<EstimateResponse> getEstimates(@RequestBody EstimateRequest request) {
        return estimateService.getEstimates(request.getSearchSDate(), request.getSearchEDate(), request.getCustomerName(), request.getProductName());
    }

    @PostMapping("api/getEstimate")
    public EstimateResponse getEstimate(@RequestBody EstimateRequest request) {
        return estimateService.getEstimate(request.getEstimateId());
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

    @PostMapping("api/saveEstimate")
    public void saveEstimate(@RequestBody EstimateRequest request) {
        System.out.println(request);
        estimateService.saveEstimate(request);
    }

}
