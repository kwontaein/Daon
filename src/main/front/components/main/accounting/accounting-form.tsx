'use client'
import '@/styles/form-style/form.scss';

import Image from 'next/image';
import asideArrow from '@/assets/aside-arrow.gif';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import accountingFormAction from '@/features/accounting/action/accountingFormAction';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { AccountingDivision } from '@/model/types/accounting/type';
import CustomNumberInput from '@/components/share/custom-number-input/page';
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';



export default function AccountingForm({mode,division,categorySelections}:{
    mode:'write'|'detail'|'edit',
    division: keyof typeof AccountingDivision,
    categorySelections:{categorySelection:string}[]
}){
    const formRef = useRef<HTMLFormElement | null>(null);
    const [state, action, isPending] = useActionState(accountingFormAction,{})
    const [category, setCategory] = useState(state.categorySelection??'none')
    const [total, setTotal] = useState<{amount:number,vat:number}>({
        amount:state.amount??0,
        vat:state.vat??0
    })
    

    //거래처 검색관련
    const checkCustomerName = () => !!state.customerId

    const changeHandler = (
        customerInfo : Pick <ResponseCustomer,'customerName' | 'customerId' >,
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


    const submitHandler =(e) => {
        if(isPending || !formRef.current) return
        e?.preventDefault();
        const formData = new FormData(formRef.current);
        formData.set('action', division);
        const customerId = formData.get('customerId')
        const categorySelection = formData.get('categorySelection')
        console.log(categorySelection)
        if(!customerId) {
            window.alert('업체명을 입력해주세요')
            return
        }
        if(categorySelection==='none' || !categorySelection){
            window.alert('분류명을 선택하거나 신규 분류명을 입력해주세요.')
            return
        }
        startTransition(() => {
            action(formData);
        });
    }

    useEffect(()=>{
        if(state.status){
            if(state.status ===200){
                window.alert('신규'+ AccountingDivision[division]+'등록이 완료되었습니다.')
                window.close()
            }
        }
    },[state])

    return(
        <>
        <header className="register-header">
            <Image src={asideArrow} alt=">" width={15} priority/>
            <h4>
                {mode === 'write' && AccountingDivision[division]+' 등록'}
                {mode === 'detail' && AccountingDivision[division]+' 상세보기'}
                {mode === 'edit' && AccountingDivision[division]+' 수정'}
            </h4>
        </header>
        <form className='register-form-container' action={action} ref={formRef}>
            <table className='register-form-table focus-bg-memo'>
                <colgroup>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'40%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'40%'}}/>
                </colgroup>
            <tbody>
                <tr>
                    <td className='table-label'>분류선택</td>
                    <td>
                        <select name={category!=='none'?'categorySelection' :''} defaultValue={category} key={state.categorySelection+'categorySelection'} onChange={(e)=>setCategory(e.target.value)}>
                            <option value={'none'}>신규분류입력</option>
                            {categorySelections.filter(({categorySelection})=> categorySelection).map(({categorySelection},idx)=>(
                                <option key={categorySelection+idx} value={categorySelection+'a'}>{categorySelection}</option>
                            ))}
                        </select>
                    </td>
                    <td className='table-label'>날짜</td>
                    <td colSpan={3}>
                        <div>
                            <CustomDateInput 
                                defaultValue={state.date} 
                                name='date' 
                                key={state.date+'date'}/>
                        </div>
                    </td>
                </tr>
               
               <tr>
               <td className='table-label'>신규분류</td>
               <td colSpan={3}>
                   <input
                       className='placeholder-small'
                       placeholder='※ 원하시는 분류가 없을시에는 텍스트박스에 입력해 주세요.'
                       name={category==='none' ? 'categorySelection':''}
                       defaultValue={category==='none' ? state.categorySelection:''}
                       readOnly={category!=='none'}
                   />
               </td>
           </tr>
               
                <tr>
                    <td className='table-label'>업체명</td>
                    <td>
                        <input
                            name='customerName'
                            defaultValue={state.customerName}
                            onKeyDown={searchCustomerHandler}
                            key={state.customerName+'customerName'}
                            />                       
                        <input
                            type='hidden'
                            name='customerId'
                            defaultValue={state.customerId}/>
                    </td>
                    <td className='table-label'>{division==='pset' ? "모델명" :"사업자등록번호"}</td>
                    <td>
                        {division==='pset' ?
                            <input
                                name='modelName'
                                defaultValue={state.modelName}/>                        
                            :    
                            <input
                                name='businessNumber'
                                defaultValue={state.businessNumber}/>                       
                        }
                    </td>
                </tr>
                {division==='pset' ?
                <>
                <tr>
                    <td className='table-label'>매입처</td>
                    <td><input name='vendor' key={state.vendor+'vendor'} defaultValue={state.vendor}/></td>
                    <td className='table-label'>수량</td>
                    <td><CustomNumberInput 
                            name='quantity'
                            key={state.quantity+'quantity'} 
                            defaultValue={state.quantity}/>
                    </td>
                </tr>
                <tr>
                    <td className='table-label'>인수</td>
                    <td><input
                        name='acceptance'
                        defaultValue={state.acceptance}/>
                    </td>
                    <td className='table-label'>설치</td>
                    <td><input
                        name='installation'
                        defaultValue={state.installation}/>
                    </td>
                </tr>
                <tr>
                    <td className='table-label'>결재</td>
                    <td colSpan={3}><input
                        name='payment'
                        defaultValue={state.payment}/>
                    </td>                
                </tr>
                </>
                :
                <>
               <tr>
                    <td className='table-label'>금액</td>
                    <td>
                        <CustomNumberInput 
                            name='amount'
                            defaultValue={state.amount}
                            key={state.amount+'amount'}
                            onChange={(amount)=>setTotal((prev)=>{
                                return{
                                    ...prev,
                                    amount
                                }
                            })}/>
                    </td>
                    <td rowSpan={2} className='table-label'>합계</td>
                    <td rowSpan={2}><input name='total' style={{textAlign:'right'}} value={(total.amount+total.vat).toLocaleString('ko-KR')+'원'} readOnly/></td>
                </tr>
                <tr>
                    <td className='table-label'>부가세</td>
                    <td>
                        <CustomNumberInput 
                                name='vat'
                                defaultValue={state.vat}
                                key={state.vat+'vat'}
                                onChange={(vat)=>setTotal((prev)=>{
                                    return{
                                        ...prev,
                                        vat
                                    }
                                })}/>
                    </td>
                </tr>
                {['proof', 'card'].includes(division) &&
                <tr>
                  <td className='table-label'>카드사</td>
                  <td colSpan={3}><input
                      name='cardCompany'
                      defaultValue={state.cardCompany}/></td>                
                </tr>  
                }
                {division!=='pvat' &&
                <tr>
                    <td className='table-label'>결제내역</td>
                    <td colSpan={3}><input
                        name='paymentDetails'
                        defaultValue={state.paymentDetails}/></td>                
                </tr>
                }
                <tr>
                    <td className='table-label'>비고</td>
                    <td colSpan={3}>
                        <textarea 
                            name='note'
                            defaultValue={state.note}/>
                    </td>
                </tr>
               </>
                }
                <tr>
                    <td className='table-label'>메모</td>
                    <td colSpan={3}>
                        <textarea 
                            name='memo'
                            defaultValue={state.memo}/>
                    </td>
                </tr>
            </tbody>
            </table>
        </form>
        <div className='button-container'>
            <button onClick={submitHandler}>저장</button>
            <button>취소</button>
        </div>
        </>
    )
}