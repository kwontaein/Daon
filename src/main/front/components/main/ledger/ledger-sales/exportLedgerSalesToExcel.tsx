import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import {ResponseLedger} from "@/model/types/ledger/type";
import {ReceiptCategoryEnum} from '@/model/types/sales/receipt/type';

export function exportLedgerSalesToExcel(data: ResponseLedger[], sheetName: string, fileName: string) {
    const safeSheetName = sheetName.length > 31 ? sheetName.slice(0, 31) : sheetName;

    const sheetData = [
        ['날짜', '계정', '거래처', '품명', '규격', '적요', '수량', '단가', '합계금액'],
        ...data.map(item => [
            dayjs(item.timeStamp).format('YYYY-MM-DD'),
            ReceiptCategoryEnum[item.category],
            item.customerName,
            item.productName,
            item.modelName ?? '-',
            item.description ?? '',
            item.quantity,
            item.outPrice,
            item.totalPrice
        ])
    ];

    const totalRow = [
        '총계', '', '', '', '', '',
        data.reduce((sum, i) => sum + i.quantity, 0),
        data.reduce((sum, i) => sum + i.outPrice, 0),
        data.reduce((sum, i) => sum + i.totalPrice, 0)
    ];

    sheetData.push(totalRow);

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
