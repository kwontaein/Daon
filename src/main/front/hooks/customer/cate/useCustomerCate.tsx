'use client'
import {useState, useRef} from "react";
import {CustomerCate} from "@/model/types/customer/cate/type";

import { saveCustomerCateApi, deleteCustomerCateApi, updateCustomerCateApi } from "../../../features/customer/category/api/customerCateApi";
import { useConfirm } from "@/hooks/share/useConfirm";
import { CateMode } from "@/model/types/share/type";

export default function useCustomerCate(InitCustomerCate:CustomerCate[]){
    const [cateState, setCateState] = useState<CustomerCate[]>(InitCustomerCate)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)


    const editHandler = () => {
        if (!mode) {
            setMode('edit')
            return
        }
        const postCate = cateState.filter(({customerCateName}, index) =>
            InitCustomerCate[index].customerCateName !== customerCateName)
        const postAble = postCate.every(({customerCateName}) => customerCateName !== '')
        if (postCate.length>0 && postAble) {
            updateCustomerCateApi(postCate).then((status) => {
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
            saveCustomerCateApi({customerCateName: addInputRef.current.value})
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

    const deleteHandler=(cate:CustomerCate)=>{
        const deleteRequest = ()=>{
            deleteCustomerCateApi(cate).then((status)=>{
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