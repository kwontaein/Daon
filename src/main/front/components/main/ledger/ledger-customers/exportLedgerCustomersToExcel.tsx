import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {ResponseLedger} from "@/model/types/ledger/type";
import {ReceiptCategoryEnum} from "@/model/types/sales/receipt/type";
import dayjs from "dayjs";

export function exportLedgerCustomersToExcel(
    ledgerList: ResponseLedger[],
    title: string = "거래처원장",
    searchStartDate: Date
) {
    if (!ledgerList || ledgerList.length === 0) {
        alert("엑셀로 변환할 데이터가 없습니다.");
        return;
    }

    // 날짜순 정렬
    const sorted = [...ledgerList].sort((a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime());

    let balance = 0;
    const excelData = sorted.map(item => {
        const category = ReceiptCategoryEnum[item.category];
        const isSales = ['매출', '매입할인', '출금', '반품출고'].includes(category);
        const isPurchase = ['매입', '매출할인', '입금', '반품입고'].includes(category);

        if (isSales) {
            balance += item.totalPrice;
        } else {
            balance -= item.totalPrice;
        }

        return {
            날짜: dayjs(item.timeStamp).format('YYYY-MM-DD'),
            계정: category,
            상호: item.customerName,
            품목: `${item.productName??''} ${item.modelName ? '['+item.modelName+']' : ''}`,
            수량: item.quantity,
            단가: item.outPrice,
            판매_출금: isSales ? item.totalPrice : '',
            구매_입금: isPurchase ? item.totalPrice : '',
            매출할인: category === '매출할인' ? item.totalPrice : '',
            매입할인: category === '매입할인' ? item.totalPrice : '',
            잔액: balance,
            비고: item.description ?? '',
        };
    });

    // 전기이월 행 추가
    const openingRow = {
        날짜: dayjs(searchStartDate).format('YYYY-MM-DD'),
        계정: '',
        상호: '<전기이월>',
        품목: '',
        수량: '',
        단가: '',
        판매_출금: '',
        구매_입금: '',
        매출할인: '',
        매입할인: '',
        잔액: 0,
        비고: '',
    };

    const sheetData = [openingRow, ...excelData];

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();

// 시트 이름 안전하게 처리
    const sanitizedSheetName = title.replace(/[\\/?*\[\]:]/g, '').substring(0, 31);
    XLSX.utils.book_append_sheet(workbook, worksheet, sanitizedSheetName);

    const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${title}_${dayjs().format('YYYYMMDD')}.xlsx`);
}
