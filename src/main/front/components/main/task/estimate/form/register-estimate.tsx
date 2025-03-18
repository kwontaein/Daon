'use client'
import '@/styles/form-style/form.scss';

import Image from 'next/image';
import asideArrow from '@/assets/aside-arrow.gif';
import { ResponseCompany } from '@/model/types/staff/company/type';
import { ChangeEvent, startTransition, useActionState, useEffect, useMemo, useRef, useState } from 'react';
import estimateRegisterAction, { initialEstimate } from '@/features/task/estimate/action/estimateRegister';
import { ResponseTask } from '@/model/types/task/task/type';

import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import EstimateForm from './estimate-form';
import { ResponseEstimate } from '@/model/types/task/estimate/type';
import { useConfirm } from '@/hooks/share/useConfirm';
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { apiUrl } from '@/model/constants/apiUrl';

export default function RegisterEstimate({companyList, task, estimate, mode} : {
    companyList: ResponseCompany[],
    task: ResponseTask,
    estimate: ResponseEstimate |undefined,
    mode: string
}) {
    const initialState = initialEstimate(task, companyList, mode, estimate)
    const [state,action,isPending] = useActionState(estimateRegisterAction, initialState)
    const [customerInfo, setCustomerInfo] = useState<Pick<ResponseCustomer,'customerName'|'customerId'>>({
        customerName: task.customer.customerName,
        customerId: task.customer.customerId
    })
    const customerNameRef = useRef(null);

    const [company, setCompany] = useState<ResponseCompany>(companyList[0])
    const companyHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
        const company = companyList.find(({companyId})=> companyId ===e.target.value)
        setCompany(company)
    }
    const formRef = useRef(null)
    
    const submitEstimateHandler = ()=>{
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

    //검색을 위한 이벤트등록
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data) {
                const { customerName, customerId } = event.data;
                if(customerName && customerId){
                    setCustomerInfo({ customerName, customerId })
                }
            }
        };
        window.removeEventListener("message", handleMessage);
        window.addEventListener("message", handleMessage);  

        return () => window.removeEventListener("message", handleMessage);
    }, []);

    //검색한 결과 폼세팅
    useEffect(()=>{
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formData.set('customer', customerInfo.customerName||'')
            formData.set('customerId', customerInfo.customerId||'')
            startTransition(()=>{
                action(formData)
            })
        
        }
    },[customerInfo])




const searchCustomerHandler = (e)=>{
    //거래처를 찾고나서 수정 시도 시
    if(customerInfo.customerId){
        const deleteCustomer = ()=>{
            setCustomerInfo({customerName:'',customerId:''})
        }
        useConfirm('거래처를 다시 선택하시겠습니까?',deleteCustomer,()=>{})
    }
    //Enter 외의 다른 키 입력 시
    if(!customerNameRef.current?.value || e.key !=='Enter') return
    e.preventDefault();
    //pc
    if(window.innerWidth>620){
        const url = `${apiUrl}/search-customer-items?searchName=${customerNameRef.current?.value}`; // 열고 싶은 링크
        const popupOptions = "width=500,height=700,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
        window.open(url, "searchCustomer", popupOptions);
    }
}


    useEffect(()=>{
        if(state.formErrors){
            window.alert(state.formErrors.message)
        }
    },[state])



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
                            <input type='text' defaultValue={customerInfo.customerName} readOnly={state.mode!=='edit'} onKeyDown={(e)=> state.mode==='edit' && searchCustomerHandler(e)}/>
                            <input type='hidden' name='customerId' value={customerInfo.customerId} readOnly/>
                        </td>
                        <td className='table-label'>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표</td>
                        <td>{company.ceo}</td>
                    </tr>
                    <tr>
                        <td className='table-label'>담당기사</td>
                        <td>
                            <input type='text' name='assignedUser' defaultValue={task.assignedUser.name} readOnly/>
                            <input type='hidden' name='userId' value={task.assignedUser.userId} readOnly/>
                        </td>
                        <td className='table-label'>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</td>
                        <td>{company.address}</td>
                    </tr>
                </tbody>
            </table>
            <EstimateForm estimate={estimate} submit={submitEstimateHandler} mode={state.mode}/> 
            </form>
        </section>
    )
}