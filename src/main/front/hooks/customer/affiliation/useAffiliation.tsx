'use client'
import {useState, useRef} from "react";
import {Affiliation} from "@/model/types/customer/affiliation/type";

import { useConfirm } from "@/hooks/share/useConfirm";
import { CateMode } from "@/model/types/share/type";
import { updateAffiliationApi, saveAffiliationApi, deleteAffiliationApi } from "@/features/customer/affiliation/api/customerCateApi";

export default function useAffiliation(InitAffiliation:Affiliation[]){
    const [affiliationState, setAffiliationState] = useState<Affiliation[]>(InitAffiliation)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)


    const editHandler = () => {
        if (!mode) {
            setMode('edit')
            return
        }
        const postCate = affiliationState.filter(({affiliationName}, index) =>
            InitAffiliation[index].affiliationName !== affiliationName)
        const postAble = postCate.every(({affiliationName}) => affiliationName !== '')
        if (postCate.length>0 && postAble) {
            updateAffiliationApi(postCate).then((status) => {
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
            saveAffiliationApi({affiliationName: addInputRef.current.value})
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

    const deleteHandler=(cate:Affiliation)=>{
        const deleteRequest = ()=>{
            deleteAffiliationApi(cate).then((status)=>{
                if(status === 200){
                    window.alert('삭제가 완료되었습니다.')
                    setMode(null)
                }
            })
        }
        useConfirm('정말로 삭제하시겠습니까?', deleteRequest,()=>{})
    }

    return  { addInputRef, affiliationState, mode, setMode, setAffiliationState,addHandler,deleteHandler,editHandler}
}