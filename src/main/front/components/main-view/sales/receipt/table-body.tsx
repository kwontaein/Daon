'use client'
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import {v4 as uuidv4} from "uuid";

import './table-body.scss';
import { Receipt, AccountType } from '@/constants/receipt/type';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import ReceiptOptions from '@/components/main-view/sales/receipt/options';

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
        console.log(mousePosition)
    },[mousePosition])

    //계정전표 설정
    const accountHandler = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
        const updatedReceipts = receiptList.map((receipt, i) =>
        index === i
            ? { ...receipt, account: e.target.value as AccountType }
            : receipt
        );
        setReceiptList(updatedReceipts);
    };


    const currentFocusHandler = (uuid: string) => {
        if(currentId === uuid) return
        setCurrentId(uuid);
    };

 
    const copyReceiptHandler = ()=>{
        const copyReceipt = receiptList.find(receipt => receipt.uuid === target)
        if(copyReceipt){
            const newReceipt = {
                ...initReceipt,
                company:copyReceipt.company,
                uuid: uuidv4()
            };
            setReceiptList([...receiptList, newReceipt]);
        }
    }

    const deleteReceiptHandler = ()=>{
        const newReceiptList =receiptList.filter(({uuid})=> uuid !== target)
        setReceiptList(newReceiptList)
    }

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
        {receiptList.map(({uuid,account}, index) => (
                <tbody key={uuid} className={target===uuid ? 'focus' : ''} 
                    ref={(el) => {(itemsRef.current[uuid] = el)}}
                    onContextMenu={(e)=>{
                            e.preventDefault();  
                            const tableRect = e.currentTarget.getBoundingClientRect();
                            const mouseX = e.clientX - tableRect.left;
                            const mouseY = e.clientY - tableRect.top;
                        
                            setMousePosition({ x: mouseX, y: mouseY });                  
                            setTarget(uuid)
                        }}
                    onFocus={(e)=>{
                        currentFocusHandler(uuid);
                    }}
                    onClick={()=>setTarget(null)}
                    >
                    <tr>
                        <td rowSpan={2} style={{position:'relative'}}>
                            {target===uuid && <ReceiptOptions position={mousePosition} copyFn={copyReceiptHandler} deleteFn={deleteReceiptHandler} />}
                            {index+1}
                        </td>
                        <td rowSpan={2}>
                            <input type="date"/>
                        </td>
                        <td rowSpan={2}>
                            <select value={account} onChange={(e) => accountHandler(e, index)} required>
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
                        <td><input type="text" placeholder='거 래 처'/> </td>
                        <td><input type="text" placeholder='비 고'/></td>
                        <td><input type="number" placeholder='단 가'/></td>
                        <td><input type="number" placeholder='금 액'/></td>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder='품 명'/></td>
                        <td><input type="number"placeholder='수 량'/></td>
                        <td colSpan={2}><input type="text" placeholder='적 요'/></td>
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