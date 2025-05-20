import * as XLSX from 'xlsx';
import {ResponseTask} from '@/model/types/sales/task/type';
import {saveAs} from 'file-saver';
import dayjs from "dayjs";

export function exportTasksToExcel(tasks: ResponseTask[]) {
    const worksheetData = tasks.map((task) => ({
        '업무 ID': task.taskId,
        '업무 종류': task.taskType,
        '등록일': formatDate(task.createdAt),
        '완료일': task.completeAt ? formatDate(task.completeAt) : '',
        '거래처명': task.customer.customerName,
        '의뢰자': task.requesterName,
        '담당자': task.assignedUser?.name || '미지정',
        '연락처1': task.requesterContact,
        '연락처2': task.requesterContact2 || '',
        '모델': task.model,
        '내용': task.details || '-',
        '비고': task.remarks || '',
        '견적서 여부': task.estimateId ? '작성됨' : '미작성',
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '업무 목록');

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `업무목록_${getToday()}.xlsx`);
}

function formatDate(date: string | Date): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm');
}

function getToday(): string {
    return dayjs().format('YYYYMMDD');
}
