'use client'

import useCheckBoxState from '@/hooks/share/useCheckboxState';
import './estimate-form.scss';
import { StringifiedEstimateType } from "@/model/types/task/estimate/type"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {v4 as uuidv4} from "uuid";
import { useConfirm } from '@/hooks/share/useConfirm';
import { apiUrl } from '@/model/constants/apiUrl';


export default function EstimateForm(){
    const [estimateList, setEstimateList] = useState<StringifiedEstimateType[]>([])
    const itemIds = useMemo(()=> estimateList.map(({itemId})=> itemId), [estimateList.length])
    const {checkedState,isAllChecked, resetChecked, update_checked, toggleAllChecked} = useCheckBoxState(itemIds)
    const targetRef = useRef<string>('')

    const addEstimateHandler =(hand:boolean)=>{
        setEstimateList([...estimateList,{
            itemId:uuidv4(),
            stockId:'',
            productName:'',
            modelName:'',
            quantity: '',
            unitPrice:'',
            hand
        }])
    }


    const removeEstimateHandler=()=>{
        setEstimateList((prev)=>{    
            return prev.filter(({itemId})=> !checkedState[itemId])
        })
        resetChecked();
    }


    const estimateHandler = useCallback((estimateToUpdate:Partial<StringifiedEstimateType> ,uuid:string)=>{
        const [key, value] = Object.entries(estimateToUpdate)[0]
        if(['unitPrice', 'quantity'].some((i)=>i===key)){
            if(isNaN(Number(value))) return
            estimateToUpdate[key] = (value as string).replace(/[^0-9]/g, '')
        }
        const updatedEstimates = estimateList.map((estimate)=>
            estimate.itemId === uuid ? {...estimate, ...estimateToUpdate} : estimate
        )
        setEstimateList(updatedEstimates);
    },[estimateList])


    const handleMessage =useCallback( (event: MessageEvent) => {
        if (event.data) {
            const { stockId, name, modelName, outPrice} = event.data;
            const newEstimate = estimateList.map((estimate)=>
                estimate.itemId === targetRef.current ? 
                {...estimate,
                    stockId:stockId ??"",
                    productName:name??"",
                    modelName:modelName??"",
                    unitPrice:outPrice??""
                }: estimate
            )
            setEstimateList(newEstimate)
            targetRef.current = '';
        }
    },[estimateList])

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
                setEstimateList((prev) =>
                    prev.map((prevItem) =>
                      prevItem.itemId === itemId
                        ? { ...prevItem, stockId: '', productName: '', modelName: '', unitPrice: '' }
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
            const estimate = estimateList.find((estimate)=>estimate.itemId===itemId)
            targetRef.current = itemId
            const url = `${apiUrl}/search-stock-items?searchName=${estimate.productName}&target=${itemId}`; // 열고 싶은 링크
            const popupOptions = "width=500,height=700,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "searchStock", popupOptions);
        }
    }


    return(
        <section className='estimate-container'>
            <div className='estimate-button-container'>
                <button onClick={addEstimateHandler.bind(null,false)}>항 목 추 가</button>
                <button onClick={addEstimateHandler.bind(null,true)}>수기항목추가</button>
                <button onClick={removeEstimateHandler}>체 크 삭 제</button>
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
                    {estimateList.map((estimate)=>(
                        <tr key={estimate.itemId} className={estimate.hand ? 'hand-estimate' : ''}>
                            <td>
                                <input
                                type="checkbox"
                                checked={!!checkedState[estimate.itemId]}
                                onChange={() => update_checked(estimate.itemId)}/>
                            </td>
                            <td>
                                <input
                                value={estimate.productName}
                                onChange={(e) =>
                                    estimateHandler({ productName: e.target.value }, estimate.itemId)}
                                onKeyDown={(e) =>
                                    !estimate.hand &&
                                    searchStockHandler(e, estimate.productName, estimate.stockId, estimate.itemId)}/>
                            </td>
                            <td>
                                <input
                                value={estimate.modelName}
                                readOnly={!!estimate.itemId}
                                onChange={(e) =>
                                    estimateHandler({ modelName: e.target.value }, estimate.itemId)}/>
                            </td>
                            <td>
                                <input
                                className="center-align"
                                value={Number(estimate.quantity ?? 0).toLocaleString('ko-KR')}
                                onChange={(e) =>
                                    estimateHandler({ quantity: e.target.value.replaceAll(',', '') }, estimate.itemId)}/>
                            </td>
                            <td>
                                <input
                                className="right-align"
                                readOnly={!!estimate.itemId}
                                value={Number(estimate.unitPrice ?? 0).toLocaleString('ko-KR')}
                                onChange={(e) =>
                                    estimateHandler({ unitPrice: e.target.value.replaceAll(',', '') }, estimate.itemId)}/>
                            </td>
                            <td> 
                                <input
                                className="right-align"
                                value={(Number(estimate.unitPrice??0) * Number(estimate.quantity??0)).toLocaleString('ko-KR')}
                                readOnly/>
                                </td>
                            <td>
                                <input />
                            </td>
                        </tr>
                    ))}
                    {estimateList.length>0 &&
                    <tr>
                        <td colSpan={3}><p>합계</p></td>
                        <td><input className='center-align result-input' value={estimateList.reduce((prev,estimate)=>prev+Number(estimate.quantity ??0),0).toLocaleString('ko-KR')} readOnly/></td>
                        <td></td>
                        <td><input className='right-align result-input' value={estimateList.reduce((prev,estimate)=>prev+(Number(estimate.quantity??0)*Number(estimate.unitPrice??0)),0).toLocaleString('ko-KR')} readOnly/></td>
                        <td></td>
                    </tr>
                    }
                </tbody>
            </table>
            <div className='estimate-button-container'>
                    <button>견작서작성</button>
                    <button>취 소</button>
            </div>
        </section>
    )
}