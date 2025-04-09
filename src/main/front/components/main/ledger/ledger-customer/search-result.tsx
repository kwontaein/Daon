import '../ledger-search-result.scss';

import { ResponseLedger } from "@/model/types/ledger/type";
import { ReceiptCategoryEnum } from "@/model/types/sales/receipt/type";
import dayjs from "dayjs";
import React, { JSX, useMemo, useReducer } from "react";
import { useScreenMode } from '@/hooks/share/useScreenMode';

type SubTotal = {
    sales: number;
    purchase: number;
    slaes_discount: number;
    purchase_discount: number;
  };
  
  type Total = SubTotal & {
    quntity: number;
  };
  
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


  function updateSubTotals(category: string, totalPrice: number, quantity: number, subTotal: SubTotal, total: Total) {
    const newSub = { ...subTotal };
    const newTotal = { ...total };
  
    switch (category) {
      case '매출':
      case '출금':
      case '반품출고':
        newSub.purchase += totalPrice;
        newTotal.purchase += totalPrice;
        break;
      case '매입':
      case '입금':
      case '반품입고':
        newSub.sales += totalPrice;
        newTotal.sales += totalPrice;
        break;
      case '매출할인':
        newSub.purchase_discount += totalPrice;
        newTotal.purchase_discount += totalPrice;
        break;
      case '매입할인':
        newSub.slaes_discount += totalPrice;
        newTotal.slaes_discount += totalPrice;
        break;
    }
  
    newTotal.quntity += quantity;
    return { newSub, newTotal };
  }
  
  //ledger
  function renderLedgerRow(ledger: ResponseLedger, balance: number, isSameDate: boolean) {
    const category = ReceiptCategoryEnum[ledger.category];
    return (
      <tr key={ledger.receiptId} style={isSameDate ? { border: 'none' } : undefined}>
        <td><input type="checkbox" /></td>
        <td>{dayjs(ledger.timeStamp).format('YY.MM.DD')}</td>
        <td>{category}</td>
        <td className="left-align">
          {ledger?.productName}
          <br />
          {ledger?.modelName ??(['매출','매입'].includes(category) && '-')}
        </td>
        <td>{ledger.quantity}</td>
        <td className="right-align">{ledger.outPrice}</td>
        <td className="right-align">{(['매출', '출금', '반품출고'].includes(category) ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
        <td className="right-align">{(['매입', '입금', '반품입고'].includes(category) ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
        <td className="right-align">{(category === '매출할인' ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
        <td className="right-align">{(category === '매입할인' ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
        <td className="right-align">{balance.toLocaleString('ko-KR')}</td>
        <td></td>
        <td>{ledger.memo}</td>
      </tr>
    );
  }

  function renderMobileLedgerRow(ledger: ResponseLedger, balance: number, isSameDate: boolean) {
    const category = ReceiptCategoryEnum[ledger.category];
    return (
      <tbody key={ledger.receiptId}>
        <tr style={isSameDate ? { border: 'none' } : undefined}>
          <td rowSpan={2}><input type="checkbox" /></td>
          <td rowSpan={2}>{dayjs(ledger.timeStamp).format('YY.MM.DD')}</td>
          <td rowSpan={2}>{category}</td>
          <td rowSpan={2} className="left-align">
            {ledger?.productName}
            <br/>
            {ledger?.modelName}
          </td>
          <td>{ledger.quantity}</td>
          <td className="right-align">{(['매출', '출금', '반품출고'].includes(category) ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
          <td className="right-align">{(['매입', '입금', '반품입고'].includes(category) ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
          <td></td>
          <td rowSpan={2}>{ledger.memo}</td>
        </tr>
        <tr style={{borderTop:'none'}}>
          <td className="right-align">{ledger.outPrice && ledger.outPrice.toLocaleString('ko-KR')}</td>
          <td className="right-align">{(category === '매입할인' ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
          <td className="right-align">{(category === '매출할인' ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
          <td className="right-align">{balance.toLocaleString('ko-KR')}</td>
        </tr>
      </tbody>
    );
  }
  
    //당일소계-모바일
    function renderMobileSubTotalRow(idx: number, sub: SubTotal) {
      return (
        <tbody key={`subTotal-${idx}`}>
          <tr style={{ borderTop: 'none' }}>
            <td rowSpan={2}/><td rowSpan={2}/><td rowSpan={2}/>
            <td className="left-align" rowSpan={2}><b>[당일소계]</b></td>
            <td></td>
            <td className="right-align"><b>{sub.purchase.toLocaleString('ko-KR')}</b></td>
            <td className="right-align"><b>{sub.sales.toLocaleString('ko-KR')}</b></td>
            <td></td>
            <td rowSpan={2}></td>
          </tr>
          <tr>
            <td></td>
            <td className="right-align"><b>{sub.slaes_discount.toLocaleString('ko-KR')}</b></td>
            <td className="right-align"><b>{sub.purchase_discount.toLocaleString('ko-KR')}</b></td>
            <td className="right-align"></td>
          </tr>
        </tbody>
      );
    }
    
  //당일소계
  function renderSubTotalRow(idx: number, sub: SubTotal) {
    return (
      <tr key={`subTotal-${idx}`} style={{ borderTop: 'none' }}>
        <td></td><td></td><td></td>
        <td className="left-align"><b>[당일소계]</b></td>
        <td></td><td></td>
        <td className="right-align"><b>{sub.purchase.toLocaleString('ko-KR')}</b></td>
        <td className="right-align"><b>{sub.sales.toLocaleString('ko-KR')}</b></td>
        <td className="right-align"><b>{sub.purchase_discount.toLocaleString('ko-KR')}</b></td>
        <td className="right-align"><b>{sub.slaes_discount.toLocaleString('ko-KR')}</b></td>
        <td className="right-align"></td>
        <td></td><td></td>
      </tr>
    );
  }

  //총계
  function renderMobileTotalRow(idx: number, total: Total, balance: number) {
    return (
      <tbody key={`total-${idx}`} className='none-hover' style={{borderBottom:'none'}}>
        <tr>
          <td rowSpan={2}/>
          <td rowSpan={2}>총계</td>
          <td rowSpan={2}/>
          <td rowSpan={2}/>
          <td rowSpan={2}><b>{total.quntity.toLocaleString('ko-KR')}</b></td>
          <td className="right-align"><b>{total.purchase.toLocaleString('ko-KR')}</b></td>
          <td className="right-align"><b>{total.sales.toLocaleString('ko-KR')}</b></td>
          <td></td> 
          <td rowSpan={2}></td>
        </tr>
        <tr>
          <td className="right-align"><b>{total.slaes_discount.toLocaleString('ko-KR')}</b></td>
          <td className="right-align"><b>{total.purchase_discount.toLocaleString('ko-KR')}</b></td>
          <td className="right-align"><b>{balance.toLocaleString('ko-KR')}</b></td>
        </tr>
      </tbody>
    );
  }
  function renderTotalRow(idx: number, total: Total, balance: number) {
    return (
      <tr key={`total-${idx}`} style={{borderBottom:'none'}} className='none-hover'>
        <td></td>
        <td>총계</td>
        <td></td><td></td>
        <td><b>{total.quntity.toLocaleString('ko-KR')}</b></td>
        <td></td>
        <td className="right-align"><b>{total.purchase.toLocaleString('ko-KR')}</b></td>
        <td className="right-align"><b>{total.sales.toLocaleString('ko-KR')}</b></td>
        <td className="right-align"><b>{total.purchase_discount.toLocaleString('ko-KR')}</b></td>
        <td className="right-align"><b>{total.slaes_discount.toLocaleString('ko-KR')}</b></td>
        <td className="right-align"><b>{balance.toLocaleString('ko-KR')}</b></td>
        <td></td><td></td>
      </tr>
    );
  }
export default function LedgerCustomerSearchResult({ledgerTitle, searchResult,searchSDate}:{ledgerTitle:string,searchResult:ResponseLedger[],searchSDate:Date}){
  const screen = useScreenMode({tabletSize:800, mobileSize:620})
  const [mobileView,setMobileView] = useReducer((prev)=>!prev,false)

  const mode =( screen!=='pc' ? screen: (mobileView ? 'tabelt': screen) )
  const resultReducer = useMemo(()=>
  
    searchResult.reduce<Accumulator>((prev, ledger, idx) => {
      const category = ReceiptCategoryEnum[ledger.category];
      const isSameDate = prev.date === ledger.timeStamp;
      const balance =
        ['매출', '매입할인','출금',' 반품출고'].includes(category)
          ? prev.balance + ledger.totalPrice
          : prev.balance - ledger.totalPrice;
  
      const { newSub, newTotal } = updateSubTotals(category, ledger.totalPrice, ledger.quantity, isSameDate ? prev.subTotalOfTheDay : initialSubTotal, prev.total);
      const elements = [...prev.elements];
  
      elements.push( mode==='pc' ?renderLedgerRow(ledger, balance, isSameDate) : renderMobileLedgerRow(ledger, balance, isSameDate));
  
      let ledgerCount = prev.ledgerCount + 1;
      const isLast = idx === searchResult.length - 1;
      const isNewDate = ledger.timeStamp !== searchResult[idx + 1]?.timeStamp; 
  
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
      date: searchSDate,
      balance: 0,
      subTotalOfTheDay: initialSubTotal,
      total: initialTotal,
      ledgerCount: 0
    })  ,[mode, searchResult])
    

    return(
        <>
        {screen ==='pc'&&
          <label className='mobile-view-label'>
            <input type='checkbox' checked={mobileView} onChange={setMobileView}/> 모바일 원장
        </label>
        }
        <h3 className='ledger-title'>{ledgerTitle+' 원장'}</h3>
        <div className='ledger-date-container'>{`Date : ${dayjs(new Date()).format('YYYY.MM.DD')}, Tel: ,Fax:`}</div>
        <table className={`ledger-search-result-table ${ mode!=='pc' && ' ledger-mobile'}`} style={{marginTop:'0'}}>
            <colgroup>
                {mode==='pc'?
                  <>
                  <col style={{width: "1%"}}/>    
                  <col style={{width: "7%"}}/>    
                  <col style={{width: "6%",minWidth:'35px'}}/>    
                  <col style={{width: "10%", minWidth:'80px'}} />   
                  <col style={{width: "5%", minWidth:'35px'}}/>    
                  <col style={{width: "7%"}}/>    
                  <col style={{width: "7%", minWidth:'65px'}}/>    
                  <col style={{width: "7%", minWidth:'65px'}}/>   
                  <col style={{width: "6%", minWidth:'60px'}}/>    
                  <col style={{width: "6%", minWidth:'60px'}}/>    
                  <col style={{width: "8%", minWidth:'60px'}}/>    
                  <col style={{width: "5%",minWidth:'50px'}}/>    
                  <col style={{width: "25%"}}/>   
                </>
                :
                <>
                  <col style={{width: "1%"}}/>    
                  <col style={{width: "7%"}}/>    
                  <col style={{width: "6%",minWidth:'36px'}}/>    
                  <col style={{width: "10%", minWidth:'85px'}} />   
                  <col style={{width: "5%"}}/>    
                  <col style={{width: "7%", minWidth:'80px'}}/>    
                  <col style={{width: "7%", minWidth:'80px'}}/>    
                  <col style={{width: "7%", minWidth:'60px'}}/>    
                  <col style={{width: "25%"}}/>   
                </>  
              }
            </colgroup>
            <thead>
                <tr>
                    <td rowSpan={mode==='pc'? 1 :2}><input type="checkbox"/></td>
                    <td rowSpan={mode==='pc'? 1 :2}>날짜</td>
                    <td rowSpan={mode==='pc'? 1 :2}>계정</td>
                    <td rowSpan={mode==='pc'? 1 :2}>품목</td>
                    <td>수량</td>
                    {mode==='pc' &&<td>단가</td>}
                    <td>판매/출금</td>
                    <td>구매/입금</td>
                    {mode==='pc' &&<td>매출할인</td>}
                    {mode==='pc' &&<td>매입할인</td>}
                    {mode==='pc' &&<td>잔액</td>}
                    <td>결제일</td>
                    <td rowSpan={mode==='pc'? 1 :2}>메모</td>
                </tr>
                {mode!=='pc' &&
                  <tr>
                    <td>단가</td>
                    <td>매입할인</td>
                    <td>매출할인</td>
                    <td>잔액</td>
                  </tr>
                }
            </thead>
            <tbody>
                <tr style={{height:'20px'}}>
                    <td></td>
                    <td>{dayjs(searchSDate).format('YY.MM.DD')}</td>
                    <td></td>
                    <td className="left-align" style={{fontSize:'0.95rem'}}>{`<전 기 이 월>`}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {mode==='pc' && <td></td>}
                    {mode==='pc' && <td></td>}
                    {mode==='pc' && <td></td>}
                    <td className="right-align">0</td>
                    {mode==='pc' && <td></td>}
                    <td></td>
                </tr>
                {mode ==='pc' && resultReducer.elements}
            </tbody>
                {mode !=='pc' && resultReducer.elements}
        </table>
        </>
        )
}