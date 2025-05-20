import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {PurchaseVAT} from '@/model/types/accounting/type';

export function exportPvatToExcel(data: PurchaseVAT[]) {
    // 1. 데이터 매핑: PurchaseVAT 배열을 엑셀에 적합한 객체 배열로 변환
    const excelData = data.map(item => ({
        분류: item.categorySelection,
        날짜: item.date,  // 필요하면 dayjs로 포맷 적용 가능
        상호명: item.customerName,
        사업자등록번호: item.businessNumber,
        금액: item.amount,
        부가세: item.vat,
        합계: item.total,
        비고: item.note,
    }));

    // 2. 워크시트 생성
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // 3. 워크북 생성 및 워크시트 추가
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '매입부가세');

    // 4. 워크북을 엑셀 파일 버퍼로 변환
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

    // 5. Blob 생성 및 저장
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `매입부가세_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
