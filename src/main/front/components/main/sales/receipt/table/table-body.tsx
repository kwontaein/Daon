'use client'
import { useEffect, useState } from 'react';

import './table-body.scss';

import { useItemSelection } from '@/hooks/share/useItemSelection';
import ReceiptOptions from '@/components/main/sales/receipt/options';
import dayjs from 'dayjs';
import { DisabledStatus } from '@/model/constants/sales/receipt/receipt_constants';
import useReceiptList from '@/hooks/receipt/useReceiptList';
import { categoryType } from '@/model/types/receipt/type';
import { ClientMousePosition } from '@/model/types/share/type';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';


export default function ReceiptTableBody(){
    const {target,setTarget,itemsRef} = useItemSelection<string>(true) //복사 및 삭제대상 지정
    const [mousePosition, setMousePosition] = useState<ClientMousePosition|null>(null)
    const [isRightClick, setIsRightClick] = useState<boolean>(false)
    const {
            receiptList,
            receiptHandler,
            newReceipt,
            copyReceipt,
            deleteReceipt,
            mouseRightClick,
            focusTarget
        } = useReceiptList()


    const mouseEvent = (receiptId: string, position:ClientMousePosition)=>{
        setTarget(receiptId)
        setMousePosition(position)
        setIsRightClick(true)
    }
    const {customerInfo, customerNameRef, searchCustomerHandler} = useSearchCustomer()


    return(
        <>
        {receiptList.map((receipt, index) => (
                <tbody key={receipt.receiptId} className={target===receipt.receiptId ? 'focused' : ''} 
                    ref={(el) => {(itemsRef.current[receipt.receiptId] = el)}}
                    onContextMenu={mouseRightClick.bind(null,receipt.receiptId,mouseEvent)}
                    onFocus={focusTarget.bind(null,receipt.receiptId, setTarget)}
                    onClick={()=>setIsRightClick(false)}
                    >
                    <tr>
                        <td rowSpan={2} style={{position:'relative'}}>
                            {(target===receipt.receiptId && isRightClick) && 
                            <ReceiptOptions position={mousePosition} 
                                            copyFn={()=>{copyReceipt(target)}} 
                                            deleteFn={()=>{deleteReceipt(target)}} />}
                            {index+1}
                        </td>
                        <td rowSpan={2}>
                            <input type="date" 
                                   value={dayjs(receipt.timeStamp).format("YYYY-MM-DD")} 
                                   onChange={(e)=>receiptHandler({date:new Date(e.target.value)}, receipt.receiptId)}/>
                        </td>
                        <td rowSpan={2}>
                            <select value={receipt.category} 
                                    onChange={(e)=>receiptHandler({category:e.target.value as categoryType},receipt.receiptId)} required>
                                <option value="disabled" disabled>전표입력</option>
                                <option value="sales">매출</option>
                                <option value="purchase">매입</option>
                                <option value="deposit">입금</option>
                                <option value="withdrawal">출금</option>
                                <option value="sale_discount">매출할인</option>
                                <option value="purchase_discount">매입할인</option>
                                <option value="cost">관리비</option>
                                <option value="return_delivery">반품출고</option>
                                <option value="sales_replacement">매출대체</option>
                                <option value="returned_received">반품입고</option>
                            </select>
                        </td>
                        <td><input type="text"
                                className={DisabledStatus[receipt.category].company ? 'disabled' : ''}
                                ref={customerNameRef}
                                placeholder='거 래 처' 
                                value={receipt.customerName || ''}
                                disabled={DisabledStatus[receipt.category].company}
                                onChange={(e)=>receiptHandler({customerName:e.target.value}, receipt.receiptId)}
                                onKeyDown={searchCustomerHandler}
                                /></td>
                        <td><input type="text"                                    
                                className={DisabledStatus[receipt.category].note ? 'disabled' : ''}
                                placeholder='비 고'
                                value={receipt.memo || ''} 
                                disabled={DisabledStatus[receipt.category].note}
                                onChange={(e)=>receiptHandler({note:e.target.value}, receipt.receiptId)}/></td>
                        <td colSpan={2}>
                            <input type="text"
                                className={DisabledStatus[receipt.category].briefs ? 'disabled' : ''}
                                placeholder='적 요'
                                value={receipt.description ||''}
                                disabled={DisabledStatus[receipt.category].briefs}
                                onChange={(e)=>receiptHandler({briefs:e.target.value}, receipt.receiptId)}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" 
                                placeholder='품 명'
                                className={DisabledStatus[receipt.category].product ? 'disabled' : ''}
                                value={receipt.productName || ''}
                                disabled={DisabledStatus[receipt.category].product}
                                onChange={(e)=>receiptHandler({product:e.target.value}, receipt.receiptId)}/></td>
                        <td><input type="text"
                                className={DisabledStatus[receipt.category].quantity ? 'disabled' : 'number-input'}
                                placeholder='수 량'
                                value={receipt.quantity!==undefined? Number(receipt.quantity).toLocaleString('ko-KR') : ''}
                                disabled={DisabledStatus[receipt.category].quantity}
                                onChange={(e)=>receiptHandler({quantity:e.target.value.replaceAll(',','')}, receipt.receiptId)}/></td>
                        <td><input type="text"  
                                className={DisabledStatus[receipt.category].unit_price ? 'disabled' : 'number-input'}
                                placeholder='단 가'
                                value={receipt.unit_price!==undefined? Number(receipt.unit_price).toLocaleString('ko-KR') : ''}
                                disabled={DisabledStatus[receipt.category].unit_price}
                                onChange={(e)=>receiptHandler({unit_price: e.target.value.replaceAll(',','')}, receipt.receiptId)}/></td>
                        <td><input type="text" 
                                className={'number-input'}
                                placeholder='금 액'
                                value={DisabledStatus[receipt.category].amount ?
                                   (
                                    (receipt.quantity!==undefined  && receipt.unit_price!==undefined) ? 
                                        (Number(receipt.quantity) * Number(receipt.unit_price)).toLocaleString('ko-KR')
                                        : ''
                                    )
                                    :
                                    receipt.amount!==undefined? Number(receipt.amount).toLocaleString('ko-KR') : ''
                                 }
                                disabled={DisabledStatus[receipt.category].amount}
                                onChange={(e)=>receiptHandler({amount:e.target.value.replaceAll(',','')}, receipt.receiptId)}/></td>
                    </tr>
                </tbody>
            ))}
            <tfoot>
                <tr>
                    <td colSpan={7} className='new-receipt-button-container'>
                    <button onClick={newReceipt}>
                        새전표 추가
                    </button>
                    </td>
                </tr>
            </tfoot>

        </>
    )
}

