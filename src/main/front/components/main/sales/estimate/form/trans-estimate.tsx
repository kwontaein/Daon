'use client'
import '@/styles/form-style/form.scss'

import Image from 'next/image'
import asideArrow from '@/public/assets/aside-arrow.gif';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { startTransition, useActionState, useEffect, useRef } from 'react';
import { transEstimateToReceiptApi } from '@/features/sales/estimate/api/server-api';

const transEstimateAction = async (prevState, formData)=>{
    const formState = {
        receiptDate:new Date(formData.get('receiptDate')),
        note:formData.get('note'),
        estimateId: formData.get('estimateId')
    }
    const status = await transEstimateToReceiptApi(formState) 

    return {
        ...formState,
        status
    }
    
}

export default function TransEstimate({estimateId, isMobile}:{estimateId:string, isMobile?:boolean}){
    const formRef = useRef(null)
    const [state, action, isPending] = useActionState(transEstimateAction,{})

    const submitHandler =() => {
        const formData = new FormData(formRef.current);
        formData.set('estimateId',estimateId)
        startTransition(() => {
            action(formData);
        });
    }

    useEffect(()=>{
        if(state.status){
            if(state.status===200){
                window.alert('전표전환이 완료되었습니다.')
                window.close()
            }else{
                window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
    },[state])
    
    return(
        <section className='register-form-container' style={{padding:'8px', boxSizing:'border-box'}}>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>전표전환</h4>
            </header>
            <form action={action} ref={formRef}>
                <table className='register-form-table'>
                    <tbody>
                        <tr>
                            <td className='table-label'>처리일자</td>
                            <td>
                                <CustomDateInput defaultValue={state.receiptDate} name='receiptDate'/>
                            </td>
                        </tr>
                        <tr>
                            <td className='table-label'>비고</td>
                            <td><textarea name='note' defaultValue={state.note}/></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div className='button-container'>
                <button onClick={submitHandler} disabled={isPending}>전표전환</button>
                <button onClick={()=>{isMobile? window.history.back():window.close()}}>취소</button>
            </div>
       </section>
    )
}