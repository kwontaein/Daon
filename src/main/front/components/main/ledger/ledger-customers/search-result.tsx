import '../ledger-search-result.scss';
import '@/styles/table-style/search-result.scss';

import { ResponseLedger } from "@/model/types/ledger/type";
import { ReceiptCategoryEnum } from "@/model/types/sales/receipt/type";
import dayjs from "dayjs";
import React, { JSX, useMemo, useReducer } from "react";
import { useScreenMode } from '@/hooks/share/useScreenMode';
import { renderLedgerRow, renderMobileLedgerRow, renderMobileSubTotalRow, renderMobileTotalRow, renderSubTotalRow, renderTotalRow, SubTotal, Total, updateSubTotals } from './ledger-result-rows';
type Accumulator = {
  elements: JSX.Element[];
  date: Date;
  balance: number;
  subTotalOfTheDay: SubTotal;
  total: Total;
  ledgerCount: number;
};

  
const initialSubTotal: SubTotal = {
  sales: 0,
  purchase: 0,
  slaes_discount: 0,
  purchase_discount: 0
};

const initialTotal: Total = {
  quntity: 0,
  sales: 0,
  purchase: 0,
  slaes_discount: 0,
  purchase_discount: 0
};


export default function LedgerCustomersSearchResult({searchInfo}:{searchInfo:{searchTitle:string,searchResult:ResponseLedger[],searchSDate:Date}}){
  const screen = useScreenMode({tabletSize:800, mobileSize:620})
  const [mobileView,setMobileView] = useReducer((prev)=>!prev,false)

  const mode =( screen!=='pc' ? screen: (mobileView ? 'tabelt': screen) )
  const resultReducer = useMemo(()=>
  
    searchInfo.searchResult.sort((a,b)=>new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime()).reduce<Accumulator>((prev, ledger, idx) => {
      const category = ReceiptCategoryEnum[ledger.category];
      const isSamePrevDate =  dayjs(prev.date).format('YYYY-MM-DD') === dayjs(ledger.timeStamp).format('YYYY-MM-DD');
      const isSameNextDate =  searchInfo.searchResult.length-1>idx && dayjs(ledger.timeStamp).format('YYYY-MM-DD') === dayjs(searchInfo.searchResult[idx+1].timeStamp).format('YYYY-MM-DD')
      const balance =
        ['매출', '매입할인','출금','반품출고'].includes(category)
          ? prev.balance + ledger.totalPrice
          : prev.balance - ledger.totalPrice;
  
      const { newSub, newTotal } = updateSubTotals(category, ledger.totalPrice, ledger.quantity, (isSamePrevDate || isSameNextDate) ? prev.subTotalOfTheDay : initialSubTotal, prev.total);
      const elements = [...prev.elements];
  
      elements.push( mode==='pc' ? renderLedgerRow(ledger, balance, (isSamePrevDate || isSameNextDate)) : renderMobileLedgerRow(ledger, balance, (isSamePrevDate || isSameNextDate)));
  
      let ledgerCount = prev.ledgerCount + 1;
      const isLast = idx === searchInfo.searchResult.length - 1;
      const isNewDate = ledger.timeStamp !== searchInfo.searchResult[idx + 1]?.timeStamp; 
  
      //다음 ledger이랑 날짜가 다르거나 없으면 당일소계를 추가
      if ((ledgerCount > 1 && isNewDate) || isLast) {
        elements.push( mode ==='pc' ? renderSubTotalRow(idx, newSub) : renderMobileSubTotalRow(idx, newSub));
        ledgerCount = 0;
      }
      //마지막이면 total추가
      if (isLast) {
        elements.push(mode==='pc' ? renderTotalRow(idx, newTotal, balance): renderMobileTotalRow(idx, newTotal,balance));
      }
  
      return {
        elements,
        date: ledger.timeStamp,
        balance,
        subTotalOfTheDay: newSub,
        total: newTotal,
        ledgerCount
      };
    }, {
      elements: [],
      date: searchInfo.searchSDate,
      balance: 0,
      subTotalOfTheDay: initialSubTotal,
      total: initialTotal,
      ledgerCount: 0
    })  ,[mode, searchInfo.searchResult])
    

    return(
        <>
        {screen ==='pc'&&
          <label className='mobile-view-label'>
            <input type='checkbox' checked={mobileView} onChange={setMobileView}/> 모바일 원장
        </label>
        }
        <h3 className='search-title'>{searchInfo.searchTitle+' 원장'}</h3>
        <div className='search-date-container'>{`Date : ${dayjs(new Date()).format('YYYY.MM.DD')}, Tel: ,Fax:`}</div>
        <table className={`search-result-table ${ mode!=='pc' && ' mobile'}`} style={{marginTop:'0'}}>
            <colgroup>
                {mode==='pc'?
                  <>
                  <col style={{width: "7%"}}/>    
                  <col style={{width: "6%",minWidth:'35px'}}/>
                  <col style={{width: "15%"}}/>       
                  <col style={{width: "10%", minWidth:'80px'}} />   
                  <col style={{width: "5%", minWidth:'35px'}}/>    
                  <col style={{width: "7%"}}/>    
                  <col style={{width: "7%", minWidth:'65px'}}/>    
                  <col style={{width: "7%", minWidth:'65px'}}/>   
                  <col style={{width: "6%", minWidth:'60px'}}/>    
                  <col style={{width: "6%", minWidth:'60px'}}/>    
                  <col style={{width: "8%", minWidth:'60px'}}/>    
                  <col style={{width: "10%"}}/>   
                </>
                :
                <>
                  <col style={{width: "7%"}}/>    
                  <col style={{width: "6%",minWidth:'34px'}}/> 
                  <col style={{width: "15%", minWidth:'100px'}}/>          
                  <col style={{width: "5%"}}/>    
                  <col style={{width: "7%", minWidth:'73px'}}/>    
                  <col style={{width: "7%", minWidth:'73px'}}/>    
                  <col style={{width: "7%", minWidth:'73px'}}/>    
                  <col style={{width: "5%"}}/>   
                </>  
              }
            </colgroup>
            <thead>
                <tr>
                    <td rowSpan={mode==='pc'? 1 :2}>날짜</td>
                    <td rowSpan={mode==='pc'? 1 :2}>계정</td>
                    <td>상호</td>
                    {mode==='pc' &&<td>품목</td>}
                    <td>수량</td>
                    {mode==='pc' &&<td>단가</td>}
                    <td>판매/출금</td>
                    <td>구매/입금</td>
                    {mode==='pc' &&<td>매출할인</td>}
                    {mode==='pc' &&<td>매입할인</td>}
                    <td rowSpan={mode==='pc'? 1 :2}>잔액</td>
                    <td rowSpan={mode==='pc'? 1 :2}>비고</td>
                </tr>
                {mode!=='pc' &&
                  <tr>
                    <td>품목</td>
                    <td>단가</td>
                    <td>매입할인</td>
                    <td>매출할인</td>
                  </tr>
                }
            </thead>
            <tbody>
                <tr style={{height:'20px'}}>
                    <td>{dayjs(searchInfo.searchSDate).format('YY.MM.DD')}</td>
                    <td></td>
                    <td className="left-align" style={{fontSize:'0.95rem'}}>{`<전 기 이 월>`}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {mode==='pc' && <td></td>}
                    {mode==='pc' && <td></td>}
                    {mode==='pc' && <td></td>}
                    <td className="right-align">0</td>
                    <td></td>
                </tr>
                {mode ==='pc' && resultReducer.elements}
            </tbody>
                {mode !=='pc' && resultReducer.elements}
        </table>
        </>
        )
}