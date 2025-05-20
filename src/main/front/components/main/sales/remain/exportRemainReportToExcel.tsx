import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import {ResponseRemain} from "@/model/types/sales/remain/type";

export function exportRemainReportToExcel(remainList: ResponseRemain[]) {
    const worksheetData = [];

    // 1. 헤더 작성
    worksheetData.push([
        '상호명',
        '전기이월',
        '매출',
        '수금',
        '매입',
        '지급',
        '매출할인',
        '매입할인',
        '잔액',
    ]);

    // 2. 데이터 행
    remainList.forEach(remain => {
        worksheetData.push([
            remain.customerName,
            remain.previousBalance ?? 0,
            remain.sales ?? 0,
            remain.deposit ?? 0,
            remain.purchase ?? 0,
            remain.withdrawal ?? 0,
            remain.salesDC ?? 0,
            remain.purchaseDC ?? 0,
            remain.currentBalance ?? 0,
        ]);
    });

    // 3. 시트 생성 및 저장
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '거래처별 잔액 명세서');

    XLSX.writeFile(workbook, `거래처별_잔액명세서_${dayjs().format('YYYYMMDD_HHmmss')}.xlsx`);
}
