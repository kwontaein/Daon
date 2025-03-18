'use client'

import useCheckBoxState from '@/hooks/share/useCheckboxState';
import './estimate-form.scss';
import { ResponseEstimate, ResponseEstimateItem } from "@/model/types/task/estimate/type"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {v4 as uuidv4} from "uuid";
import { useConfirm } from '@/hooks/share/useConfirm';
import { apiUrl } from '@/model/constants/apiUrl';
import ErrorBox from '@/components/share/error-box/error-box';


export default function EstimateForm({estimate, submit, mode}:{estimate?:ResponseEstimate, submit:()=>void, mode:string}){

    const [items, setItems] = useState<Omit<ResponseEstimateItem,'estimateId'>[]>(estimate ? [...estimate.items] :[])
    const itemIds = useMemo(()=> items.map(({itemId})=> itemId), [items.length])
    const {checkedState,isAllChecked, resetChecked, update_checked, toggleAllChecked} = useCheckBoxState(itemIds)
    const targetRef = useRef<string>('')


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


    const removeEstimateItemHandler=()=>{
        setItems((prev)=>{    
            return prev.filter(({itemId})=> !checkedState[itemId])
        })
        resetChecked();
    }


    const estimateItemHandler = useCallback((estimateToUpdate:Partial<Omit<ResponseEstimateItem,'estimateId'>> ,uuid:string)=>{
        const [key, value] = Object.entries(estimateToUpdate)[0]
        if(['unitPrice', 'quantity'].some((i)=>i===key)){
            if(isNaN(Number(value))) return
            estimateToUpdate[key] = Number((value+'').replace(/[^0-9]/g, ''))
        }
        const updatedEstimates = items.map((estimate)=>
            estimate.itemId === uuid ? {...estimate, ...estimateToUpdate} : estimate
        )
        setItems(updatedEstimates);
    },[items])


    const handleMessage =useCallback( (event: MessageEvent) => {
        if (event.data) {
            const { stockId, name, modelName, outPrice} = event.data;
            const newEstimate = items.map((estimate)=>
                estimate.itemId === targetRef.current ? 
                {...estimate,
                    stockId:stockId ??"",
                    productName:name??"",
                    modelName:modelName??"",
                    unitPrice:outPrice??""
                }: estimate
            )
            setItems(newEstimate)
            targetRef.current = '';
        }
    },[items])

    //검색을 위한 이벤트등록
    useEffect(() => {
        
        window.removeEventListener("message", handleMessage);
        window.addEventListener("message", handleMessage);  

        return () => window.removeEventListener("message", handleMessage);
    }, [handleMessage]);




    const searchStockHandler = (e,productName ,stockId, itemId)=>{
        //거래처를 찾고나서 수정 시도 시
        if(stockId){
            const deleteStock = ()=>{
                setItems((prev) =>
                    prev.map((prevItem) =>
                      prevItem.itemId === itemId
                        ? { ...prevItem, stockId: '', productName: '', modelName: '', unitPrice: 0 }
                        : prevItem
                    )
                  );
            }
            useConfirm('물품을 다시 선택하시겠습니까?',deleteStock,()=>{})
        }
        //Enter 외의 다른 키 입력 시
        if(!productName|| e.key !=='Enter') return
        e.preventDefault();
        //pc
        if(window.innerWidth>620){
            const estimate = items.find((estimate)=>estimate.itemId===itemId)
            targetRef.current = itemId
            const url = `${apiUrl}/search-stock-items?searchName=${estimate.productName}`; // 열고 싶은 링크
            const popupOptions = "width=500,height=700,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "searchStock", popupOptions);
        }
    }



    return(
        <section className='estimate-container'>
            <div className='estimate-button-container'>
                <button onClick={addEstimateItemHandler.bind(null,false)}>항 목 추 가</button>
                <button onClick={addEstimateItemHandler.bind(null,true)}>수기항목추가</button>
                <button onClick={removeEstimateItemHandler}>체 크 삭 제</button>
            </div>
            <table className='estimate-form'>
                <colgroup>
                    <col style={{width:'1%'}}/>
                    <col style={{width:'25%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'6%'}}/>
                    <col style={{width:'12%'}}/>
                    <col style={{width:'12%'}}/>
                    <col style={{width:'10%'}}/>
                </colgroup>
                <thead>
                    <tr>
                        <td><input type='checkbox' checked={isAllChecked} onChange={toggleAllChecked}/></td>
                        <td>품&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명</td>
                        <td>규&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;격</td>
                        <td>수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;량</td>
                        <td>단&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가</td>
                        <td>공급가액</td>
                        <td>비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((estimate)=>(
                        <tr key={estimate.itemId} className={estimate.hand ? 'hand-estimate' : ''}>
                            <td>
                                <input
                                type="checkbox"
                                checked={!!checkedState[estimate.itemId]}
                                onChange={() => update_checked(estimate.itemId)}/>
                                <input name='itemId' type='hidden' value={estimate.itemId} readOnly/>
                                <input name='stockId' type='hidden' value={estimate.stockId} readOnly/>
                                <input name='hand' type='hidden' value={estimate.hand+''} readOnly/>
                            </td>
                            <td>
                                <input
                                name='productName'
                                value={estimate.productName}
                                onChange={(e) =>
                                    estimateItemHandler({ productName: e.target.value }, estimate.itemId)}
                                onKeyDown={(e) =>
                                    !estimate.hand &&
                                    searchStockHandler(e, estimate.productName, estimate.stockId, estimate.itemId)}/>
                            </td>
                            <td>
                                <input
                                name='modelName'
                                value={estimate.modelName}
                                readOnly={!!estimate.itemId}
                                onChange={(e) =>
                                    estimateItemHandler({ modelName: e.target.value }, estimate.itemId)}/>
                            </td>
                            <td>
                                <input
                                className="center-align"
                                name='quantity'
                                value={estimate.quantity.toLocaleString('ko-KR')}
                                onChange={(e) =>
                                    estimateItemHandler({ quantity: Number(e.target.value.replaceAll(',', '')) }, estimate.itemId)}/>
                            </td>
                            <td>
                                <input
                                className="right-align"
                                name='unitPrice'
                                readOnly={!!estimate.itemId}
                                value={estimate.unitPrice.toLocaleString('ko-KR')}
                                onChange={(e) =>
                                    estimateItemHandler({ unitPrice: Number(e.target.value.replaceAll(',', '')) }, estimate.itemId)}/>
                            </td>
                            <td> 
                                <input
                                className="right-align"
                                value={(estimate.unitPrice * estimate.quantity).toLocaleString('ko-KR')}
                                readOnly/>
                                </td>
                            <td>
                                <input />
                            </td>
                        </tr>
                    ))}
                    {items.length>0 &&
                    <tr>
                        <td colSpan={3}><p>합계</p></td>
                        <td><input className='center-align result-input' value={items.reduce((prev,estimate)=>prev+Number(estimate.quantity ??0),0).toLocaleString('ko-KR')} readOnly/></td>
                        <td></td>
                        <td><input className='right-align result-input' name='totalAmount' value={items.reduce((prev,estimate)=>prev+(Number(estimate.quantity??0)*Number(estimate.unitPrice??0)),0).toLocaleString('ko-KR')} readOnly/></td>
                        <td></td>
                    </tr>
                    }
                </tbody>
            </table>
            <div className='estimate-button-container justify-center'>
                    <button type='button' onClick={submit}>{mode ==='write' ? '견적서작성' : '견적서수정'}</button>
                    <button>취 소</button>
            </div>
        </section>
    )
}