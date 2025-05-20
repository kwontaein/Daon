import '@/styles/table-style/search-result.scss';

import {ResponseLedger} from "@/model/types/ledger/type";
import {ResponseOfficial} from "@/model/types/sales/official/type";
import {ReceiptCategoryEnum} from "@/model/types/sales/receipt/type";
import dayjs from "dayjs";
import {useMemo} from "react";
import {exportLedgerToExcel} from "@/components/main/ledger/ledger-official/exportLedgerToExcel";


export default function LedgerOfficialSearchResult({searchInfo, officials, totalResult}: {
    searchInfo: {
        searchResult: ResponseLedger[],
        searchTitle: string
    },
    officials: ResponseOfficial[],
    totalResult: { total: number, quantity: number, outPrice: number, officialTotal: { [p: string]: number } },
}) {
    const mid = Math.ceil(officials.length / 2);
    const [firstOfficial, secondOfficial] = [officials.slice(0, mid), officials.slice(mid)]


    return (
        <>
            <h3 className='search-title'>{searchInfo.searchTitle}</h3>
            <div
                className='search-date-container'>{`Date : ${dayjs(new Date()).format('YYYY.MM.DD')}, Tel: ,Fax:`}</div>
            <table className='search-result-table'>
                <colgroup>
                    <col style={{width: "5%"}}/>
                    <col style={{width: "10%"}}/>
                    <col style={{width: "25%"}}/>
                    <col style={{width: "50%"}}/>
                    <col style={{width: "15%"}}/>
                </colgroup>
                <thead>
                <tr>
                    <td>날짜</td>
                    <td>계정</td>
                    <td>품명</td>
                    <td>적요</td>
                    <td>합계금액</td>
                </tr>
                </thead>
                <tbody>
                {searchInfo.searchResult.map((ledger) => (
                    <tr key={ledger.receiptId}>
                        <td>{dayjs(ledger.timeStamp).format('YY.MM.DD')}</td>
                        <td>{ReceiptCategoryEnum[ledger.category]}</td>
                        <td>{ledger.officialName}</td>
                        <td>{ledger.description}</td>
                        <td className='right-align'>{ledger.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                ))}
                <tr className='none-hover' style={{borderBottom: 'none'}}>
                    <td>총계</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='right-align'><b>{totalResult.total.toLocaleString('ko-KR')}</b></td>
                </tr>
                </tbody>
            </table>
            <div className="grid-table-container">
                <table className='search-result-table'>
                    <thead>
                    <tr>
                        <td>품명</td>
                        <td>합계금액</td>
                    </tr>
                    </thead>
                    <tbody>
                    {firstOfficial.map(({officialId, officialName}) => (
                        <tr className='none-hover' key={officialId}>
                            <td>{officialName}</td>
                            <td className='right-align'>{totalResult.officialTotal[officialId].toLocaleString('ko-KR')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <table className='search-result-table'>
                    <thead>
                    <tr>
                        <td>품명</td>
                        <td>합계금액</td>
                    </tr>
                    </thead>
                    <tbody>
                    {secondOfficial.map(({officialId, officialName}) => (
                        <tr className='none-hover' key={officialId}>
                            <td>{officialName}</td>
                            <td className='right-align'>{totalResult.officialTotal[officialId].toLocaleString('ko-KR')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}