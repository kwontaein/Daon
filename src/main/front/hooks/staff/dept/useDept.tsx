'use client'
import {useState, useRef, useEffect} from "react";

import { createDeptApi, updateDeptApi } from "../../../features/staff/dept/api/server-api";
import { selectConfrim } from "@/hooks/share/selectConfrim";
import { CateMode } from "@/model/types/share/type";
import { Dept } from "@/model/types/staff/dept/type";
import { deleteDeptApi } from "@/features/staff/dept/api/client-api";

export default function useDept(InitDept:Dept[]){
    const [deptState, setDeptState] = useState<Dept[]>(InitDept)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if(mode!==null) return
        setDeptState(InitDept)
    },[InitDept])

    const editHandler = () => {
        if (!mode) {
            setMode('edit')
            return
        }
        const postDept = deptState.filter(({deptName}, index) =>
            InitDept[index].deptName !== deptName)
        const postAble = postDept.every(({deptName}) => deptName !== '')
        if (postDept.length>0 && postAble) {
            updateDeptApi(postDept).then((status) => {
                if(status === 200){
                    window.alert('수정이 완료되었습니다.')
                    setMode(null)
                }else{
                    window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
                }
            })
        } else if(postDept.length>0 && !postAble){
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
            createDeptApi({deptName: addInputRef.current.value})
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

    const deleteHandler=(dept:Dept)=>{
        const deleteRequest = ()=>{
            deleteDeptApi(dept).then((status)=>{
                if(status === 200){
                    setMode(null)
                }
            })
        }
        selectConfrim('정말로 삭제하시겠습니까?', deleteRequest)
    }

    return  { addInputRef, deptState, mode, setMode, setDeptState,addHandler,deleteHandler,editHandler}
}