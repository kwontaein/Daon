import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import dayjs from 'dayjs';
import {ResponseCustomer, CustomerCateEnum} from '@/model/types/customer/customer/type';

export function exportCustomersToExcel(customers: ResponseCustomer[]) {
    const worksheetData = customers.map(customer => ({
        '구분': customer.affiliationName,
        '분류': CustomerCateEnum[customer.category],
        '상호명': customer.customerName,
        '전화': customer.phoneNumber,
        'FAX': customer.fax || '',
        '담당': customer.etc || '',
        //'현잔액': customer.?.toLocaleString() ?? '', // 예: 숫자 형식
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '거래처 목록');

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `거래처목록_${getToday()}.xlsx`);
}

function getToday(): string {
    return dayjs().format('YYYYMMDD');
}
