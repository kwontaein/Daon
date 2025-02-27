import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import {v4 as uuidv4} from "uuid";
import { Receipt } from "@/model/types/receipt/type";

const initReceipt:Receipt = {
    uuid: uuidv4(),
    date: new Date(Date.now()),
    account: 'disabled',
}

type ClientMousePosition = {
    x:number,
    y:number
}

export default function useReceiptList(){
    const [receiptList, setReceiptList] = useState<Receipt[]>([initReceipt]);
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

    const focusTarget = (uuid: string, setTarget: Dispatch<SetStateAction<string>>) => {
        setTarget(uuid);
    };



    const copyReceipt = (target)=>{
        if(receiptList.length>=10){
            window.alert('최대 10개까지만 추가할 수 있습니다.')
            return
        }
        const copyReceipt = receiptList.find(receipt => receipt.uuid === target)
        if(copyReceipt){
            const newReceipt = {
                ...copyReceipt,
                uuid: uuidv4()
            };
            setReceiptList([...receiptList, newReceipt]);
        }
    }


    const deleteReceipt = (target)=>{
        const newReceiptList =receiptList.filter(({uuid})=> uuid !== target)
        setReceiptList(newReceiptList)
    }
    


    const newReceipt =()=>{
        if(receiptList.length>=10){
            window.alert('최대 10개까지만 추가할 수 있습니다.')
            return
        }
        const newReceipt = {...initReceipt}
        newReceipt.uuid = uuidv4();
        setReceiptList([...receiptList, newReceipt])
    }
    
    const mouseRightClick=(
        uuid:string,
        mouseEvent: (uuid:string,position:ClientMousePosition)=>{},
        e:MouseEvent<HTMLTableSectionElement,MouseEvent>
    )=>{
        e.preventDefault();
        const tableRect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - tableRect.left;
        const mouseY = e.clientY - tableRect.top;
        mouseEvent(uuid, {x:mouseX, y:mouseY});
    }


    return {receiptList, receiptHandler, newReceipt, copyReceipt, deleteReceipt, mouseRightClick, focusTarget }
}