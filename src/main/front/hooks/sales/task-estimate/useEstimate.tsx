'use client'
import { useCallback, useEffect, useMemo, useState } from "react"
import {v4 as uuidv4} from "uuid";
import { ResponseEstimate, ResponseEstimateItem } from "@/model/types/sales/estimate/type"
import { ResponseStock } from "@/model/types/stock/stock/types";
import useSearchStock from "@/hooks/stock/search/useSearchStock";

export default function useEstimate(estimate:ResponseEstimate, mode:'write'|'detail'|'edit'){
    const [items, setItems] = useState<Omit<ResponseEstimateItem,'estimateId'>[]>(estimate ?[...estimate.items]:[])
    const itemIds = useMemo(()=> items.map(({itemId})=> itemId), [items])

    const addEstimateItemHandler =(hand:boolean)=>{
        setItems([...items,{
            itemId:uuidv4(),
            stockId:'',
            productName:'',
            modelName:'',
            quantity: 0,
            unitPrice:0,
            hand,
            memo:''
        }])
    }
    useEffect(()=>{
        setItems(estimate ?[...estimate.items]:[])
    },[mode])

    const removeEstimateItemHandler=(checkedState,resetChecked)=>{
        setItems((prev)=>{    
            return prev.filter(({itemId})=> !checkedState[itemId])
        })
        resetChecked();
    }

    const estimateItemHandler = useCallback(
        (estimateToUpdate: Partial<Omit<ResponseEstimateItem, "estimateId">>, uuid: string) => {

            for(const [key, value] of Object.entries(estimateToUpdate)){
                if(typeof value === "number" && isNaN(value)){
                    delete estimateToUpdate[key];
                }
            }

            setItems((prevItems)=>
                prevItems.map((estimate) =>
                    estimate.itemId === uuid ? { ...estimate, ...estimateToUpdate } : estimate
            ));
        },[]);

    const changeStockHandler = (stockInfo : Pick <ResponseStock,'stockId'| 'productName'| 'modelName'| 'outPrice' >,uuid?: string)=>{
        setItems((prev)=>{
            return prev.map((estimate)=>
                estimate.itemId === uuid? {
                    ...estimate,
                    stockId:stockInfo.stockId,
                    productName:stockInfo.productName,
                    modelName:stockInfo.modelName,
                    unitPrice:stockInfo.outPrice,
                    quantity:1,
                } : estimate
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