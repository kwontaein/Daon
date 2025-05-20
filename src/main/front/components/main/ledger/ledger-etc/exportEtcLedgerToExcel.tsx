import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {ResponseLedger} from '@/model/types/ledger/type';
import {ReceiptCategoryEnum} from '@/model/types/sales/receipt/type';
import dayjs from 'dayjs';

export function exportLedgerEtcToExcel(ledgerList: ResponseLedger[], title: string = "기타관리비원장") {
    if (!ledgerList || ledgerList.length === 0) {
        alert('엑셀로 변환할 데이터가 없습니다.');
        return;
    }

    const excelData = ledgerList.map(item => ({
        날짜: dayjs(item.timeStamp).format('YYYY-MM-DD'),
        계정: ReceiptCategoryEnum[item.category],
        거래처: item.customerName,
        품명: `${item.productName ?? ""}${(item.productName ?? "") && '[' + (item.modelName ?? '-') + ']'}`,
        적요: item.description,
        수량: item.quantity,
        단가: item.outPrice,
        합계금액: item.totalPrice,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, `${title}_${dayjs().format('YYYYMMDD')}.xlsx`);
}
