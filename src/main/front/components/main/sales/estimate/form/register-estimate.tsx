'use client'
import '@/styles/form-style/form.scss';

import Image from 'next/image';
import asideArrow from '@/assets/aside-arrow.gif';
import { ResponseCompany } from '@/model/types/staff/company/type';
import { ChangeEvent, startTransition, useActionState, useEffect, useMemo, useRef, useState } from 'react';
import { ResponseTask } from '@/model/types/sales/task/type';

import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import EstimateForm from './estimate-form';
import { ResponseEstimate } from '@/model/types/sales/estimate/type';
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import dayjs from 'dayjs';
import { useConfirm } from '@/hooks/share/useConfirm';
import estimateRegisterAction from '@/features/sales/estimate/action/estimateRegisterAction';

export default function RegisterEstimate({companyList, task, estimate, mode} : {
    companyList: ResponseCompany[],
    mode: string
    task?: ResponseTask,
    estimate?: ResponseEstimate |undefined,
}) {
    const initialState = useMemo(()=>{
        return{
            taskId: task?.taskId,
            ...estimate,
            estimateDate: dayjs(estimate? estimate.estimateDate : task?.createdAt).format('YYYY-MM-DD'),
            customerId: estimate? estimate.customerId : task.customer.customerId,
            customerName: estimate? estimate.customerName : task.customer.customerName,
            mode: estimate ? mode : 'write',
        }
    },[task, estimate,mode]) 

    const [state,action,isPending] = useActionState(estimateRegisterAction, initialState)

    const initialCompany = estimate ? companyList.find(({companyId})=>companyId === estimate.company.companyId): companyList[0] 
    const [company, setCompany] = useState<ResponseCompany>(initialCompany)

    const companyHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
        if(mode==='detail') return
        const company = companyList.find(({companyId})=> companyId ===e.target.value)
        setCompany(company)
    }
    const formRef = useRef(null)
    
    const submitEstimateHandler = ()=>{
        if(!state.customerId){
            window.alert('거래처를 선택해주세요')
            return
        }

        const submit = ()=>{
            const formData = new FormData(formRef.current);
            formData.set('action','submit')
            startTransition(()=>{
                action(formData)
            }) 
        }
        if(state.mode==='edit' && state.items.length===0){
            useConfirm('항목이 존재하지 않으면 견적서가 삭제됩니다. 정말로 수정하시겠습니까?',submit,()=>{})
        }else{
            submit()
        }
       
    }

    useEffect(()=>{
        if(state.formErrors){
            window.alert(state.formErrors.message)
        }
        if(state.status){
            if(state.status === 200){
                window.alert('견적서를 등록했습니다.')
                window.close();
            }else{
                window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
    },[state])


    //거래처 검색관련
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


    return(
        <section className='register-form-container' style={{padding:'8px', boxSizing:'border-box'}}>
             <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>견적서 작성하기</h4>
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
                            <select className='bg-memo' name='companyId' value={company.companyId} onChange={(e)=>companyHandler(e)}>
                                {companyList.map((company)=>(
                                    <option key={company.companyId} value={company.companyId}>{company.companyName}</option>
                                ))}
                            </select>
                        </td>
                        <td className='table-label'>상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호</td>
                        <td>{company.printName}</td>
                    </tr>
                    <tr>
                        <td className='table-label'>일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;자</td>
                        <td>
                            <CustomDateInput defaultValue={state.estimateDate} name={'estimateDate'}/>
                        </td>
                        <td className='table-label'>등록번호</td>
                        <td>{company.businessNum}</td>
                    </tr>
                    <tr>
                        <td className='table-label'>업&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;체</td>
                        <td>
                            <input type='text' name='customerName' defaultValue={state.customerName} key={state.customerName} readOnly={state.mode!=='edit'} onKeyDown={(e)=> state.mode==='edit' && searchCustomerHandler(e)}/>
                            <input type='hidden' name='customerId' defaultValue={state.customerId} key={state.customerId} readOnly/>
                        </td>
                        <td className='table-label'>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표</td>
                        <td>{company.ceo}</td>
                    </tr>
                    <tr>
                        <td className='table-label'>담당기사</td>
                        <td>
                            <input type='text' name='assignedUser' defaultValue={estimate? estimate.userName : task.assignedUser.name} readOnly/>
                            <input type='hidden' name='userId' value={estimate ? estimate.userId : task.assignedUser.userId} readOnly/>
                        </td>
                        <td className='table-label'>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</td>
                        <td>{company.address}</td>
                    </tr>
                </tbody>
            </table>
            <EstimateForm estimateState={estimate} submit={submitEstimateHandler} mode={state.mode} /> 
            </form>
        </section>
    )
}