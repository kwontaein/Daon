import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {ProcurementSettlement} from '@/model/types/accounting/type';
import dayjs from "dayjs";

export function exportPsetToExcel(data: ProcurementSettlement[]) {
    // 1. 데이터를 엑셀에 맞게 매핑
    const excelData = data.map(item => ({
        분류: item.categorySelection,
        날짜: item.date,  // 필요시 dayjs(item.date).format('YY.MM.DD')로 변환 가능
        상호명: item.customerName,
        모델명: item.modelName,
        매입처: item.vendor,
        인수: item.acceptance ? dayjs(item.acceptance).format('YY.MM.DD') : '-',
        수량: item.quantity,
        설치: item.installation,
        결제: item.payment,
        메모: item.memo,
    }));

    // 2. 워크시트 생성
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // 3. 워크북 생성 및 워크시트 추가
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '조달정산');

    // 4. 엑셀 파일 버퍼 생성
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

    // 5. Blob으로 변환 후 저장
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `조달정산_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
