'use client'
import {useState, useRef} from "react";

import { useConfirm } from "@/hooks/share/useConfirm";
import { deleteOfficialApi, saveOfficialApi, updateOfficialApi } from "@/features/sales/official/api/officialApi";
import { Official } from "@/model/types/receipt/type";

export default function useOfficial(InitialOfficial:Official[]){
    const [officialState, setOfficialState] = useState<Official[]>(InitialOfficial)
    const [mode, setMode] = useState(null)
    const addInputRef = useRef<HTMLInputElement>(null)


    const editHandler = () => {
        if (!mode) {
            setMode('edit')
            return
        }
        const postOfficial = officialState.filter(({officialName}, index) =>
            InitialOfficial[index].officialName !== officialName)
        const postAble = postOfficial.every(({officialName}) => officialName !== '')
        if (postOfficial.length>0 && postAble) {
            updateOfficialApi(postOfficial).then((status) => {
                if(status === 200){
                    window.alert('수정이 완료되었습니다.')
                    setMode(null)
                }
            })
        } else if(postOfficial.length>0 && !postAble){
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
            saveOfficialApi(officialState)
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

    const deleteHandler=(official:Official)=>{
        const deleteRequest = ()=>{
            deleteOfficialApi(official).then((status)=>{
                if(status === 200){
                    window.alert('삭제가 완료되었습니다.')
                    setMode(null)
                }
            })
        }
        useConfirm('정말로 삭제하시겠습니까?', deleteRequest,()=>{})
    }

    return  { addInputRef, officialState, mode, setMode, setOfficialState,addHandler,deleteHandler,editHandler}
}