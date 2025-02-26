'use client'
import {useState, useRef} from "react";

import { createDeptApi, deleteDeptApi, updateDeptApi } from "./deptApi";
import { useConfirm } from "@/hooks/share/useConfrim";
import { CateMode } from "@/types/share/type";
import { Dept } from "@/types/staff/dept/type";

export default function useDept(InitDept:Dept[]){
    const [deptState, setDeptState] = useState<Dept[]>(InitDept)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)


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
                    window.alert('삭제가 완료되었습니다.')
                    setMode(null)
                }
            })
        }
        useConfirm('정말로 삭제하시겠습니까?', deleteRequest,()=>{})
    }

    return  { addInputRef, deptState, mode, setMode, setDeptState,addHandler,deleteHandler,editHandler}
}