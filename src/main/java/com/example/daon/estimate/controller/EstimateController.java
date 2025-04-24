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
    //견적서 목록 조회
    @PostMapping("api/getEstimates")
    public List<EstimateResponse> getEstimates(@RequestBody EstimateRequest estimateRequest) {
        return estimateService.getEstimates(estimateRequest);
    }

    //단일조회
    @PostMapping("api/getEstimate")
    public EstimateResponse getEstimate(@RequestBody EstimateRequest estimateRequest) {
        return estimateService.getEstimate(estimateRequest.getEstimateId());
    }

    //수정
    @PostMapping("api/updateEstimate")
    public void updateEstimate(@RequestBody EstimateRequest estimateRequest) {
        estimateService.updateEstimate(estimateRequest);
    }

    //전표전환
    @PostMapping("api/estimatesPaid")
    public void estimatesPaid(@RequestBody EstimateRequest estimateRequest) {
        estimateService.toggleEstimateReceiptStatus(estimateRequest);
    }

    //견적서저장
    @PostMapping("api/saveEstimate")
    public void saveEstimate(@RequestBody EstimateRequest estimateRequest) {
        estimateService.saveEstimate(estimateRequest);
    }

    //삭제
    @PostMapping("api/deleteEstimate")
    public void deleteEstimate(@RequestBody EstimateRequest estimateRequest) {
        estimateService.deleteEstimate(estimateRequest.getEstimateId());
    }
}
