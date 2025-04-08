package com.example.daon.accounting.procurement.controller;

import com.example.daon.accounting.procurement.dto.request.ProcurementRequest;
import com.example.daon.accounting.procurement.service.ProcurementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProcurementController {

    private final ProcurementService procurementService;

    //조달 및 수의 계산정산
    @PostMapping("api/saveProcurement")
    public void saveProcurement(@RequestBody ProcurementRequest procurementRequest) {
        procurementService.saveProcurement(procurementRequest);
    }

    @PostMapping("api/updateProcurement")
    public void updateProcurement(@RequestBody ProcurementRequest procurementRequest) {
        procurementService.updateProcurement(procurementRequest);
    }

    @PostMapping("api/deleteProcurement")
    public void deleteProcurement(@RequestBody ProcurementRequest procurementRequest) {
        procurementService.deleteProcurement(procurementRequest);

    }

    @PostMapping("api/getProcurement")
    public void getProcurement(@RequestBody ProcurementRequest procurementRequest) {
        procurementService.getProcurement(procurementRequest);

    }
    
}
