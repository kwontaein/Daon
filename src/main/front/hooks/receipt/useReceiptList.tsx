import { Dispatch, MouseEvent, SetStateAction, useCallback, useState } from "react";
import {v4 as uuidv4} from "uuid";
import { Receipt, RequestReceipt } from "@/model/types/receipt/type";
import { DisabledStatus } from "@/model/constants/sales/receipt/receipt_constants";
import { ResponseCustomer } from "@/model/types/customer/customer/type";
import { ResponseStock } from "@/model/types/stock/stock/types";

const initReceipt:RequestReceipt = {
    receiptId: uuidv4(),
    timeStamp: new Date(Date.now()),
    category: 'disabled',
}

type ClientMousePosition = {
    x:number,
    y:number
}

export default function useReceiptList(){
    const [receiptList, setReceiptList] = useState<RequestReceipt[]>([initReceipt]);

    const receiptHandler = useCallback((receiptToUpdate:Partial<RequestReceipt> ,receiptId:string)=>{
        const [key, value] = Object.entries(receiptToUpdate)[0]
        if(['unit_price', 'quantity', 'amount'].some((i)=>i===key)){
            if(isNaN(Number(value))) return
            receiptToUpdate[key] = value+''.replace(/[^0-9]/g, '')
        }
        const updatedReceipts = receiptList.map((receipt) =>
            receipt.receiptId === receiptId
                ? {
                      receiptId: receipt.receiptId,
                      //category 변경 시 폼상태 부분초기화
                      ...(key === "category"
                          ? Object.fromEntries(
                                Object.entries(receipt).filter(
                                    ([key]) => !DisabledStatus[receipt.category]?.[key]
                                )
                            )
                          : receipt),
                      ...receiptToUpdate,
                  }
                : receipt
        );
        setReceiptList(updatedReceipts);

        
    },[receiptList])

    const focusTarget = (receiptId: string, setTarget: Dispatch<SetStateAction<string>>) => {
        setTarget(receiptId);
    };



    const copyReceipt = (target)=>{
        if(receiptList.length>=10){
            window.alert('최대 10개까지만 추가할 수 있습니다.')
            return
        }
        const copyReceipt = receiptList.find(receipt => receipt.receiptId === target)
        if(copyReceipt){
            const newReceipt = {
                ...copyReceipt,
                receiptId: uuidv4()
            };
            setReceiptList([...receiptList, newReceipt]);
        }
    }


    const deleteReceipt = (target)=>{
        const newReceiptList =receiptList.filter(({receiptId})=> receiptId !== target)
        setReceiptList(newReceiptList)
    }
    


    const newReceipt =()=>{
        if(receiptList.length>=10){
            window.alert('최대 10개까지만 추가할 수 있습니다.')
            return
        }
        const newReceipt = {...initReceipt}
        newReceipt.receiptId = uuidv4();
        setReceiptList([...receiptList, newReceipt])
    }
    
    const mouseRightClick=(
        receiptId:string,
        mouseEvent: (receiptId:string,position:ClientMousePosition)=>{},
        e:MouseEvent<HTMLTableSectionElement,MouseEvent>
    )=>{
        e.preventDefault();
        const tableRect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - tableRect.left;
        const mouseY = e.clientY - tableRect.top;
        mouseEvent(receiptId, {x:mouseX, y:mouseY});
    }

    const checkCustomerId =(id:string)=>{
        return !!receiptList.find(({receiptId})=>receiptId===id).customerId
    }

    const setCustomerInfo =(customerInfo:Pick<ResponseCustomer,'customerId'|'customerName'>, receiptId)=>{
        const updatedReceipts = receiptList.map((receipt) =>
            receipt.receiptId === receiptId
                ? {...receipt, customerId:customerInfo.customerId, customerName:customerInfo.customerName} : receipt
        )
        
        setReceiptList(updatedReceipts)
    }

    const checkStockId =(id:string)=>{
        return !!receiptList.find(({receiptId})=>receiptId===id)
    }

    const setStockInfo =(stockInfo:Pick<ResponseStock,'stockId'|'modelName'|'outPrice'>, receiptId)=>{
        const updatedReceipts = receiptList.map((receipt) =>
            receipt.receiptId === receiptId
                ? {...receipt, ...stockInfo} : receipt
        )
        
        setReceiptList(updatedReceipts)
    }


    return {receiptList, receiptHandler, newReceipt, copyReceipt, deleteReceipt, mouseRightClick, focusTarget, checkCustomerId, setCustomerInfo}
}