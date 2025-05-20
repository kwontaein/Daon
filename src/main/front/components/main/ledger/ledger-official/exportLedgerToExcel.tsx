import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import dayjs from "dayjs";
import {ResponseLedger} from "@/model/types/ledger/type";
import {ResponseOfficial} from "@/model/types/sales/official/type";
import {ReceiptCategoryEnum} from "@/model/types/sales/receipt/type";

export function exportLedgerToExcel(
    searchResult: ResponseLedger[],
    totalOfficial: Record<number, number>,
    officials: ResponseOfficial[]
) {
    const mainSheetData = [
        ["날짜", "계정", "거래처", "품명", "적요", "수량", "단가", "합계금액",],
        ...searchResult.map(item => [
            dayjs(item.timeStamp).format("YY.MM.DD"),
            ReceiptCategoryEnum[item.category],
            item.officialName,
            item.description,
            item.totalPrice,
        ])
    ];

    const summarySheetData = [
        ["품명", "합계금액"],
        ...officials.map(off => [
            off.officialName,
            totalOfficial[off.officialId] || 0
        ])
    ];

    const wb = XLSX.utils.book_new();
    const mainSheet = XLSX.utils.aoa_to_sheet(mainSheetData);
    const summarySheet = XLSX.utils.aoa_to_sheet(summarySheetData);

    XLSX.utils.book_append_sheet(wb, mainSheet, "거래 내역");
    XLSX.utils.book_append_sheet(wb, summarySheet, "공급자 합계");

    const wbout = XLSX.write(wb, {bookType: "xlsx", type: "array"});
    const blob = new Blob([wbout], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    saveAs(blob, `관리비원장_${dayjs().format("YYYYMMDD")}.xlsx`);
}