'use client'
import {useState, useRef, useEffect} from "react";

import { createPointApi, updatePointApi } from "../../../features/stock/point/api/server-api";
import { selectConfrim } from "@/hooks/share/selectConfrim";
import { StockPoint } from "@/model/types/stock/point/types";
import { CateMode } from "@/model/types/share/type";
import { deletePointApi } from "@/features/stock/point/api/client-api";

export default function useStockPoint(InitStockPoint:StockPoint[]){
    const [pointState, setPointState] = useState<StockPoint[]>(InitStockPoint)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)
   
    useEffect(()=>{
        if(mode!==null) return
        setPointState(InitStockPoint)
    },[InitStockPoint])

    const editHandler = () => {
        if (!mode) {
            setMode('edit')
            return
        }
        const postPoint = pointState.filter(({stockPointName}, index) =>
            InitStockPoint[index].stockPointName !== stockPointName)
        const postAble = postPoint.every(({stockPointName}) => stockPointName !== '')
        if (postPoint.length>0 && postAble) {
            updatePointApi(postPoint).then((status) => {
                if(status === 200){
                    window.alert('수정이 완료되었습니다.')
                    setMode(null)
                }
            })
        } else if(postPoint.length>0 && !postAble){
            window.alert('적릭금율을 입력하세요.')
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
            createPointApi({stockPointName: addInputRef.current.value})
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

    const deleteHandler=(point:StockPoint)=>{
        const deleteRequest = ()=>{
            deletePointApi(point).then((status)=>{
                if(status === 200){
                    setMode(null)
                }
            })
        }
        selectConfrim('정말로 삭제하시겠습니까?', deleteRequest)
    }

    return  { addInputRef, pointState, mode, setMode, setPointState,addHandler,deleteHandler,editHandler}
}