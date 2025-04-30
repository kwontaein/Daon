import '@/styles/table-style/search-result.scss';

import dayjs from "dayjs";
import { ResponseLedger } from "@/model/types/ledger/type";
import { ReceiptCategoryEnum } from '@/model/types/sales/receipt/type';
import { useMemo } from 'react';

export default function LedgerEtcSearchResult({searchInfo}:{searchInfo:{searchResult:ResponseLedger[], searchTitle:string}}){
    
    const totalResult = useMemo(()=>
        searchInfo.searchResult.reduce((prev,next)=>{
            const {total, quantity} = prev
            return {
                total: total+next.totalPrice,
                quantity: quantity+next.quantity,
            }
        }, {total:0, quantity:0})
    
    ,[searchInfo])
    
    return(
        <>
        <h3 className='search-title'>{searchInfo.searchTitle}</h3>
        <div className='search-date-container'>{`Date : ${dayjs(new Date()).format('YYYY.MM.DD')}, Tel: ,Fax:`}</div>
        <table className='search-result-table'>
            <colgroup>
                  <col style={{width: "1%"}}/>    
                  <col style={{width: "5%" , minWidth:'35px'}}/>    
                  <col style={{width: "15%"}}/>    
                  <col style={{width: "15%"}} />   
                  <col style={{width: "10%"}}/>    
                  <col style={{width: "10%"}}/>    
                  <col style={{width: "5%", minWidth:'65px'}}/>    
                  <col style={{width: "10%", minWidth:'65px'}}/>   
                  <col style={{width: "10%", minWidth:'60px'}}/>    
            </colgroup>
            <thead>
                <tr>
                    <td>날짜</td>
                    <td>계정</td>
                    <td>거래처</td>
                    <td>품명</td>
                    <td>적요</td>
                    <td>수량</td>
                    <td>단가</td>
                    <td>합계금액</td>
                </tr>
            </thead>
            <tbody>
                {searchInfo.searchResult.map((ledger)=>(
                    <tr key={ledger.receiptId}>
                        <td>{dayjs(ledger.timeStamp).format('YY.MM.DD')}</td>
                        <td>{ReceiptCategoryEnum[ledger.category]}</td>
                        <td className='left-align'>{ledger.customerName}</td>
                        <td>{ledger.productName + "["+(ledger.modelName??'-')+"]"}</td>
                        <td>{ledger.description}</td>
                        <td>{ledger.quantity.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{ledger.outPrice.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{ledger.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                ))}
                <tr className='none-hover' style={{borderBottom:'none'}}>
                    <td>총계</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><b>{totalResult.quantity.toLocaleString('ko-KR')}</b></td>
                    <td></td>
                    <td className='right-align'><b>{totalResult.total.toLocaleString('ko-KR')}</b></td>
                </tr>
            </tbody>
        </table>
        </>
    )
}