'use client';

import '@/styles/form-style/form.scss'

import React, {startTransition, useEffect, useMemo, useRef} from 'react';
import { useActionState } from 'react';
import Image from 'next/image';


import asideArrow from '@/public/assets/aside-arrow.gif';

import { submitBusinessInfo } from '@/features/customer/customer/actions/customer-action';
import ErrorBox from '@/components/share/error/error-box';
import { CustomerCateEnum, ResponseCustomer } from '@/model/types/customer/customer/type';
import { Affiliation } from '@/model/types/customer/affiliation/type';
import { ResponseEmployee } from '@/model/types/staff/employee/type';
import useChangeMode from '@/hooks/share/useChangeMode';


export default function CustomerForm({affiliation, employees, customer, mode, isMobile} : {
    affiliation: Affiliation[],
    employees: ResponseEmployee[],
    mode:'write'|'detail' |'edit'
    customer?: ResponseCustomer,
    isMobile?:boolean
}) {
  const initialState = useMemo(() => customer ??{}, [customer]);
  const [state, action, isPending] = useActionState(submitBusinessInfo, initialState);
  const formRef = useRef(null)
  const changeMode = useChangeMode()

  const submitHandler = () => {
    const formData = new FormData(formRef.current!);
    formData.set('action', mode);
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(()=>{
    if(state.status){
      if(state.status ===200){
        mode === 'edit' ? window.alert('수정이 완료되었습니다.'): window.alert('저장이 완료되었습니다.')
        mode === 'edit' ? changeMode('detail') :(isMobile ? window.history.back() : window.close())
      }else{
        window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
      } 
    }
  },[state])

  return (
    <section className='register-form-container'>
      <header className="register-header">
          <Image src={asideArrow} alt=">" width={15}/>
          <h4>
            {mode === 'detail' && '거래처 상세보기'}
            {mode === 'edit' && '거래처 수정하기'}
            {mode ==='write' && '거래처 등록하기'}
          </h4>
      </header>
      <form action={action} ref={formRef}>
      <table className="register-form-table" key={state.customerId}>
          <colgroup>
                  <col style={{ width: '17%' }} />
                  <col style={{ width: '33%' }} />
                  <col style={{ width: '17%' }} />
                  <col style={{ width: '33%' }} />
          </colgroup>
        <tbody>
            <tr>
              <td className='table-label'>거래처 구분</td>
              <td>
                {mode==='detail' ?
                  <input value={CustomerCateEnum[state.category]} readOnly/>
                  :
                  <>
                    <select className="label-selector" 
                        size={1} name="category" defaultValue={state.category ??'category'} key={state.category}>
                      <option value='none'>선택</option>
                      {Object.entries(CustomerCateEnum).map(([key,value])=>(
                          <option value={key} key={key}>{value}</option>
                      ))}
                    </select>
                    {state.formErrors?.category &&  
                      <ErrorBox key={state.formErrors.errorKey}>
                        {state.formErrors.category}
                      </ErrorBox>
                    }
                  </>
                }
                
              </td>
              <td className='table-label'>소속</td>
              <td>
                {mode==='detail' ?
                  <input value={state.affiliationName} readOnly/>
                  :
                  <>
                    <select size={1} name="affiliationId" defaultValue={state.affiliationId?? 'none'} key={state.affiliationId}>
                      <option value='none'>소속선택</option>
                      {affiliation.map((affiliation)=>(
                          <option key={affiliation.affiliationId} value={affiliation.affiliationId}>
                                  {affiliation.affiliationName}
                          </option>
                      ))}
                    </select>
                    {state.formErrors?.affiliationId &&  
                      <ErrorBox key={state.formErrors.errorKey}>
                        {state.formErrors.affiliationId}
                      </ErrorBox>
                    }
                  </>
                }
                
              </td>
            </tr>
            <tr>
              <td className='table-label'>상호명</td>
              <td colSpan={3}>
                <input type='text' name="customerName" defaultValue={state.customerName} readOnly={mode==='detail'}/>
                <input type='hidden' name="customerId" value={state.customerId} readOnly/>
                 {state.formErrors?.customerName &&
                  <ErrorBox key={state.formErrors?.errorKey}>
                    {state.formErrors.customerName}
                  </ErrorBox>
                 }
              </td>
            </tr>
            <tr>
              <td className='table-label'>계산서명</td>
              <td colSpan={3}><input type='text' name="billName" defaultValue={state.billName} readOnly={mode==='detail'}/></td>
            </tr>
            <tr>
              <td className='table-label'>대표자</td>
              <td><input type='text' name="ceo" defaultValue={state.ceo} readOnly={mode==='detail'}/></td>
              <td className='table-label'>주민번호</td>
              <td><input type='text' name="ceoNum"  defaultValue={state.ceoNum} readOnly={mode==='detail'}/></td>
            </tr>
            <tr>
              <td className='table-label'>사업자등록번호</td>
              <td><input type='text' name="businessNum"  defaultValue={state.businessNum} readOnly={mode==='detail'}/></td>
              <td className='table-label'>업태</td>
              <td><input type='text' name="businessType"  defaultValue={state.businessType} readOnly={mode==='detail'}/></td>
            </tr>
            <tr>
              <td className='table-label'>종목</td>
              <td><input type='text' name="contents" defaultValue={state.contents} readOnly={mode==='detail'}/></td>
              <td className='table-label'>담당자</td>
              <td>
                {mode==='detail' ?
                  <input value={employees.find(({userId})=> userId===state.userId)?.name??''} readOnly/>
                  :
                  <>
                    <select className="label-selector" size={1} name="userId" key={state.userId+'userId'} defaultValue={state.userId}>
                        <option value='none'>선택</option>
                        {employees.map((employee)=>(
                          <option value={employee.userId} key={employee.userId}>{employee.name}</option>
                        ))}
                    </select>
                    {state.formErrors?.userId &&  
                      <ErrorBox key={state.formErrors.errorKey}>
                        {state.formErrors.userId}
                      </ErrorBox>
                    }
                  </>
                }
              </td>
            </tr>
            <tr>
              <td className='table-label'>전화</td>
              <td><input type='text' name="phoneNumber" defaultValue={state.phoneNumber} readOnly={mode==='detail'}/></td>
              <td className='table-label'>FAX</td>
              <td><input type='text' name="fax" defaultValue={state.fax} readOnly={mode==='detail'}/></td>
            </tr>
            <tr>
              <td rowSpan={3} className='table-label'>주소</td>
              <td colSpan={3}>
                <input className='zip-code-input' name='zipCode' defaultValue={state.zipCode} readOnly={mode==='detail'}/>
                [우편번호]
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <input name='address1' defaultValue={state.address1} readOnly={mode==='detail'}/>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <input name='address2' defaultValue={state.address2} readOnly={mode==='detail'}/>
              </td>
            </tr>
            <tr>
              <td className='table-label'>담당</td>
              <td><input type='text' name='customerRp' defaultValue={state.customerRp} readOnly={mode==='detail'}/></td>
              <td className='table-label'>담당자연락처</td>
              <td><input type='text' name="customerRpCall" defaultValue={state.customerRpCall} readOnly={mode==='detail'}/></td>
            </tr>
            <tr>
              <td className='table-label'>거래은행</td>
              <td><input type='text' name="bankName" defaultValue={state.bankName} readOnly={mode==='detail'}/></td>
              <td className='table-label'>계좌번호</td>
              <td><input type='text' name="bankNum" defaultValue={state.bankNum} readOnly={mode==='detail'}/></td>
            </tr>
            <tr>
              <td className='table-label'>예금주</td>
              <td><input type='text' name="bankOwner" defaultValue={state.bankOwner} readOnly={mode==='detail'}/></td>
              <td className='table-label'>이월잔액</td>
              <td><input type='text' name=""/></td>
            </tr>
            <tr>
                <td className='table-label'>취급품목</td>
                <td colSpan={3}><textarea name="handlingItem" defaultValue={state.handlingItem} readOnly={mode==='detail'}/></td>
            </tr>
            <tr>
                <td className='table-label'>메모</td>
                <td colSpan={3}><textarea name="memo" defaultValue={state.memo} readOnly={mode==='detail'}/></td>
            </tr>
        </tbody>
      </table>
      <div className='button-container'>
        <button type='button' onClick={()=>{
          mode ==='detail' ? changeMode('edit') : submitHandler()
        }} disabled={isPending}>
          {mode==='detail' && '수정'}
          {mode==='edit' && '수정완료'}
          {mode==='write' && '저장'}
        </button>
        <button type='button' onClick={ ()=> mode==='edit' ? changeMode('detail') :(isMobile? window.history.back() : window.close())}>취소</button>
      </div>
    </form>
    </section>
    
  );
}