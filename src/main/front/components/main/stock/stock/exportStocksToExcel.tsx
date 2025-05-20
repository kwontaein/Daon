import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {ResponseStock} from '@/model/types/stock/stock/types';

export function exportStocksToExcel(stocks: ResponseStock[]) {
    const worksheetData = stocks.map((stock) => ({
        '분류': stock.category?.stockCateName || '',
        '품명': stock.productName,
        '규격': stock.modelName,
        '재고': stock.quantity,
        '출고가': stock.outPrice.toLocaleString('ko-KR'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '재고 목록');

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `재고목록_${getToday()}.xlsx`);
}

function getToday(): string {
    const now = new Date();
    return now.toISOString().split('T')[0].replace(/-/g, '');
}
