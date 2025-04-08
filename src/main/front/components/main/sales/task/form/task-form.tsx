'use client'
import '@/styles/form-style/form.scss';

import {startTransition, useActionState, useEffect, useMemo, useRef} from 'react';
import asideArrow from '@/assets/aside-arrow.gif';
import Image from 'next/image';

import {ResponseEmployee} from '@/model/types/staff/employee/type';
import {ResponseCustomer} from '@/model/types/customer/customer/type';
import {ResponseTask, TaskEnumType} from '@/model/types/sales/task/type';

import taskRegisterAction from '@/features/sales/task/action/taskRegisterAction';
import ErrorBox from '@/components/share/error-box/error-box';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import ActionTakenContent from '../action-taken/content';
import useChangeMode from '@/hooks/share/useChangeMode';

export default function TaskForm({employees, task, mode}: {
    employees: ResponseEmployee[],
    task?: ResponseTask,
    mode: 'write' | 'detail' | 'edit'
}) {
    const initialTask = {
        ...task,
        customer: task?.customer?.customerName,
        customerId: task?.customer?.customerId,
        assignedUser: task?.assignedUser?.userId
    }
    const [state, action, isPending] = useActionState(taskRegisterAction, {taskType: 'AS', ...initialTask, mode: mode})
    const formRef = useRef<HTMLFormElement | null>(null);
    const changeModeHandler = useChangeMode()


    const checkCustomerName = () => !!state.customerId

    const changeHandler = (
        customerInfo: Pick<ResponseCustomer,
            'customerName' | 'customerId'>,
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
        formData.set('action', 'submit')
        startTransition(() => {
            action(formData)
        })
    }

    useEffect(() => {
        if (!state.result) return
        if (state.result === 200) {
            if (mode === 'write') {
                window.alert('업무를 등록했습니다.')
                window.close()
            } else {
                window.alert('업무수정이 완료되었습니다.')
                changeModeHandler('detail')
            }
        } else {
            window.alert('문제가 발생했습니다. 잠시후 다시 시도해주세요.')
        }
    }, [state])

    const memoizedTaskType = useMemo(() => {
        return (
            <div>
                {Object.entries(TaskEnumType).map(([key, value]) => (
                    <label key={key}>
                        <input
                            type='radio'
                            name='taskType'
                            value={key}
                            defaultChecked={state.taskType === key}
                        />{value}
                    </label>
                ))}
            </div>
        )
    }, [])

    return (
        <>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15} priority/>
                <h4>
                    {mode === 'write' && '업무등록'}
                    {mode === 'detail' && '업무 상세보기'}
                    {mode === 'edit' && '업무수정'}
                </h4>
            </header>
            <form className='register-form-container' action={action} ref={formRef}>
                <table className='register-form-table'>
                    <tbody>
                    <tr>
                        <td className='table-label'>구분</td>
                        <td className='table-radio-container' colSpan={3}>
                            {mode === 'detail' ? TaskEnumType[task.taskType] : memoizedTaskType}
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처선택</td>
                        <td><input name='customer'
                                   key={state.customer}
                                   defaultValue={state.customer}
                                   onChange={(e) => !!state.customerId && (e.target.value = state.customer)}
                                   onKeyDown={(e) => searchCustomerHandler(e)}
                                   readOnly={mode === 'detail'}/>
                        </td>
                        <td className='table-label'>의뢰자명</td>
                        <td><input name='requesterName' defaultValue={state.requesterName}
                                   readOnly={mode === 'detail'}/></td>
                    </tr>
                    <tr>
                        <td className='table-label'>의뢰자 연락처</td>
                        <td><input name='requesterContact' defaultValue={state.requesterContact}
                                   readOnly={mode === 'detail'}/></td>
                        <td className='table-label'>의뢰자 휴대폰</td>
                        <td><input name='requesterContact2' defaultValue={state.requesterContact2}
                                   readOnly={mode === 'detail'}/></td>
                    </tr>
                    <tr>
                        <td className='table-label'>모델</td>
                        <td><input name='model' defaultValue={state.model} readOnly={mode === 'detail'}/></td>
                        <td className='table-label'>담당기사</td>
                        <td>
                            {mode !== 'detail' ?
                                <>
                                    <select name='assignedUser' defaultValue={state.assignedUser}
                                            key={state.assignedUser+'assignedUser'}>
                                        <option value='none'>미지정</option>
                                        {employees.map(({userId, name}) =>
                                            <option key={userId} value={userId}>{name}</option>
                                        )}
                                    </select>
                                    {state.error &&
                                        <ErrorBox key={state.error.key}>
                                            {state.error.message}
                                        </ErrorBox>}
                                </>
                                : task.assignedUser.name
                            }
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>내용</td>
                        <td className='big-memo' colSpan={3}>
                            <textarea name='details' defaultValue={state.details} readOnly={mode === 'detail'}/>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>비고</td>
                        <td className='big-memo' colSpan={3}>
                            <textarea name='remarks' defaultValue={state.remarks} readOnly={mode === 'detail'}/>
                        </td>
                    </tr>
                    {mode !== 'write' &&
                        <ActionTakenContent details={state.details} actionTaken={state.actionTaken} mode={mode}/>
                    }
                </tbody>
            </table>
            <div className='button-container'>
                <button type='button' onClick={()=>{
                    mode==='detail' ? changeModeHandler('edit'): submitTaskHandler()
                }}>{mode ==='detail'? '수정': '저장'}</button>
                <button type='button' onClick={()=>{
                    mode==='edit' ? changeModeHandler('detail'): window.close()
                }}>취소</button>
            </div>
        </form>

        </>
    )
}