'use client'
import React, { startTransition, useActionState, useCallback, useEffect, useRef } from "react"
import asideArrow from '@/assets/aside-arrow.gif';

import '@/styles/form-style/form.scss';
import Image from "next/image";
import { useConfirm } from "@/hooks/share/useConfirm";
import { postActionTakenConversion, postActionTakenProcessing } from "@/features/sales/task/api/taskApi";


const actionTakenAction = async(prevState, formData)=>{
    formData.get('actionTaken')
    const action = formData.get('action')
    const taskId = formData.get('taskId')


    if(action==='processing'){
        const status = await postActionTakenProcessing(taskId)
    }else if(action ==='conversion'){
        const status = await postActionTakenConversion(taskId)
    }
}

export default function ActionTaken({children, taskId}:{
    children: React.ReactNode,
    taskId:string,
}){
    const [state, action, isPending] = useActionState(actionTakenAction,{})
    const formRef = useRef(null)
   


    useEffect(()=>{
        if(state.status){
            state.status===200
        }
    },[state])
    const submitHandler = useCallback((actionState:string) => {
        const submit = ()=>{
            const formData = new FormData(formRef.current);
            formData.set('action', actionState);
            startTransition(() => {
                action(formData);
            });
        }
        useConfirm('조치가 완료된 후에는 견적서를 작성/수정 하실 수 없습니다. 실행하시겠습니까?', submit, ()=>{})
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
            <input type="hidden" value={taskId??''} readOnly />
            <div className="button-container">
                <button type="button" onClick={submitHandler.bind(null,'conversion')}>입고전환</button>
                <button type='button' onClick={submitHandler.bind(null,'processing')}>처리확인</button>
                <button onClick={()=>window.close()}>취소</button>
            </div>
        </form>
    )
}