'use client'
import { useState } from 'react';

import './table-body.scss';

import { useItemSelection } from '@/hooks/share/useItemSelection';
import ReceiptOptions from '@/components/main/sales/receipt/options';
import { DisabledStatus } from '@/model/constants/sales/receipt/receipt_constants';
import useReceiptList from '@/hooks/sales/receipt/useReceiptList';
import { ClientMousePosition } from '@/model/types/share/type';
import { ReceiptCategory } from '@/model/types/sales/receipt/type';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import useSearchStock from '@/hooks/stock/search/useSearchStock';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';


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
            getMousePosition,
            focusTarget,
            checkCustomerId,
            setCustomerInfo,
            checkStockId,
            setStockInfo,
            saveReceiptList
        } = useReceiptList()


    const searchCustomerHandler = useSearchCustomer(checkCustomerId,setCustomerInfo)
    const searchStockHandler = useSearchStock(checkStockId,setStockInfo)


    return(
        <>
        {receiptList.map((receipt, index) => (
                <tbody key={receipt.receiptId} className={target===receipt.receiptId ? 'focused' : ''} 
                    ref={(el) => {(itemsRef.current[receipt.receiptId] = el)}}
                    onContextMenu={(e)=>{
                        setTarget(receipt.receiptId)
                        setMousePosition(getMousePosition(e))
                        setIsRightClick(true)
                    }}
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
                        <td rowSpan={2} className='register-date'>
                            <CustomDateInput
                                defaultValue={receipt.timeStamp}
                                name='timeStamp'
                                changeEvent={(value)=>receiptHandler({timeStamp:new Date(value)}, receipt.receiptId)}
                            />
                        </td>
                        <td rowSpan={2}>
                            <select value={receipt.category} 
                                    onChange={(e)=>receiptHandler({category:(e.target.value as ReceiptCategory)},receipt.receiptId)} required>
                                <option value="disabled" disabled>전표입력</option>
                                <option value="SALES">매출</option>
                                <option value="PURCHASE">매입</option>
                                <option value="DEPOSIT">입금</option>
                                <option value="WITHDRAWAL">출금</option>
                                <option value="SALES_DISCOUNT">매출할인</option>
                                <option value="PURCHASE_DISCOUNT">매입할인</option>
                                <option value="MAINTENANCE_FEE">관리비</option>
                                <option value="RETURN_OUT">반품출고</option>
                                <option value="RETURN_IN">반품입고</option>
                                <option value="SALES_ALTERNATIVE">매출대체</option>
                            </select>
                        </td>
                        <td><input type="text"
                                className={DisabledStatus[receipt.category].customerName ? 'disabled' : ''}
                                placeholder='거 래 처' 
                                value={receipt.customerName || ''}
                                readOnly={DisabledStatus[receipt.category].customerName}
                                onChange={(e)=>!(!!receipt.customerId) && receiptHandler({customerName:e.target.value}, receipt.receiptId)}
                                onKeyDown={(e)=>searchCustomerHandler(e, receipt.receiptId)}
                                /></td>
                        <td><input type="text"                                    
                                className={DisabledStatus[receipt.category].memo ? 'disabled' : ''}
                                placeholder='비 고'
                                value={receipt.memo || ''} 
                                readOnly={DisabledStatus[receipt.category].memo}
                                onChange={(e)=>receiptHandler({memo:e.target.value}, receipt.receiptId)}/></td>
                        <td colSpan={2}>
                            <input type="text"
                                className={DisabledStatus[receipt.category].description ? 'disabled' : ''}
                                placeholder='적 요'
                                value={receipt.description ||''}
                                readOnly={DisabledStatus[receipt.category].description}
                                onChange={(e)=>receiptHandler({description:e.target.value}, receipt.receiptId)}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" 
                                placeholder='품 명'
                                className={DisabledStatus[receipt.category].productName ? 'disabled' : ''}
                                value={(receipt.productName || '') + (receipt.modelName && ` ${receipt.modelName}`)}
                                readOnly={DisabledStatus[receipt.category].productName}
                                onChange={(e)=>!(!!receipt.stockId) && receiptHandler({productName:e.target.value}, receipt.receiptId)}
                                onKeyDown={(e)=>searchStockHandler(e, receipt.receiptId)}/></td>
                        <td><input type="text"
                                className={DisabledStatus[receipt.category].quantity ? 'disabled' : 'number-input'}
                                placeholder='수 량'
                                value={receipt.quantity.toLocaleString('ko-KR')}
                                readOnly={DisabledStatus[receipt.category].quantity}
                                onChange={(e)=>receiptHandler({quantity:Number(e.target.value.replaceAll(',',''))}, receipt.receiptId)}/></td>
                        <td><input type="text"  
                                className={DisabledStatus[receipt.category].unitPrice ? 'disabled' : 'number-input'}
                                placeholder='단 가'
                                value={receipt.unitPrice.toLocaleString('ko-KR')}
                                readOnly={DisabledStatus[receipt.category].unitPrice || !!receipt.stockId}
                                onChange={(e)=>receiptHandler({unitPrice:Number(e.target.value.replaceAll(',',''))}, receipt.receiptId)}/></td>
                        <td><input type="text" 
                                className={'number-input'}
                                placeholder='금 액'
                                value={DisabledStatus[receipt.category].totalPrice ?
                                        (receipt.quantity * receipt.unitPrice).toLocaleString('ko-KR')
                                        :
                                        Number(receipt.totalPrice).toLocaleString('ko-KR')
                                 }
                                 key={receipt.unitPrice + receipt.quantity}
                                readOnly={DisabledStatus[receipt.category].totalPrice}
                                onChange={(e)=>receiptHandler({ totalPrice: Number(e.target.value.replaceAll(',',''))}, receipt.receiptId)}/></td>
                    </tr>
                </tbody>
            ))}
            <tfoot>
                <tr>
                    <td colSpan={7} className='new-receipt-button-container'>
                        <button onClick={newReceipt}>
                            새전표 추가
                        </button>
                        <button onClick={saveReceiptList}>
                            저장하기
                        </button>
                    </td>
                </tr>
            </tfoot>

        </>
    )
}

