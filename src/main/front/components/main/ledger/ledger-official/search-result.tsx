import '../ledger-search-result.scss';

import { ResponseLedger } from "@/model/types/ledger/type";
import { ResponseOfficial } from "@/model/types/sales/official/type";
import { ReceiptCategoryEnum } from "@/model/types/sales/receipt/type";
import dayjs from "dayjs";
import { useMemo } from "react";



export default function LedgerOfficialSearchResult({searchInfo, officials} : {
    searchInfo: {
        searchResult: ResponseLedger[],
        searchTitle: string
    },
    officials: ResponseOfficial[]
}) {
    const mid = Math.ceil(officials.length / 2);
    const [firstOfficial, secondOfficial] = [officials.slice(0,mid), officials.slice(mid)]

    const officialMap = useMemo(()=>
        Object.fromEntries(officials.map(({officialId})=>[officialId,0]))
    ,[officials])
    
    const totalResult = useMemo(()=>
        searchInfo.searchResult.reduce((prev,next)=>{
            const {total, quantity, outPrice} = prev
            prev.officialTotal[next.officialId] += next.totalPrice
            return {
                total: total+next.totalPrice,
                quantity: quantity+next.quantity,
                outPrice: outPrice+next.outPrice,
                officialTotal :prev.officialTotal
            }
        }, {total:0, quantity:0, outPrice:0, officialTotal:{...officialMap}})
    
    ,[searchInfo])
    

    return(
        <>
        <h3 className='ledger-title'>{searchInfo.searchTitle}</h3>
        <div className='ledger-date-container'>{`Date : ${dayjs(new Date()).format('YYYY.MM.DD')}, Tel: ,Fax:`}</div>
        <table className='ledger-search-result-table'>
            <colgroup>
                  <col style={{width: "5%"}}/>    
                  <col style={{width: "10%"}}/>    
                  <col style={{width: "25%"}}/>    
                  <col style={{width: "50%"}} />   
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
                {searchInfo.searchResult.map((ledger)=>(
                    <tr key={ledger.receiptId}>
                        <td>{dayjs(ledger.timeStamp).format('YY.MM.DD')}</td>
                        <td>{ReceiptCategoryEnum[ledger.category]}</td>
                        <td>{ledger.officialName}</td>
                        <td>{ledger.description}</td>
                        <td className='right-align'>{ledger.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                ))}
                <tr className='none-hover' style={{borderBottom:'none'}}>
                    <td>총계</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='right-align'><b>{totalResult.total.toLocaleString('ko-KR')}</b></td>
                </tr>
            </tbody>
        </table>
        <div className="ledger-grid-table-container">
            <table className='ledger-search-result-table'>
                <thead>
                    <tr>
                        <td>품명</td>
                        <td>합계금액</td>
                    </tr>
                </thead>
                <tbody>
                    {firstOfficial.map(({officialId,officialName})=>(
                        <tr className='none-hover' key={officialId}>
                            <td>{officialName}</td>
                            <td className='right-align'>{totalResult.officialTotal[officialId].toLocaleString('ko-KR')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className='ledger-search-result-table'>
                <thead>
                    <tr>
                        <td>품명</td>
                        <td>합계금액</td>
                    </tr>
                </thead>
                <tbody>
                    {secondOfficial.map(({officialId,officialName})=>(
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