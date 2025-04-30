import { useScreenMode } from '@/hooks/share/useScreenMode';
import '@/styles/table-style/search-result.scss';

import {  ResponseLedgerStock, ResponseStockCountResult } from "@/model/types/ledger/type";
import dayjs from "dayjs";
import { useMemo } from 'react';



export default function LedgerStockCountSearchResult({searchInfo} : {
    searchInfo: {
        searchResult: ResponseStockCountResult,
        searchTitle: string
    }
}) {
    const mid = Math.ceil(searchInfo.searchResult.stockLedgerResponses.length / 2);
    const [firstLedgerStock, secondLedgerStock] = [searchInfo.searchResult.stockLedgerResponses.slice(0,mid), searchInfo.searchResult.stockLedgerResponses.slice(mid)]
    const mode = useScreenMode({tabletSize:800, mobileSize:640})

    
    const originalStockResult = useMemo(()=>
        searchInfo.searchResult.stockLedgerResponses.map((stock,idx)=>(
            <tr key={idx}>
                <td>{stock.productName+" ["+(stock.modelName??'-')+"]"}</td>
                <td className='right-align'>{(stock.inPrice??0).toLocaleString('ko-KR')}</td>
                <td className='right-align'>{(stock.outPrice??0).toLocaleString('ko-KR')}</td>
                <td>{stock.quantity}</td>
            </tr>
        ))
    ,[searchInfo])

    const firstSliceStockResult = useMemo(()=>
        firstLedgerStock.map((stock,idx)=>(
            <tr key={idx}>
                <td>{stock.productName+" ["+(stock.modelName??'-')+"]"}</td>
                <td className='right-align'>{(stock.inPrice??0).toLocaleString('ko-KR')}</td>
                <td className='right-align'>{(stock.outPrice??0).toLocaleString('ko-KR')}</td>
                <td>{stock.quantity}</td>
            </tr>
        ))
    ,[firstLedgerStock])

    const secondSliceStockResult = useMemo(()=>
        secondLedgerStock.map((stock,idx)=>(
            <tr key={idx}>
                <td>{stock.productName+" ["+(stock.modelName??'-')+"]"}</td>
                <td className='right-align'>{(stock.inPrice??0).toLocaleString('ko-KR')}</td>
                <td className='right-align'>{(stock.outPrice??0).toLocaleString('ko-KR')}</td>
                <td>{stock.quantity}</td>
            </tr>
        ))
    ,[secondLedgerStock])

    return(
        <>
        {mode &&
        <>
            <h3 className='search-title'>{searchInfo.searchTitle}</h3>
            <div className='search-date-container'>{`Date : ${dayjs(new Date()).format('YYYY.MM.DD')}, Tel: ,Fax:`}</div>
            <div className={mode==='pc'? 'grid-table-container' :''}>
                <table className='search-result-table'>
                    <colgroup>
                        <col style={{width: "40%"}}/>    
                        <col style={{width: "20%"}}/>    
                        <col style={{width: "20%"}}/>    
                        <col style={{width: "20%"}} />   
                    </colgroup>
                    <thead>
                        <tr>
                            <td>품명</td>
                            <td>입고가</td>
                            <td>소비가</td>
                            <td>재고</td>
                        </tr>
                    </thead>
                    <tbody>
                    {(searchInfo.searchResult.stockLedgerResponses.length>2 && mode==='pc') ? firstSliceStockResult : originalStockResult}
    
                    </tbody>
                </table>
                {(searchInfo.searchResult.stockLedgerResponses.length>2 && mode==='pc')&&
                    <table className='search-result-table'>
                    <colgroup>
                        <col style={{width: "20%"}}/>    
                        <col style={{width: "30%"}}/>    
                        <col style={{width: "30%"}}/>    
                        <col style={{width: "10%"}} />   
                    </colgroup>
                    <thead>
                        <tr>
                            <td>품명</td>
                            <td>입고가</td>
                            <td>소비가</td>
                            <td>재고</td>
                        </tr>
                    </thead>
                    <tbody>
                    {secondSliceStockResult}
                    </tbody>
                </table>
                }
                </div>
                <table className='search-result-table'>
                    <tbody>
                        <tr className='none-hover' style={{borderBottom:'none'}}>
                            <td>총계</td>
                            <td><b>{'재고 총 합계 : ' +searchInfo.searchResult.totalAmount.toLocaleString('ko-KR')}</b></td>
                            <td className='right-align'><b>{'재고 총 수량 : ' +searchInfo.searchResult.totalQuantity.toLocaleString('ko-KR')}</b></td>
                        </tr>
                    </tbody>
                </table>
        </>
        }
        </>
    )
}