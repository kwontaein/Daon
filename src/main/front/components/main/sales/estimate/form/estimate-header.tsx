'use client'
import '@/styles/form-style/form.scss';

import Image from 'next/image';
import asideArrow from '@/public/assets/aside-arrow.gif';
import {ResponseCompany} from '@/model/types/staff/company/type';
import {ChangeEvent, startTransition, useActionState, useEffect, useMemo, useRef, useState} from 'react';
import {ResponseTask} from '@/model/types/sales/task/type';

import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import EstimateForm from './estimate-form';
import {ResponseEstimate} from '@/model/types/sales/estimate/type';
import {ResponseCustomer} from '@/model/types/customer/customer/type';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import dayjs from 'dayjs';
import {useConfirm} from '@/hooks/share/useConfirm';
import estimateRegisterAction from '@/features/sales/estimate/action/estimateRegisterAction';
import useChangeMode from '@/hooks/share/useChangeMode';
import { UserInfo, useUserInformation } from '@/store/zustand/userInfo';
import { notFound } from 'next/navigation';

export default function EstimateHeader({companyList, task, estimate, mode, userInfo, isMobile = false}: {
    companyList: ResponseCompany[],
    mode: 'write' | 'detail' | 'edit',
    task?: ResponseTask,
    estimate?: ResponseEstimate,
    userInfo?: UserInfo
    isMobile?:boolean,
}) {

    const {user} = useUserInformation()

    useEffect(()=>{
        if(!userInfo && !user){
            notFound()
        }
    },[])

    //task를 전달받으면 업무에서 처음 견적서를 작성하는 것이다.
    const initialState = useMemo(() => {
        if (task) {
            return {
                taskId: task.taskId,
                estimateDate: dayjs(task.createdAt).format('YYYY-MM-DD'),
                customerId: task.customer.customerId,
                customerName: task.customer.customerName,
                mode: 'write', //견적서가 존재하지 않으면 write mode임
                assignedUser: task.assignedUser.name
            }
        } else if (estimate) {
            return {
                taskId: estimate?.taskResponse?.taskId,
                ...estimate,
                estimateDate: dayjs(estimate.estimateDate).format('YYYY-MM-DD'),
                customerId: estimate.customerId,
                customerName: estimate.customerName,
                mode,
                userId: estimate.userId,
                assignedUser: estimate.userName
            }
        } else {
            return {
                assignedUser: user?.name ?? userInfo.name,
                userId: user?.userId
            }
        }

    }, [task, estimate, mode, user])

    const [state, action, isPending] = useActionState(estimateRegisterAction, initialState)
    const initialCompany = estimate ? companyList.find(({companyId}) => companyId === estimate.company.companyId) : companyList[0]
    const [company, setCompany] = useState<ResponseCompany>(initialCompany)
    const changeModeHandler = useChangeMode()

 
    const companyHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (mode === 'detail') return
        const company = companyList.find(({companyId}) => companyId === e.target.value)
        setCompany(company)
    }
    const formRef = useRef(null)

    const submitEstimateHandler = () => {
        if (isPending) return
        if (task?.completeAt) {
            window.alert('처리가 완료된 업무의 견적서는 수정 및 삭제가 불가능합니다.')
            return
        }
        if (!state.customerId) {
            window.alert('거래처를 선택해주세요')
            return
        }

        const submit = () => {
            const formData = new FormData(formRef.current);
            formData.set('action', mode)
            startTransition(() => {
                action(formData)
            })
        }
        if (state.mode === 'edit' && state.items.length === 0) {
            useConfirm('항목이 존재하지 않으면 견적서는 삭제됩니다. 정말로 수정하시겠습니까?', submit)
        } else {
            submit()
        }

    }

    useEffect(() => {
        if (state.formErrors) {
            window.alert(state.formErrors.message)
        }
        if (state.status) {
            if (state.status === 200) {
                if (state.mode === 'edit') {
                    setTimeout(() => {
                        window.alert('견적서를 수정했습니다.')
                        changeModeHandler('detail');
                    }, 100)
                } else {
                    window.alert('견적서를 등록했습니다.')
                    isMobile ? window.history.back() :window.close();
                }
            } else {
                window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
    }, [state])


    //거래처 검색관련
    const checkCustomerName = () => !!state.customerId

    const changeHandler = (
        customerInfo: Pick<ResponseCustomer,
            'customerName' | 'customerId'>,
    ) => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formData.set('customerName', customerInfo.customerName || '')
            formData.set('customerId', customerInfo.customerId || '')
            startTransition(() => {
                action(formData)
            })
        }
    }

    const searchCustomerHandler = useSearchCustomer(checkCustomerName, changeHandler)


    return (
        <section className='register-form-container' style={{padding: '8px', boxSizing: 'border-box'}}>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>
                    {mode === 'detail' && '견적서 상세보기'}
                    {mode === 'edit' && '견적서 수정하기'}
                    {mode === 'write' && '견적서 작성하기'}
                </h4>
            </header>
            <form action={action} ref={formRef}>
                <table className='register-form-table'>
                    <colgroup>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '35%'}}/>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '35%'}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <td className='table-label'>사업자선택</td>
                        <td>
                            <select className='bg-memo' name='companyId' value={company.companyId}
                                    onChange={(e) => companyHandler(e)}>
                                {companyList.map((company) => (
                                    <option key={company.companyId}
                                            value={company.companyId}>{company.companyName}</option>
                                ))}
                            </select>
                        </td>
                        <td className='table-label'>상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호</td>
                        <td>{company.printName}</td>
                    </tr>
                    <tr>
                        <td className='table-label'>일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;자</td>
                        <td>
                            <CustomDateInput defaultValue={state.estimateDate} name='estimateDate'
                                             readOnly={mode === 'detail'}/>
                        </td>
                        <td className='table-label'>등록번호</td>
                        <td>{company.businessNumber}</td>
                    </tr>
                    <tr>
                        <td className='table-label'>업&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;체</td>
                        <td>
                            <input
                                type='text'
                                name='customerName'
                                defaultValue={state.customerName}
                                key={state.customerName}
                                readOnly={task ? true : mode === 'detail'}
                                onKeyDown={(e) => searchCustomerHandler(e)}/>
                            <input type='hidden' name='customerId' defaultValue={state.customerId}
                                   key={state.customerId || 'customerId'} readOnly/>
                        </td>
                        <td className='table-label'>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표</td>
                        <td>{company.ceo}</td>
                    </tr>
                    <tr>
                        <td className='table-label'>담당기사</td>
                        <td>
                            <input type='text' name='assignedUser' value={state.assignedUser??''} readOnly/>
                            <input type='hidden' name='userId' value={state.userId??''} key={state.userId+'userId'}readOnly/>
                        </td>
                        <td className='table-label'>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</td>
                        <td>
                            <div className='break-word-div'>
                                {company.address}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <EstimateForm estimateState={estimate} submit={submitEstimateHandler} mode={mode} task={task??estimate?.taskResponse} isMobile={isMobile}/> 

            </form>
        </section>
    )
}