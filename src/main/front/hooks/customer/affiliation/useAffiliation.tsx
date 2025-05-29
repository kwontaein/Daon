'use client'
import {useState, useRef, useEffect} from "react";
import {AffiliationType} from "@/model/types/customer/affiliation/type";

import { CateMode } from "@/model/types/share/type";
import { updateAffiliationApi, saveAffiliationApi } from "@/features/customer/affiliation/api/server-api";
import { deleteAffiliationApi } from "@/features/customer/affiliation/api/client-api";
import { selectConfrim } from "@/hooks/share/selectConfrim";

export default function useAffiliation(InitAffiliation:AffiliationType[]){
    const [affiliationState, setAffiliationState] = useState<AffiliationType[]>(InitAffiliation)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if(mode!==null) return
        setAffiliationState(InitAffiliation)
    },[InitAffiliation])

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

    const deleteHandler=(cate:AffiliationType)=>{
        const deleteRequest = ()=>{
            deleteAffiliationApi(cate).then((status)=>{
                if(status === 200){
                    setMode(null)
                }
            })
        }
        selectConfrim('정말로 삭제하시겠습니까?', deleteRequest)
    }

    return  { addInputRef, affiliationState, mode, setMode, setAffiliationState,addHandler,deleteHandler,editHandler}
}