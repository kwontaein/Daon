'use client'
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import {v4 as uuidv4} from "uuid";

import './table-body.scss';
import { Receipt, AccountType } from '@/constants/receipt/type';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import ReceiptOptions from '@/components/main-view/sales/receipt/options';
import dayjs from 'dayjs';

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
    const {target,setTarget,itemsRef} = useItemSelection<string>(true)
    const [mousePosition, setMousePosition] =useState<ClientMousePosition|null>(null)
    const [currentId, setCurrentId] = useState<string>()

    useEffect(()=>{
        console.log(receiptList)
    },[receiptList])

    const receiptHandler = (receiptToUpdate:Partial<Receipt> ,uuid:string)=>{
        console.log(receiptToUpdate,uuid)
        const updatedReceipts = receiptList.map((receipt)=>
            receipt.uuid === uuid
            ? {...receipt, ...receiptToUpdate}
            : receipt
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
                <tbody key={receipt.uuid} className={target===receipt.uuid ? 'focus' : ''} 
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
                            {target===receipt.uuid && <ReceiptOptions position={mousePosition} 
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
                                   placeholder='거 래 처' 
                                   value={receipt.company || ''}
                                   onChange={(e)=>receiptHandler({company:e.target.value}, receipt.uuid)}/> </td>
                        <td><input type="text" 
                                   placeholder='비 고'
                                   value={receipt.note || ''} 
                                   onChange={(e)=>receiptHandler({note:e.target.value}, receipt.uuid)}/></td>
                        <td><input type="number" 
                                   placeholder='단 가'
                                   value={receipt.unit_price || ''}
                                   onChange={(e)=>receiptHandler({unit_price:Number(e.target.value)}, receipt.uuid)}/></td>
                        <td><input type="number" 
                                   placeholder='금 액'
                                   value={receipt.amount || ''}
                                   onChange={(e)=>receiptHandler({amount:Number(e.target.value)}, receipt.uuid)}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" 
                                   placeholder='품 명'
                                   value={receipt.product || ''}
                                   onChange={(e)=>receiptHandler({product:e.target.value}, receipt.uuid)}/></td>
                        <td><input type="number"
                                   placeholder='수 량'
                                   value={receipt.quantity || ''}
                                   onChange={(e)=>receiptHandler({quantity:Number(e.target.value)}, receipt.uuid)}/></td>
                        <td colSpan={2}>
                            <input type="text"
                                   placeholder='적 요'
                                   value={receipt.briefs ||''}
                                   onChange={(e)=>receiptHandler({briefs:e.target.value}, receipt.uuid)}/></td>
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

