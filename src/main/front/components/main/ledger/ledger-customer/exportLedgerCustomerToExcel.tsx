import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {ResponseLedger} from "@/model/types/ledger/type";
import dayjs from "dayjs";

export function exportLedgerCustomerToExcel(
    title: string,
    ledgers: ResponseLedger[]
) {
    if (!ledgers.length) return;

    // 🧠 엑셀 시트 이름은 31자 이하여야 함
    const sheetName = title.length > 31 ? title.slice(0, 31) : title;

    // 📊 헤더 정의
    const headers = [
        "날짜",
        "계정",
        "품목",
        "수량",
        "단가",
        "판매/출금",
        "구매/입금",
        "매출할인",
        "매입할인",
        "잔액",
        "결제일",
        "메모"
    ];

    // 📋 데이터 구성
    let balance = 0;

    const rows = ledgers.map((ledger) => {
        const category = ledger.category;
        const totalPrice = ledger.totalPrice;
        const isMinus = ['입금', '구매', '매입할인', '입고'].includes(category);

        balance = isMinus ? balance - totalPrice : balance + totalPrice;

        return {
            날짜: dayjs(ledger.timeStamp).format('YYYY-MM-DD'),
            계정: category,
            품목: ledger.productName,
            수량: ledger.quantity,
            단가: ledger.outPrice,
            "판매/출금": ['SALES', 'WITHDRAWAL'].includes(category) ? totalPrice : '',
            "구매/입금": ['PURCHASE', 'DEPOSIT'].includes(category) ? totalPrice : '',
            매출할인: 'SALES_DISCOUNT'.includes(category) ? totalPrice : '',
            매입할인: 'PURCHASE_DISCOUNT'.includes(category) ? totalPrice : '',
            잔액: balance,
            결제일: '',
            메모: ledger.memo || '',
        };
    });

    // 🧾 워크시트 생성
    const worksheet = XLSX.utils.json_to_sheet(rows, {header: headers});

    // 📁 워크북 생성
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // 💾 파일로 저장
    const buffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
    const blob = new Blob([buffer], {type: "application/octet-stream"});

    const fileName = `${title}_${dayjs().format('YYYYMMDD_HHmmss')}.xlsx`;
    saveAs(blob, fileName);
}
