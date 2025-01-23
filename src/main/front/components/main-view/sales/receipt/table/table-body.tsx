'use client'
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import {v4 as uuidv4} from "uuid";

import './table-body.scss';
import { Receipt, AccountType } from '@/constants/receipt/type';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import ReceiptOptions from '@/components/main-view/sales/receipt/options';
import dayjs from 'dayjs';
import { DisabledStatus } from '@/constants/receipt/disabled-status';

const initReceipt:Receipt = {
    uuid: uuidv4(),
    date: new Date(Date.now()),
    account: 'input',
}

type ClientMousePosition = {
    x:number,
    y:number
}

export default function ReceiptTableBody(){
    const [receiptList, setReceiptList] = useState<Receipt[]>([initReceipt]);
    const {target,setTarget,itemsRef} = useItemSelection<string>(true) //복사 및 삭제대상 지정
    const [mousePosition, setMousePosition] =useState<ClientMousePosition|null>(null)
    const [currentId, setCurrentId] = useState<string>()

    const numberInput =['unit_price', 'quantity', 'amount'] //number type input
    
    const receiptHandler = (receiptToUpdate:Partial<Receipt> ,uuid:string)=>{
        const [key, value] = Object.entries(receiptToUpdate)[0]
        if(numberInput.some((i)=>i===key)){
            receiptToUpdate[key] = value.replace(/[^0-9]/g, '')
        }
        const updatedReceipts = receiptList.map((receipt)=>
            receipt.uuid === uuid ? {...receipt, ...receiptToUpdate} : receipt
        )
        setReceiptList(updatedReceipts);
    }

    const currentFocusHandler = (uuid: string) => {
        if(currentId === uuid) return
        setCurrentId(uuid);
    };

    //복사하기
    const copyReceiptHandler = ()=>{
        const copyReceipt = receiptList.find(receipt => receipt.uuid === target)
        console.log(copyReceipt)
        if(copyReceipt){
            const newReceipt = {
                ...copyReceipt,
                uuid: uuidv4()
            };
            setReceiptList([...receiptList, newReceipt]);
        }
    }
    //삭제하기
    const deleteReceiptHandler = ()=>{
        const newReceiptList =receiptList.filter(({uuid})=> uuid !== target)
        setReceiptList(newReceiptList)
    }
    //새전표 추가
    const newReceiptHandler =()=>{
        if(receiptList.length>=10){
            window.alert('최대 10개까지만 추가할 수 있습니다.')
            return
        }
        const newReceipt = {...initReceipt}
        newReceipt.uuid = uuidv4();
        setReceiptList([...receiptList, newReceipt])
    }
    


    return(
        <>
        {receiptList.map((receipt, index) => (
                <tbody key={receipt.uuid} className={currentId===receipt.uuid ? 'focused' : ''} 
                    ref={(el) => {(itemsRef.current[receipt.uuid] = el)}}
                    onContextMenu={(e)=>{
                            e.preventDefault();  
                            const tableRect = e.currentTarget.getBoundingClientRect();
                            const mouseX = e.clientX - tableRect.left;
                            const mouseY = e.clientY - tableRect.top;
                        
                            setMousePosition({ x: mouseX, y: mouseY });                  
                            setTarget(receipt.uuid)
                        }}
                    onFocus={(e)=>{
                        currentFocusHandler(receipt.uuid);
                    }}
                    onClick={()=>setTarget(null)}
                    >
                    <tr>
                        <td rowSpan={2} style={{position:'relative'}}>
                            {target===receipt.uuid && 
                            <ReceiptOptions position={mousePosition} 
                                            copyFn={copyReceiptHandler} 
                                            deleteFn={deleteReceiptHandler} />}
                            {index+1}
                        </td>
                        <td rowSpan={2}>
                            <input type="date" 
                                   value={dayjs(receipt.date).format("YYYY-MM-DD")} 
                                   onChange={(e)=>receiptHandler({date:new Date(e.target.value)}, receipt.uuid)}/>
                        </td>
                        <td rowSpan={2}>
                            <select value={receipt.account} 
                                    onChange={(e)=>receiptHandler({account:e.target.value as AccountType},receipt.uuid)} required>
                                <option value="input" disabled>전표입력</option>
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
                                className={DisabledStatus[receipt.account].company ? 'disabled' : ''}
                                placeholder='거 래 처' 
                                value={receipt.company || ''}
                                disabled={DisabledStatus[receipt.account].company}
                                onChange={(e)=>receiptHandler({company:e.target.value}, receipt.uuid)}/> </td>
                        <td><input type="text"                                    
                                className={DisabledStatus[receipt.account].note ? 'disabled' : ''}
                                placeholder='비 고'
                                value={receipt.note || ''} 
                                disabled={DisabledStatus[receipt.account].note}
                                onChange={(e)=>receiptHandler({note:e.target.value}, receipt.uuid)}/></td>
                        <td colSpan={2}>
                            <input type="text"
                                className={DisabledStatus[receipt.account].briefs ? 'disabled' : ''}
                                placeholder='적 요'
                                value={receipt.briefs ||''}
                                disabled={DisabledStatus[receipt.account].briefs}
                                onChange={(e)=>receiptHandler({briefs:e.target.value}, receipt.uuid)}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" 
                                placeholder='품 명'
                                className={DisabledStatus[receipt.account].product ? 'disabled' : ''}
                                value={receipt.product || ''}
                                disabled={DisabledStatus[receipt.account].product}
                                onChange={(e)=>receiptHandler({product:e.target.value}, receipt.uuid)}/></td>
                        <td><input type="text"
                                className={DisabledStatus[receipt.account].quantity ? 'disabled' : 'number-input'}
                                placeholder='수 량'
                                value={receipt.quantity!==undefined? Number(receipt.quantity).toLocaleString('ko-KR') : ''}
                                disabled={DisabledStatus[receipt.account].quantity}
                                onChange={(e)=>receiptHandler({quantity:e.target.value.replaceAll(',','')}, receipt.uuid)}/></td>
                        <td><input type="text"  
                                className={DisabledStatus[receipt.account].unit_price ? 'disabled' : 'number-input'}
                                placeholder='단 가'
                                value={receipt.unit_price!==undefined? Number(receipt.unit_price).toLocaleString('ko-KR') : ''}
                                disabled={DisabledStatus[receipt.account].unit_price}
                                onChange={(e)=>receiptHandler({unit_price: e.target.value.replaceAll(',','')}, receipt.uuid)}/></td>
                        <td><input type="text" 
                                className={'number-input'}
                                placeholder='금 액'
                                value={DisabledStatus[receipt.account].amount ?
                                   (
                                    (receipt.quantity!==undefined  && receipt.unit_price!==undefined) ? 
                                        (Number(receipt.quantity) * Number(receipt.unit_price)).toLocaleString('ko-KR')
                                        : ''
                                    )
                                    :
                                    receipt.amount!==undefined? Number(receipt.amount).toLocaleString('ko-KR') : ''
                                 }
                                disabled={DisabledStatus[receipt.account].amount}
                                onChange={(e)=>receiptHandler({amount:e.target.value.replaceAll(',','')}, receipt.uuid)}/></td>
                    </tr>
                </tbody>
            ))}
            <tfoot>
                <tr>
                    <td colSpan={7} className='new-receipt-button-container'>
                    <button onClick={newReceiptHandler}>
                        새전표 추가
                    </button>
                    </td>
                </tr>
            </tfoot>

        </>
    )
}

