import { Dispatch, MouseEvent, SetStateAction, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RequestReceipt } from "@/model/types/receipt/type";
import { DisabledStatus } from "@/model/constants/sales/receipt/receipt_constants";
import { ResponseCustomer } from "@/model/types/customer/customer/type";
import { ResponseStock } from "@/model/types/stock/stock/types";

const initReceipt: RequestReceipt = {
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
};

type ClientMousePosition = { x: number; y: number };

export default function useReceiptList() {
    const [receiptList, setReceiptList] = useState<RequestReceipt[]>([initReceipt]);

    /** 공통 업데이트 함수 */
    const updateReceiptList = (receiptId: string, updateData: Partial<RequestReceipt>) => {
        setReceiptList((prev) =>
            prev.map((receipt) =>
                receipt.receiptId === receiptId ? { ...receipt, ...updateData } : receipt
            )
        );
    };

    /** 입력값 업데이트 (숫자 필드 예외처리) */
    const receiptHandler = useCallback((receiptToUpdate: Partial<RequestReceipt>, receiptId: string) => {
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
        stockInfo: Pick<ResponseStock, "stockId" | "name" | "modelName" | "outPrice">,
        receiptId: string
    ) => {
        updateReceiptList(receiptId, {
            stockId: stockInfo.stockId,
            productName: stockInfo.name,
            unitPrice: stockInfo.outPrice,
            modelName: stockInfo.modelName,
        });
    };

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
    };
}
