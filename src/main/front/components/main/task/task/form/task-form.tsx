'use client'
import '@/styles/form-style/form.scss';

import asideArrow from '@/assets/aside-arrow.gif';
import Image from 'next/image';
import { ResponseStaff } from '@/model/types/staff/staff/type';
import taskRegisterAction from '@/features/task/task/action/taskRegisterAction';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/model/constants/apiUrl';
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { changeFormData } from '@/features/share/changeFormData';
import { ResponseTask } from '@/model/types/task/task/type';
import { useConfirm } from '@/hooks/share/useConfirm';

export default function TaskForm({staff, task}:{staff:ResponseStaff[],task?:ResponseTask}){
    const [state, action, isPending] = useActionState(taskRegisterAction,{taskType:'AS'})
    const [customerInfo, setCustomerInfo] = useState<Pick<ResponseCustomer,'customerName'|'customerId'>>({
        customerName:'',
        customerId:''
    })
    const formRef = useRef<HTMLFormElement>(null);
    const customerNameRef = useRef(null);
    const size = useWindowSize()

    const searchCustomerHandler = (e)=>{
        //거래처를 찾고나서 수정 시도 시
        if(customerInfo.customerId!=='' &&( e.key=='Delete' || e.key =='Backspace')){
            useConfirm('거래처를 다시 선택하시겠습니까?',()=>{setCustomerInfo({customerName:'',customerId:''})},()=>{})
        }
        if(!customerNameRef.current.value || e.key !=='Enter') return
        e.preventDefault();
        //pc
        if(size.width>620){
            const url = `${apiUrl}/search-customer-items?searchName=${customerNameRef.current.value}`; // 열고 싶은 링크
            const popupOptions = "width=500,height=700,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "searchCustomer", popupOptions);
        }
    }

    useEffect(()=>{
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formData.set('customer', customerInfo.customerName||'')
            formData.set('customerId', customerInfo.customerId||'')
            action(formData)
        }
    
    },[customerInfo])
    
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
          if (event.data) {
            const {customerName,customerId} = event.data;
            setCustomerInfo({customerName,customerId})
        }
        };
    
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
      }, []);

    return(
        <>
        {!task &&
        <header className="register-header">
            <Image src={asideArrow} alt=">" width={15}/>
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
                                key={state.taskType}/>A/S</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='INCOMING'
                                defaultChecked={state.taskType ==='INCOMING'}
                                key={state.taskType}/>입고</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='DELIVERY'
                                defaultChecked={state.taskType ==='DELIVERY'}
                                key={state.taskType}/>납품</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='INVENTORY'
                                defaultChecked={state.taskType ==='INVENTORY'}
                                key={state.taskType}/>재고</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='OTHER'
                                defaultChecked={state.taskType ==='OTHER'}
                                key={state.taskType}/>기타</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='RENTAL'
                                defaultChecked={state.taskType ==='RENTAL'}
                                key={state.taskType}/>임대</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='MAINTENANCE'
                                defaultChecked={state.taskType ==='MAINTENANCE'}
                                key={state.taskType}/>유지보수</label>
                            <label><input
                                type='radio'
                                name='taskType'
                                value='ATTENDANCE'
                                defaultChecked={state.taskType ==='ATTENDANCE'}
                                key={state.taskType}/>근태</label>
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처선택</td>
                        <td><input name='customer' ref={customerNameRef} key={state.customer} defaultValue={state.customer} onKeyDown={(e)=>searchCustomerHandler(e)}/></td>
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
                                {staff.map(({userId, name})=>
                                    <option key={userId} value={userId}>{name}</option>
                                )}
                            </select>
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
                <button>저장</button>
                <button>취소</button>
            </div>
        </form>
        </>
    )
}