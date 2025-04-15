import '@/styles/table-style/search-result.scss';
import '../ledger-search-result.scss';

import { ResponseLedger } from "@/model/types/ledger/type";
import dayjs from 'dayjs';
import { ReceiptCategoryEnum } from '@/model/types/sales/receipt/type';
import { useMemo, useReducer } from 'react';
import { useScreenMode } from '@/hooks/share/useScreenMode';


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

export default function LedgerStockSearchResult({searchInfo}:{searchInfo:{searchResult:ResponseLedger[], searchTitle:string, searchSDate:Date}}){
    const screen = useScreenMode({tabletSize:800, mobileSize:620})
    const [mobileView,setMobileView] = useReducer((prev)=>!prev,false)
  
    const mode =(screen!=='pc' ? screen: (mobileView ? 'tabelt': screen))
    const renderSearchResult = useMemo(()=>
        searchInfo.searchResult.reduce((prev,ledger,idx)=>{
        const category = ReceiptCategoryEnum[ledger.category]
        const newInventory = ['매출','매입할인','반품출고'].includes(category) ?
            prev.inventory-ledger.quantity :
            prev.inventory+ledger.quantity

        const newElement = (
            mode==='pc' ?
                <tr key={ledger.receiptId}>
                    <td>{dayjs(ledger.timeStamp).format('YY.M.D')}</td>
                    <td>{category}</td>
                    <td className='left-align'>{ledger.customerName}</td>
                    <td className='left-align'>{ledger.description}</td>
                    <td className='right-align'>{ledger.outPrice.toLocaleString('ko-KR')}</td>
                    <td>{['매출','매입할인'].includes(category) ? ledger.quantity : 0}</td>
                    <td>{['매입','매출할인'].includes(category) ? ledger.quantity : 0}</td>
                    <td>{category==='반품입고' ? ledger.quantity : 0}</td>
                    <td>{category==='반품출고' ? ledger.quantity : 0}</td>
                    <td>{newInventory.toLocaleString('ko-KR')}</td>
                    <td className='right-align'>{`${(['매입','매출할인','반품입고'].includes(category) ? '-' : '')}${ledger.totalPrice.toLocaleString('ko-KR')}`}</td>
                </tr>
                :
                <tbody key={ledger.receiptId}>
                    <tr key={ledger.receiptId}>
                        <td rowSpan={2}>{dayjs(ledger.timeStamp).format('YY.M.D')}</td>
                        <td rowSpan={2}>{category}</td>
                        <td className='left-align'>{ledger.customerName}</td>
                        <td rowSpan={2} className='right-align'>{ledger.outPrice.toLocaleString('ko-KR')}</td>
                        <td rowSpan={2}>{['매출','매입할인'].includes(category) ? ledger.quantity : 0}</td>
                        <td rowSpan={2}>{['매입','매출할인'].includes(category) ? ledger.quantity : 0}</td>
                        <td rowSpan={2}>{category==='반품입고' ? ledger.quantity : 0}</td>
                        <td rowSpan={2}>{category==='반품출고' ? ledger.quantity : 0}</td>
                        <td rowSpan={2}>{newInventory.toLocaleString('ko-KR')}</td>
                        <td rowSpan={2} className='right-align'>{`${(['매입','매출할인','반품입고'].includes(category) ? '-' : '')}${ledger.totalPrice.toLocaleString('ko-KR')}`}</td>
                    </tr>
                    <tr>
                        <td className='left-align'>{ledger.description}</td>
                    </tr>
                </tbody>
         )   

        const newTotal =updateTotal(prev.total,category,ledger.quantity,ledger.totalPrice);
        let totalLedger = null
        if(idx===searchInfo.searchResult.length-1){
            totalLedger =(
                mode==='pc' ?
                    <tr className='none-hover' style={{borderBottom:'none'}}>
                        <td>총계</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><b>{newTotal.purchase.toLocaleString('ko-KR')}</b></td>
                        <td><b>{newTotal.sales.toLocaleString('ko-KR')}</b></td>
                        <td><b>{newTotal.returnIn.toLocaleString('ko-KR')}</b></td>
                        <td><b>{newTotal.returnOut.toLocaleString('ko-KR')}</b></td>
                        <td><b>{newInventory.toLocaleString('ko-KR')}</b></td>
                        <td className='right-align'>{newTotal.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                :
                <tbody className='none-hover'  style={{borderBottom:'none'}}>
                    <tr>
                        <td>총계</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><b>{newTotal.purchase.toLocaleString('ko-KR')}</b></td>
                        <td><b>{newTotal.sales.toLocaleString('ko-KR')}</b></td>
                        <td><b>{newTotal.returnIn.toLocaleString('ko-KR')}</b></td>
                        <td><b>{newTotal.returnOut.toLocaleString('ko-KR')}</b></td>
                        <td><b>{newInventory.toLocaleString('ko-KR')}</b></td>
                        <td className='right-align'>{newTotal.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr> 
                </tbody>   
            )
            
        }

        return{
            element : [...prev.element, newElement,totalLedger],
            inventory: newInventory,
            total:newTotal,
        }
    },{element:[], inventory:0, total:{sales:0, purchase:0, returnOut:0, returnIn:0, totalPrice:0}}),[searchInfo.searchResult, mode])


    return(
        <>
        {screen ==='pc'&&
        <label className='mobile-view-label'>
            <input type='checkbox' checked={mobileView} onChange={setMobileView}/> 모바일 원장
        </label>
        }
        <h3 className='ledger-title'>{searchInfo.searchTitle+' 원장'}</h3>
        <table className={`ledger-search-result-table ${ mode!=='pc' && ' ledger-mobile'}`} style={{marginTop:'0'}}>
            <colgroup>
                <col style={{width:'10%'}}></col>
                <col style={{width:'5%', minWidth:'65px'}}></col>
                <col style={{width:'20%'}}></col>
                {mode==='pc' && <col style={{width:'20%'}}></col>}
                <col style={{width:'10%'}}></col>
                <col style={{width:'5%', minWidth:'35px'}}></col>
                <col style={{width:'5%', minWidth:'35px'}}></col>
                <col style={{width:'5%', minWidth:'35px'}}></col>
                <col style={{width:'5%', minWidth:'35px'}}></col>
                <col style={{width:'5%', minWidth:'35px'}}></col>
                <col style={{width:'10%'}}></col>
            </colgroup>
            <thead>
                <tr>
                    <td rowSpan={mode==='pc'? 1 : 2}>날짜</td>
                    <td rowSpan={mode==='pc'? 1 : 2}>계정</td>
                    <td>거래처</td>
                    {mode==='pc' && <td>적요</td>}
                    <td rowSpan={mode==='pc'? 1 : 2}>단가</td>
                    <td rowSpan={mode==='pc'? 1 : 2}>판매</td>
                    <td rowSpan={mode==='pc'? 1 : 2}>매입</td>
                    <td rowSpan={mode==='pc'? 1 : 2}>반입</td>
                    <td rowSpan={mode==='pc'? 1 : 2}>반출</td>
                    <td rowSpan={mode==='pc'? 1 : 2}>재고</td>
                    <td rowSpan={mode==='pc'? 1 : 2}>금액</td>
                </tr>
                {mode!=='pc' &&
                    <tr>
                        <td>적요</td>
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
                    <td></td>
                    <td></td>
                    {mode==='pc' && <td></td>}
                    <td>0</td>
                    <td></td>
                </tr>
                {mode ==='pc' && renderSearchResult.element}
            </tbody>
            {mode !=='pc' && renderSearchResult.element}

        </table>
        </>
       
    )
}
