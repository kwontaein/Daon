import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {SalesVAT} from '@/model/types/accounting/type';

export function exportSvatToExcel(data: SalesVAT[]) {
    const excelData = data.map((item) => ({
        분류: item.categorySelection,
        날짜: item.date,
        입금날짜: item.paidDate || '-',
        상호명: item.customerName,
        사업자등록번호: item.businessNumber,
        결제내역: item.paymentDetails,
        금액: item.amount,
        부가세: item.vat,
        합계: item.total,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '매출부가세');

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `매출부가세_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
