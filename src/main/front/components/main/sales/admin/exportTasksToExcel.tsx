import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {ResponseTask} from '@/model/types/sales/task/type';
import dayjs from 'dayjs';

export function exportAdminTasksToExcel(tasks: ResponseTask[]) {
    const worksheetData = tasks.map(task => ({
        '구분': task.taskType,
        '접수일': dayjs(task.createdAt).format('YYYY-MM-DD HH:mm'),
        '조치일': task.completeAt ? dayjs(task.completeAt).format('YYYY-MM-DD HH:mm') : '',
        '거래처': task.customer.customerName,
        '의뢰자': task.requesterName,
        '담당자': task.assignedUser.name,
        '연락처': [task.requesterContact, task.requesterContact2].filter(Boolean).join('\n'),
        '모델': task.model || '',
        '내용': task.details || '-'
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '업무 목록');

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `업무목록_${getToday()}.xlsx`);
}

function getToday(): string {
    return dayjs().format('YYYYMMDD');
}
