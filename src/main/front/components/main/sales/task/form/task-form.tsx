'use client'
import '@/styles/form-style/form.scss';

import { startTransition, useActionState, useCallback, useEffect, useRef, useState } from 'react';
import asideArrow from '@/assets/aside-arrow.gif';
import Image from 'next/image';

import { ResponseEmployee } from '@/model/types/staff/employee/type';
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { ResponseTask } from '@/model/types/task/task/type';

import taskRegisterAction from '@/features/sales/task/action/taskRegisterAction';
import ErrorBox from '@/components/share/error-box/error-box';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';

export default function TaskForm({employees, task}:{employees:ResponseEmployee[],task?:ResponseTask}){
    const [state, action, isPending] = useActionState(taskRegisterAction,{taskType:'AS'})
    const formRef = useRef<HTMLFormElement|null>(null);

    const checkCustomerName = () => !!state.customerId

    const changeHandler = (
        customerInfo : Pick < ResponseCustomer,
        'customerName' | 'customerId' >,
    ) => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formData.set('customer', customerInfo.customerName || '')
            formData.set('customerId', customerInfo.customerId || '')
            startTransition(() => {
                action(formData)
            })
        }
    }

    const searchCustomerHandler = useSearchCustomer(checkCustomerName, changeHandler)

    const submitTaskHandler = ()=>{
        if(isPending) return
        if(!state.customerId){
            window.alert('거래처를 선택해주세요')
            return
        }
        const formData = new FormData(formRef.current);
        formData.set('action','submit')
        startTransition(()=>{
            action(formData)
        }) 
    }

    useEffect(()=>{
        if(!state.result) return
        if(state.result===200){
                window.alert('업무를 등록했습니다.')
                window.close()
        }else{
            window.alert('문제가 발생했습니다. 잠시후 다시 시도해주세요.')
        }
    },[state])

    return(
        <>
        {!task &&
        <header className="register-header">
            <Image src={asideArrow} alt=">" width={15} priority/>
            <h4>업무등록</h4>
        </header>
        }
        <form className='register-form-container' action={action} ref={formRef}>
            <table className='register-form-table'>
                <tbody>
                    <tr>
                        <td className='table-label'>구분</td>
                        <td className='table-radio-container' colSpan={3}>
                            <div>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='AS'
                                defaultChecked={state.taskType ==='AS'}
                                />A/S</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='INCOMING'
                                defaultChecked={state.taskType ==='INCOMING'}
                               />입고</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='DELIVERY'
                                defaultChecked={state.taskType ==='DELIVERY'}
                                />납품</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='INVENTORY'
                                defaultChecked={state.taskType ==='INVENTORY'}
                                />재고</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='OTHER'
                                defaultChecked={state.taskType ==='OTHER'}
                                />기타</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='RENTAL'
                                defaultChecked={state.taskType ==='RENTAL'}
                                />임대</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='MAINTENANCE'
                                defaultChecked={state.taskType ==='MAINTENANCE'}
                                />유지보수</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='ATTENDANCE'
                                defaultChecked={state.taskType ==='ATTENDANCE'}
                                />근태</label>
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처선택</td>
                        <td><input name='customer' 
                                   key={state.customer} 
                                   defaultValue={state.customer} 
                                   onChange={(e) => !!state.customerId && (e.target.value = state.customer) }
                                   onKeyDown={(e)=>searchCustomerHandler(e)}/></td>
                        <td className='table-label'>의뢰자명</td>
                        <td><input name='requesterName' defaultValue={state.requesterName}/></td>
                    </tr>
                    <tr>
                        <td className='table-label'>의뢰자 연락처</td>
                        <td><input name='requesterContact' defaultValue={state.requesterContact}/></td>
                        <td className='table-label'>의뢰자 휴대폰</td>
                        <td><input name='requesterContact2' defaultValue={state.requesterContact2}/></td>
                    </tr>
                    <tr>
                        <td className='table-label'>모델</td>
                        <td><input name='model' defaultValue={state.model}/></td>
                        <td className='table-label'>담당기사</td>
                        <td>
                            <select name='assignedUser' defaultValue={state.assignedUser} key={state.assignedUser}>
                                <option value='none'>미지정</option>
                                {employees.map(({userId, name})=>
                                    <option key={userId} value={userId}>{name}</option>
                                )}
                            </select>
                            {state.error &&
                                <ErrorBox key={state.error.key}>
                                    {state.error.message}
                                </ErrorBox>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>내용</td>
                        <td className='big-memo' colSpan={3}>
                            <textarea name='details' defaultValue={state.details}/>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>비고</td>
                        <td className='big-memo' colSpan={3}>
                            <textarea name='remarks' defaultValue={state.remarks}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='button-container'>
                <button type='button' onClick={submitTaskHandler}>저장</button>
                <button type='button' onClick={()=>window.close()}>취소</button>
            </div>
        </form>
        </>
    )
}