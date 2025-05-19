import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import {ResponseStockCountResult} from '@/model/types/ledger/type';

export function exportStockCountToExcel(
    result: ResponseStockCountResult,
    title: string
) {
    const worksheetData = [];

    // 헤더
    worksheetData.push([
        '품명',
        '입고가',
        '소비가',
        '재고 수량',
    ]);

    // 데이터 행
    result.stockLedgerResponses.forEach((stock) => {
        const productName = `${stock.productName} [${stock.modelName ?? '-'}]`;
        worksheetData.push([
            productName,
            stock.inPrice?.toLocaleString('ko-KR') ?? '0',
            stock.outPrice?.toLocaleString('ko-KR') ?? '0',
            stock.quantity,
        ]);
    });

    // 총계
    worksheetData.push([]);
    worksheetData.push([
        '총계',
        '',
        `재고 총 수량: ${result.totalQuantity.toLocaleString('ko-KR')}`,
        `재고 총 합계: ${result.totalAmount.toLocaleString('ko-KR')}`,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);

    XLSX.writeFile(workbook, `${title}_${dayjs().format('YYYYMMDD')}.xlsx`);
}
