'use client'
import { useCallback, useMemo, useState } from "react"
import {v4 as uuidv4} from "uuid";
import { ResponseEstimate, ResponseEstimateItem } from "@/model/types/task/estimate/type"
import { ResponseStock } from "@/model/types/stock/stock/types";
import useSearchStock from "@/hooks/stock/search/useSearchStock";

export default function useEstimate(estimate:ResponseEstimate){
    const [items, setItems] = useState<Omit<ResponseEstimateItem,'estimateId'>[]>(estimate ? [...estimate.items] :[])
    const itemIds = useMemo(()=> items.map(({itemId})=> itemId), [items.length])


    const addEstimateItemHandler =(hand:boolean)=>{
        setItems([...items,{
            itemId:uuidv4(),
            stockId:'',
            productName:'',
            modelName:'',
            quantity: 0,
            unitPrice:0,
            hand
        }])
    }

    const removeEstimateItemHandler=(checkedState,resetChecked)=>{
        setItems((prev)=>{    
            return prev.filter(({itemId})=> !checkedState[itemId])
        })
        resetChecked();
    }

    const estimateItemHandler = useCallback(
        (estimateToUpdate: Partial<Omit<ResponseEstimateItem, "estimateId">>, uuid: string) => {
            const [key, value] = Object.entries(estimateToUpdate)[0];
            if (typeof value === "number" && isNaN(value)) return;
    
            setItems((prevItems) =>
                prevItems.map((estimate) =>
                    estimate.itemId === uuid ? { ...estimate, ...estimateToUpdate } : estimate
                )
            );
        },
        [] // 의존성 배열 비워서 처음 마운트 시에만 유지
    );

    const changeStockHandler = (stockInfo : Pick <ResponseStock,'stockId'| 'name'| 'modelName'| 'outPrice' >,uuid?: string)=>{
        setItems((prev)=>{
            return prev.map((estimate)=>
                estimate.itemId === uuid? {
                    ...estimate,
                    stockId:stockInfo.stockId,
                    productName:stockInfo.name,
                    modelName:stockInfo.modelName,
                    unitPrice:stockInfo.outPrice} : estimate
            )
        })
    }

    const checkStockName =(id)=>{
        return !!items.find(({ itemId }) => itemId === id)?.stockId;
    }

    const searchStockHandler = useSearchStock(checkStockName, changeStockHandler)


    return{
        items,
        itemIds,
        addEstimateItemHandler,
        removeEstimateItemHandler,
        estimateItemHandler,
        changeStockHandler,
        searchStockHandler,
    }
}