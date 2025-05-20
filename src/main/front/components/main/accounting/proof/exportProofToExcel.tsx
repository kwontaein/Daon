import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {ExpenseProof} from '@/model/types/accounting/type';
import dayjs from 'dayjs';

export function exportProofToExcel(data: ExpenseProof[]) {
    const excelData = data.map(item => ({
        분류: item.categorySelection,
        날짜: dayjs(item.date).format('YY.MM.DD'),
        상호명: item.customerName,
        카드사: item.cardCompany,
        금액: item.amount,
        부가세: item.vat,
        합계: item.total,
        비고: item.note || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '증빙서류');

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `증빙서류_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
