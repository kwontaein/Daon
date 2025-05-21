'use client'
import React, { startTransition, useActionState, useCallback, useEffect, useRef } from "react"
import asideArrow from '@/assets/aside-arrow.gif';

import '@/styles/form-style/form.scss';
import Image from "next/image";
import { useConfirm } from "@/hooks/share/useConfirm";
import {  postTaskComplete } from "@/features/sales/task/api/taskApi";
import { useRouter } from "next/navigation";


const actionTakenAction = async(prevState, formData)=>{
    const actionTaken =formData.get('actionTaken')
    const action = formData.get('action')
    const taskId = formData.get('taskId')


    if(action==='submit'){
        const status = await postTaskComplete(taskId,actionTaken)
        return {status}
    }
}

export default function ActionTaken({children, taskId, isMobile}:{
    children: React.ReactNode,
    taskId:string,
    isMobile?:boolean
}){
    const [state, action, isPending] = useActionState(actionTakenAction,{})
    const formRef = useRef(null)
    const router = useRouter()


    useEffect(()=>{
        if(state.status){
            if(state.status===200){
                window.alert('업무처리가 완료되었습니다.')
                isMobile ? window.history.back() :window.close()
            }else{
                window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
    },[state])
    const submitHandler = useCallback(() => {
        const submit = ()=>{
            const formData = new FormData(formRef.current);
            formData.set('action', 'submit');
            startTransition(() => {
                action(formData);
            });
        }
        useConfirm('조치가 완료된 후에는 견적서를 작성/수정 하실 수 없습니다. 실행하시겠습니까?', submit)
    }, [action]);

    return(
        <form className="register-form-container" action={action} ref={formRef}>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>
                    업무처리
                </h4>
            </header>
            <p style={{color:'red', fontSize:'14px', marginBottom:'5px'}}>※ 조치완료 후 견적서를 작성/수정 하실 수 없습니다.</p>
            <table className="register-form-table">
                <tbody>
                    {children}
                </tbody>
            </table>
            <input type="hidden" name='taskId' value={taskId??''} readOnly />
            <div className="button-container">
                <button type='button' onClick={submitHandler} disabled={isPending}>처리확인</button>
                <button type='button' onClick={()=> isMobile? router.back(): window.close()}>취소</button>
            </div>
        </form>
    )
}