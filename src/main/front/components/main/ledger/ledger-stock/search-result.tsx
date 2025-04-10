import '@/styles/table-style/search-result.scss';

import { ResponseLedger } from "@/model/types/ledger/type";
import dayjs from 'dayjs';
import { ReceiptCategoryEnum } from '@/model/types/sales/receipt/type';
import { useMemo } from 'react';


const updateTotal = (total, category, quntity, totalPrice)=>{
    const newTotal = { ...total };
    
    switch (category) {
        case '매출':
        case '매입할인':
            newTotal.purchase+= quntity;
            break;
        case '매입':
        case '매출할인':
            newTotal.sales+= quntity;
            break;
        case '반품출고':
            newTotal.returnOut+=quntity;
            break;
        case '반품입고':
            newTotal.returnIn+=quntity
    }

    switch (category){
        case '매출':
        case '매입할인':
        case '반품출고':
            newTotal.totalPrice += totalPrice
            break;
        case '매입':
        case '매출할인':
        case '반품입고':
            newTotal.totalPrice -= totalPrice
            break;
    }
  
    return newTotal;
}

export default function LedgerStockSearchResult({searchResult}:{searchResult:ResponseLedger[]}){
    console.log(searchResult)

    const renderSearchResult = useMemo(()=>
        searchResult.reduce((prev,ledger,idx)=>{
        const category = ReceiptCategoryEnum[ledger.category]
        const newInventory = ['매출','매입할인','반품출고'].includes(category) ?
            prev.inventory-ledger.quantity :
            prev.inventory+ledger.quantity
        const newElement =(
                <tr>
                    <td>{dayjs(ledger.timeStamp).format('YY.M.D')}</td>
                    <td>{category}</td>
                    <td>{ledger.customer.customerName}</td>
                    <td>{ledger.description}</td>
                    <td>{ledger.outPrice.toLocaleString('kr-KO')}</td>
                    <td>{['매출','매입할인'].includes(category) ? ledger.quantity : 0}</td>
                    <td>{['매입','매출할인'].includes(category) ? ledger.quantity : 0}</td>
                    <td>{category==='반품입고' ? ledger.quantity : 0}</td>
                    <td>{category==='반품출고' ? ledger.quantity : 0}</td>
                    <td>{newInventory.toLocaleString('ko-KR')}</td>
                    <td>{`${(['매입','매출할인','반품입고'].includes(category) ? '-' : '')}${ledger.totalPrice}`}</td>
                </tr>
         )   
        

        const newTotal =updateTotal(prev.total,category,ledger.quantity,ledger.totalPrice);
        let totalLedger = null
        if(idx===searchResult.length-1){
            totalLedger =(
                    <tr className='none-hover' style={{borderBottom:'none'}}>
                        <td>총계</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='right-align'><b>{newTotal.purchase.toLocaleString('ko-KR')}</b></td>
                        <td className='right-align'><b>{newTotal.sales.toLocaleString('ko-KR')}</b></td>
                        <td className='right-align'><b>{newTotal.returnIn.toLocaleString('ko-KR')}</b></td>
                        <td className='right-align'><b>{newTotal.returnOut.toLocaleString('ko-KR')}</b></td>
                        <td className='right-align'><b>{newInventory.toLocaleString('ko-KR')}</b></td>
                        <td className='right-align'>{newTotal.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                )
            
        }

        return{
            element : [...prev.element, newElement,totalLedger],
            inventory: newInventory,
            total:newTotal,
        }
    },{element:[], inventory:0, total:{sales:0, purchase:0, returnOut:0, returnIn:0, totalPrice:0}}),[searchResult])
    return(
        <table className='search-result-table'>
            <thead>
                <tr>
                    <td>날짜</td>
                    <td>계정</td>
                    <td>거래처</td>
                    <td>적요</td>
                    <td>단가</td>
                    <td>판매</td>
                    <td>매입</td>
                    <td>반입</td>
                    <td>반출</td>
                    <td>재고</td>
                    <td>금액</td>
                </tr>
            </thead>
            <tbody>
                {renderSearchResult.element}
            </tbody>
        </table>
    )
}
