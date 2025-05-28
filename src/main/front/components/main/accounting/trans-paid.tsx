'use client'
import '@/styles/form-style/form.scss'

import Image from 'next/image'
import asideArrow from '@/public/assets/aside-arrow.gif';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { startTransition, useActionState, useEffect, useRef } from 'react';
import { AccountingDivision } from '@/model/types/accounting/type';
import { transAccountingToReceipt } from '@/features/accounting/api/search-server-api';

const transPaidAction = async (prevState, formData)=>{
    const id = formData.get('id')
    const division = formData.get('division')
    const paidDate = new Date(formData.get('paidDate'))
    const status = await transAccountingToReceipt(division,id,paidDate) 

   return {...prevState, id, division, paidDate, status}
    
}

export default function TransPaid({division,id, isMobile}:{division:keyof typeof AccountingDivision,id:string, isMobile?:boolean}){
    const formRef = useRef(null)
    const [state, action, isPending] = useActionState(transPaidAction,{paidDate:new Date(Date.now())})

    const submitHandler =() => {
        const formData = new FormData(formRef.current);
        formData.set('id',id)
        formData.set('division',division)
        startTransition(() => {
            action(formData);
        });
    }

    useEffect(()=>{
        if(state.status){
            if(state.status===200){
                window.alert('입금전환이 완료되었습니다.')
                isMobile ? window.history.back() :window.close()
            }else{
                window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
    },[state])
    
    return(
        <section className='register-form-container' style={{padding:'8px', boxSizing:'border-box'}}>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>입금전환</h4>
            </header>
            <form action={action} ref={formRef}>
                <table className='register-form-table'>
                    <tbody>
                        <tr>
                            <td className='table-label'>입금일</td>
                            <td>
                                <CustomDateInput defaultValue={state.paidDate} name='paidDate'/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div className='button-container'>
                <button type='button' onClick={submitHandler} disabled={isPending}>저&nbsp;&nbsp;&nbsp;&nbsp;장</button>
                <button type='button' onClick={()=>{isMobile? window.history.back():window.close()}}>취&nbsp;&nbsp;&nbsp;&nbsp;소</button>
            </div>
       </section>
    )
}