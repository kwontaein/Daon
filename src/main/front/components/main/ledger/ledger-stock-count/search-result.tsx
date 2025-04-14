import { useScreenMode } from '@/hooks/share/useScreenMode';
import '../ledger-search-result.scss';

import {  ResponseLedgerStock } from "@/model/types/ledger/type";
import dayjs from "dayjs";
import { useMemo } from 'react';



export default function LedgerStockCountSearchResult({searchInfo} : {
    searchInfo: {
        searchResult: ResponseLedgerStock[],
        searchTitle: string
    }
}) {
    const mid = Math.ceil(searchInfo.searchResult.length / 2);
    const [firstLedgerStock, secondLedgerStock] = [searchInfo.searchResult.slice(0,mid), searchInfo.searchResult.slice(mid)]
    const mode = useScreenMode({tabletSize:800, mobileSize:640})

    // const totalResult = useMemo(()=>
    //     searchInfo.searchResult.reduce((prev,next)=>{
    //         const {total, quantity, outPrice} = prev
    //         return {
    //             total: total+next.totalPrice,
    //             quantity: quantity+next.quantity,
    //             outPrice: outPrice+next.outPrice,
    //         }
    //     }, {total:0, quantity:0, outPrice:0})
    
    // ,[searchInfo])
    
    const originalStockResult = useMemo(()=>
        searchInfo.searchResult.map((stock,idx)=>(
            <tr key={idx}>
                <td>{stock.productName+" ["+(stock.modelName??'-')+"]"}</td>
                <td className='right-align'>{(stock.inPrice??0).toLocaleString('kr-KO')}</td>
                <td className='right-align'>{(stock.outPrice??0).toLocaleString('kr-KO')}</td>
                <td>{stock.quantity}</td>
            </tr>
        ))
    ,[searchInfo])

    const firstSliceStockResult = useMemo(()=>
        firstLedgerStock.map((stock,idx)=>(
            <tr key={idx}>
                <td>{stock.productName+" ["+(stock.modelName??'-')+"]"}</td>
                <td className='right-align'>{(stock.inPrice??0).toLocaleString('kr-KO')}</td>
                <td className='right-align'>{(stock.outPrice??0).toLocaleString('kr-KO')}</td>
                <td>{stock.quantity}</td>
            </tr>
        ))
    ,[firstLedgerStock])

    const secondSliceStockResult = useMemo(()=>
        secondLedgerStock.map((stock,idx)=>(
            <tr key={idx}>
                <td>{stock.productName+" ["+(stock.modelName??'-')+"]"}</td>
                <td className='right-align'>{(stock.inPrice??0).toLocaleString('kr-KO')}</td>
                <td className='right-align'>{(stock.outPrice??0).toLocaleString('kr-KO')}</td>
                <td>{stock.quantity}</td>
            </tr>
        ))
    ,[secondLedgerStock])

    return(
        <>
        <h3 className='ledger-title'>{searchInfo.searchTitle}</h3>
        <div className='ledger-date-container'>{`Date : ${dayjs(new Date()).format('YYYY.MM.DD')}, Tel: ,Fax:`}</div>
        <div className={mode==='pc'? 'ledger-grid-table-container' :''}>
            <table className='ledger-search-result-table'>
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
                {(searchInfo.searchResult.length>2 && mode==='pc') ? firstSliceStockResult : originalStockResult}

                </tbody>
            </table>
            {(searchInfo.searchResult.length>2 && mode==='pc')&&
                <table className='ledger-search-result-table'>
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
        </>
    )
}