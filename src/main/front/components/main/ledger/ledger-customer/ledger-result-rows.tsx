import { ResponseLedger } from "@/model/types/ledger/type";
import { ReceiptCategoryEnum } from "@/model/types/sales/receipt/type";
import dayjs from "dayjs";

export type SubTotal = {
    sales: number;
    purchase: number;
    slaes_discount: number;
    purchase_discount: number;
  };
  
export type Total = SubTotal & {
    quntity: number;
  };
  


 export function updateSubTotals(category: string, totalPrice: number, quantity: number, subTotal: SubTotal, total: Total) {
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
 export function renderLedgerRow(ledger: ResponseLedger, balance: number, isSameDate: boolean) {
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
        <td className="right-align">{ledger.outPrice && ledger.outPrice.toLocaleString('ko-KR')}</td>
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

 export function renderMobileLedgerRow(ledger: ResponseLedger, balance: number, isSameDate: boolean) {
    const category = ReceiptCategoryEnum[ledger.category];
    return (
      <tbody key={ledger.receiptId} style={isSameDate ? { border: 'none' } : undefined}>
        <tr>
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
          <td>{ledger.outPrice && ledger.outPrice.toLocaleString('ko-KR')}</td>
          <td className="right-align">{(category === '매입할인' ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
          <td className="right-align">{(category === '매출할인' ? ledger.totalPrice : 0).toLocaleString('ko-KR')}</td>
          <td className="right-align">{balance.toLocaleString('ko-KR')}</td>
        </tr>
      </tbody>
    );
  }
  
    //당일소계-모바일
   export function renderMobileSubTotalRow(idx: number, sub: SubTotal) {
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
 export function renderSubTotalRow(idx: number, sub: SubTotal) {
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
 export function renderMobileTotalRow(idx: number, total: Total, balance: number) {
    return (
      <tbody key={`total-${idx}`} className='none-hover' style={{borderBottom:'none'}}>
        <tr>
          <td rowSpan={2}/>
          <td rowSpan={2} style={{ verticalAlign: 'bottom' }}>총계</td>
          <td rowSpan={2}/>
          <td rowSpan={2}/>
          <td rowSpan={2} style={{ verticalAlign: 'bottom' }}><b>{total.quntity.toLocaleString('ko-KR')}</b></td>
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
 export function renderTotalRow(idx: number, total: Total, balance: number) {
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