'use client'
import {useState, useRef, useEffect} from "react";

import { saveStockCateApi, deleteStockCateApi, updateStockCateApi } from "../../../features/stock/category/api/stockCateApi";
import { useConfirm } from "@/hooks/share/useConfirm";
import { StockCate } from "@/model/types/stock/cate/type";
import { CateMode } from "@/model/types/share/type";

export default function useStockCate(InitStockCate:StockCate[]){
    const [cateState, setCateState] = useState<StockCate[]>(InitStockCate)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if(mode!==null) return
        setCateState(InitStockCate)
    },[InitStockCate])
    
    const editHandler = () => {
        if (!mode) {
            setMode('edit')
            return
        }
        const postCate = cateState.filter(({stockCateName}, index) =>
            InitStockCate[index].stockCateName !== stockCateName)
        const postAble = postCate.every(({stockCateName}) => stockCateName !== '')
        if (postCate.length>0 && postAble) {
            updateStockCateApi(postCate).then((status) => {
                if(status === 200){
                    window.alert('수정이 완료되었습니다.')
                    setMode(null)
                }
            })
        } else if(postCate.length>0 && !postAble){
            window.alert('소속명을 입력하세요.')
        }else{
            setMode(null)
        }
    }

    const addHandler = () => {
        if (!mode) {
            setMode('add')
            return
        }
        const postAble = addInputRef.current.value !== ''
        if (postAble) {
            saveStockCateApi({stockCateName: addInputRef.current.value})
                .then((status) => {
                    if(status === 200){
                        window.alert('저장이 완료되었습니다.')
                        setMode(null)
                }
                })
        }else {
            window.alert('소속명을 입력하세요.')
        }
    }

    const deleteHandler=(cate:StockCate)=>{
        const deleteRequest = ()=>{
            deleteStockCateApi(cate).then((status)=>{
                if(status === 200){
                    window.alert('삭제가 완료되었습니다.')
                    setMode(null)
                }
            })
        }
        useConfirm('정말로 삭제하시겠습니까?', deleteRequest)
    }

    return  { addInputRef, cateState, mode, setMode, setCateState,addHandler,deleteHandler,editHandler}
}