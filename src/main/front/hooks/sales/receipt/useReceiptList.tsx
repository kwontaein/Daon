import { Dispatch, MouseEvent, SetStateAction, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DisabledStatus } from "@/model/constants/sales/receipt/receipt_constants";
import { ResponseCustomer } from "@/model/types/customer/customer/type";
import { ResponseStock } from "@/model/types/stock/stock/types";
import { saveReceiptListApi } from "@/features/sales/receipt/api/receiptApi";
import { useConfirm } from "../../share/useConfirm";
import { ResponseReceipt } from "@/model/types/sales/receipt/type";
import { ResponseOfficial } from "@/model/types/sales/official/type";

const initReceipt: ResponseReceipt = {
    receiptId: uuidv4(),
    timeStamp: new Date(),
    category: "disabled",
    customerName: '',
    memo: '',
    productName: '',
    modelName:'',
    quantity:0,
    unitPrice:0,
    totalPrice:0,
    description:'',
    officialName:'',
};


export default function useReceiptList() {
    const [receiptList, setReceiptList] = useState<ResponseReceipt[]>([initReceipt]);

    /** 공통 업데이트 함수 */
    const updateReceiptList = (receiptId: string, updateData: Partial<ResponseReceipt>) => {
        setReceiptList((prev) =>
            prev.map((receipt) =>
                receipt.receiptId === receiptId ? { ...receipt, ...updateData } : receipt
            )
        );
    };

    /** 입력값 업데이트 (숫자 필드 예외처리) */
    const receiptHandler = useCallback((receiptToUpdate: Partial<ResponseReceipt>, receiptId: string) => {
        const [key, value] = Object.entries(receiptToUpdate)[0];
        // 숫자형식에 다른 키 입력 시 Return
        if (typeof value ==='number' && isNaN(value)) return;
        
        setReceiptList((prev)=>
            prev.map((receipt) =>
                receipt.receiptId===receiptId
                    ?   {
                            ...initReceipt,
                            ...(key === 'category' ?
                                Object.fromEntries(Object.entries(receipt).filter(([filterKey])=>
                                    !DisabledStatus[value as string]?.[filterKey]
                                ))
                            : receipt)
                        ,...receiptToUpdate
                        }
                : receipt
            ))
    }, []);


    /** 포커스 변경 */
    const focusTarget = (receiptId: string, setTarget: Dispatch<SetStateAction<string>>) => {
        setTarget(receiptId);
    };

    /** 영수증 복사 */
    const copyReceipt = (target: string) => {
        if (receiptList.length >= 10) return alert("최대 10개까지만 추가할 수 있습니다.");

        const targetReceipt = receiptList.find(({ receiptId }) => receiptId === target);
        if (targetReceipt) {
            setReceiptList([...receiptList, { ...targetReceipt, receiptId: uuidv4() }]);
        }
    };

    /** 전표아이템 삭제 */
    const deleteReceipt = (target: string) => {
        setReceiptList((prev) => prev.filter(({ receiptId }) => receiptId !== target));
    };

    /** 전표아이템 추가 */
    const newReceipt = () => {
        if (receiptList.length >= 10) return alert("최대 10개까지만 추가할 수 있습니다.");
        setReceiptList([...receiptList, { ...initReceipt, receiptId: uuidv4() }]);
    };

    /** 우클릭 이벤트 처리 */
    const getMousePosition = (
        e: MouseEvent<HTMLTableSectionElement>,
    ) => {
        e.preventDefault();
        const tableRect = e.currentTarget.getBoundingClientRect();
        return(
            { x: e.clientX - tableRect.left, y: e.clientY - tableRect.top }
        )
    };

    /** 고객 정보 관련 함수 */
    const checkCustomerId = (id: string) => !!receiptList.find(({ receiptId }) => receiptId === id)?.customerId;

    const setCustomerInfo = (customerInfo: Pick<ResponseCustomer, "customerId" | "customerName">, receiptId: string) => {
        updateReceiptList(receiptId, customerInfo);
    };

    /** 재고 정보 관련 함수 */
    const checkStockId = (id: string) => !!receiptList.find(({ receiptId }) => receiptId === id)?.stockId;

    const setStockInfo = (
        stockInfo: Pick<ResponseStock, "stockId" | "productName" | "modelName" | "outPrice">,
        receiptId: string
    ) => {
        updateReceiptList(receiptId, {
            stockId: stockInfo.stockId,
            productName: stockInfo.productName,
            unitPrice: stockInfo.outPrice,
            modelName: stockInfo.modelName,
            quantity:1,
        });
    };
    
    const checkOfficialId = (id:string) => !!receiptList.find(({ receiptId }) => receiptId === id)?.officialId;
    const setOfficialInfo = (officialInfo: Pick<ResponseOfficial, "officialId" | "officialName">, receiptId: string) => {
        updateReceiptList(receiptId, officialInfo);
    };

    const saveReceiptList = ()=>{
        if(receiptList.some(({customerId,category})=> DisabledStatus[category].customerName ? false :!(!!customerId))){
            window.alert('항목의 모든 거래처를 입력해주세요.')
            return
        }else if(receiptList.some(({stockId, category})=> DisabledStatus[category].productName ? false : !(!!stockId))){
            window.alert('항목의 모든 품명를 입력해주세요.')
            return
        }else if(receiptList.some(({category})=>category ==='disabled')){
            window.alert('계정전표를 선택해주세요')
            return
        }
        const postReceiptList = ()=>{
            saveReceiptListApi(receiptList).then((status)=>{
                if(status ===200){
                    window.alert('저장이 완료되었습니다.')
                    window.close();
                }else{
                    window.alert('문제가 발생했습니다. 잠시후 다시 시도해주세요.')
                }
            })
        }
        useConfirm('모든 전표입력을 실행하시겠습니까?',postReceiptList,()=>{})
    }
    return {
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
        checkOfficialId,
        setOfficialInfo,
        saveReceiptList
    };
}
