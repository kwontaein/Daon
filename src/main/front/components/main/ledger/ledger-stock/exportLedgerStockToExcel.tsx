import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import {ResponseLedger} from "@/model/types/ledger/type";
import {ReceiptCategoryEnum} from '@/model/types/sales/receipt/type';

export function exportStockLedgerToExcel(
    searchResult: ResponseLedger[],
    title: string,
    searchStartDate: Date
) {
    const worksheetData = [];

    // 헤더
    worksheetData.push([
        '날짜',
        '계정',
        '거래처',
        '적요',
        '단가',
        '판매수량',
        '매입수량',
        '반입',
        '반출',
        '재고',
        '금액',
    ]);

    let inventory = 0;
    let total = {
        sales: 0,
        purchase: 0,
        returnOut: 0,
        returnIn: 0,
        totalPrice: 0,
    };

    // 전기이월 (시작)
    worksheetData.push([
        dayjs(searchStartDate).format('YY.MM.DD'),
        '',
        '<전 기 이 월>',
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        '',
    ]);

    searchResult.forEach((ledger) => {
        const category = ReceiptCategoryEnum[ledger.category];

        // 수량 및 금액 계산
        if (['SALES', 'PURCHASE_DISCOUNT'].includes(category)) {
            total.purchase += ledger.quantity;
            total.totalPrice += ledger.totalPrice;
            inventory -= ledger.quantity;
        } else if (['PURCHASE', 'SALES_DISCOUNT'].includes(category)) {
            total.sales += ledger.quantity;
            total.totalPrice -= ledger.totalPrice;
            inventory += ledger.quantity;
        } else if (category === 'RETURN_OUT') {
            total.returnOut += ledger.quantity;
            total.totalPrice += ledger.totalPrice;
            inventory -= ledger.quantity;
        } else if (category === 'RETURN_IN') {
            total.returnIn += ledger.quantity;
            total.totalPrice -= ledger.totalPrice;
            inventory += ledger.quantity;
        }

        worksheetData.push([
            dayjs(ledger.timeStamp).format('YY.MM.DD'),
            category,
            ledger.customerName,
            ledger.description,
            ledger.outPrice,
            ['SALES', 'PURCHASE_DISCOUNT'].includes(category) ? ledger.quantity : '',
            ['PURCHASE', 'SALES_DISCOUNT'].includes(category) ? ledger.quantity : '',
            category === 'RETURN_IN' ? ledger.quantity : '',
            category === 'RETURN_OUT' ? ledger.quantity : '',
            inventory,
            (['PURCHASE', 'SALES_DISCOUNT', 'RETURN_IN'].includes(category) ? '-' : '') + ledger.totalPrice,
        ]);
    });

    // 총계 행
    worksheetData.push([
        '총계',
        '',
        '',
        '',
        '',
        total.purchase,
        total.sales,
        total.returnIn,
        total.returnOut,
        inventory,
        total.totalPrice,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);

    // 파일 저장
    XLSX.writeFile(workbook, `${title}_${dayjs().format('YYYYMMDD')}.xlsx`);
}
