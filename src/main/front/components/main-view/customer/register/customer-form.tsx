'use client';

import React, { startTransition, useEffect, useOptimistic, useRef, useState } from 'react';
import { useActionState } from 'react';

import './customer-form.scss';
import { submitBusinessInfo } from '@/constants/customer/customer-action';
import ErrorBox from '@/components/share/error-box';
import asideArrow from '@/assets/aside-arrow.gif';
import Image from 'next/image';


export default function CustomerForm() {
  const [state, action, isPending] = useActionState(submitBusinessInfo, {});
  const memoAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const productAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(()=>{
    console.log(state.category)
  },[state])
  useEffect(() => {
    if (!memoAreaRef.current) return;
    memoAreaRef.current.style.height = 'auto';
    memoAreaRef.current.style.height = memoAreaRef.current.scrollHeight + 'px';
  }, []);

  useEffect(() => {
    if (!productAreaRef.current) return;
    productAreaRef.current.style.height = 'auto';
    productAreaRef.current.style.height = productAreaRef.current.scrollHeight + 'px';
  }, []);

  return (
    <>
      <header className="register-customer-header">
          <Image src={asideArrow} alt=">" />
          <h4>전표입력</h4>
      </header>
      <form onSubmit={(e)=>{
        e.preventDefault()
        startTransition(()=>{
          const formData = new FormData(e.currentTarget); // 폼 데이터 생성
          action(formData); // action 함수에 전달
        })
    }} className="customer-from-container">
      <table className="customer-form-table">
        <tbody>
            <tr>
              <td className='table-label'>거래처 구분</td>
              <td>
                <select className="title-selector" size={1} name="category">
                    <option value='none'>선택</option>
                    <option value="sale">판매처</option>
                    <option value="purchase">구매처</option>
                    <option value="consumer">소비자</option>
                    <option value="subcontractor">하청업체</option>
                    <option value="etc">기타</option>
                </select>
                {state.formErrors?.category &&  
                  <ErrorBox key={state.formErrors.errorKey}>
                    {state.formErrors.category}
                  </ErrorBox>
                 }
              </td>
              <td className='table-label'>소속</td>
              <td>
                <select className="title-selector" size={1} name="customerCateId">
                    <option value='none'>소속선택</option>
                    <option value="individual">개인</option>
                    <option value="corporate">법인</option>
                    <option value="limited">유한������</option>
                    <option value="public">공공기관</option>
                </select>
                {state.formErrors?.customerCateId &&  
                  <ErrorBox key={state.formErrors.errorKey}>
                    {state.formErrors.customerCateId}
                  </ErrorBox>
                 }
              </td>
            </tr>
            <tr>
              <td className='table-label'>상호명</td>
              <td colSpan={3}>
                <input type='text' name="customerName"/>
                 {state.formErrors?.customerName &&
                  <ErrorBox key={state.formErrors?.errorKey}>
                    {state.formErrors.customerName}
                  </ErrorBox>
                 }
              </td>
            </tr>
            <tr>
              <td className='table-label'>계산서명</td>
              <td colSpan={3}><input type='text' name="billName" /></td>
            </tr>
            <tr>
              <td className='table-label'>대표자</td>
              <td><input type='text' name="ceo"/></td>
              <td className='table-label'>주민번호</td>
              <td><input type='text' name="ceoNum"/></td>
            </tr>
            <tr>
              <td className='table-label'>사업자등록번호</td>
              <td><input type='text' name="companyNum"/></td>
              <td className='table-label'>업태</td>
              <td><input type='text' name="businessType"/></td>
            </tr>
            <tr>
              <td className='table-label'>종목</td>
              <td><input type='text' name="contents"/></td>
              <td className='table-label'>담당자</td>
              <td>
                <select className="title-selector" size={1} name="etc">
                    <option value='none'>선택</option>
                    <option value='kwang'>권태인</option>
                    <option value="kang">강승재</option>
                    <option value="purchase">어쩌고</option>
                    <option value="etc">저쩌고</option>
                </select>
                {state.formErrors?.etc &&  
                  <ErrorBox key={state.formErrors.errorKey}>
                    {state.formErrors.etc}
                  </ErrorBox>
                 }
              </td>
            </tr>
            <tr>
              <td className='table-label'>전화</td>
              <td><input type='text' name="phoneNumber"/></td>
              <td className='table-label'>FAX</td>
              <td><input type='text' name="fax"/></td>
            </tr>
            <tr>
              <td rowSpan={3} className='table-label'>주소</td>
              <td colSpan={3}>
                [우편번호]
                <input className='zip-code-input' name='zipCode'/>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <input name='address1' defaultValue={state.address1}/>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <input name='address2' defaultValue={state.address2}/>
              </td>
            </tr>
            <tr>
              <td className='table-label'>담당</td>
              <td><input type='text' name='customerRp'/></td>
              <td className='table-label'>담당자연락처</td>
              <td><input type='text' name="customerRpCall"/></td>
            </tr>
            <tr>
              <td className='table-label'>거래은행</td>
              <td><input type='text' name="bankName"/></td>
              <td className='table-label'>계좌번호</td>
              <td><input type='text' name="bankNum"/></td>
            </tr>
            <tr>
              <td className='table-label'>예금주</td>
              <td><input type='text' name="bankOwner"/></td>
              <td className='table-label'>이월잔액</td>
              <td><input type='text' name=""/></td>
            </tr>
            <tr>
                <td className='table-label'>취급품목</td>
                <td colSpan={3}><textarea ref={productAreaRef} name="handlingItem"/></td>
            </tr>
            <tr>
                <td className='table-label'>메모</td>
                <td colSpan={3}><textarea ref={memoAreaRef} name="memo"/></td>
            </tr>
        </tbody>
      </table>
      <div className='button-container'>
        <button type={'submit'} disabled={isPending}>저장</button>
        <button type={'button'} onClick={()=>window.close()}>취소</button>
      </div>
    </form>
    </>
    
  );
}