'use client'
import {useState, useRef} from "react";

import { createCateApi, deleteCateApi, updateCateApi } from "./staffCateApi";
import { useConfirm } from "@/hooks/share/useConfrim";
import { StaffCate } from "@/types/staff/cate/type";
import { CateMode } from "@/types/share/type";

export default function useStaffCate(InitStaffCate:StaffCate[]){
    const [cateState, setCateState] = useState<StaffCate[]>(InitStaffCate)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)


    const editHandler = () => {
        if (!mode) {
            setMode('edit')
            return
        }
        const postCate = cateState.filter(({staffCateName}, index) =>
            InitStaffCate[index].staffCateName !== staffCateName)
        const postAble = postCate.every(({staffCateName}) => staffCateName !== '')
        if (postCate.length>0 && postAble) {
            updateCateApi(postCate).then((status) => {
                if(status === 200){
                    window.alert('수정이 완료되었습니다.')
                    setMode(null)
                }
            })
        } else if(postCate.length>0 && !postAble){
            window.alert('부서명을 입력하세요.')
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
            createCateApi({staffCateName: addInputRef.current.value})
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

    const deleteHandler=(cate:StaffCate)=>{
        const deleteRequest = ()=>{
            deleteCateApi(cate).then((status)=>{
                if(status === 200){
                    window.alert('삭제가 완료되었습니다.')
                    setMode(null)
                }
            })
        }
        useConfirm('정말로 삭제하시겠습니까?', deleteRequest,()=>{})
    }

    return  { addInputRef, cateState, mode, setMode, setCateState,addHandler,deleteHandler,editHandler}
}