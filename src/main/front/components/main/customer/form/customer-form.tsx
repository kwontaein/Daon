'use client';

import React, {useMemo} from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import './customer-form.scss';
import '@/styles/main-view/register/register.scss'

import asideArrow from '@/assets/aside-arrow.gif';

import { submitBusinessInfo } from '@/features/customer/customer/actions/customer-action';
import ErrorBox from '@/components/share/error-box/error-box';
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { CustomerCate } from '@/model/types/customer/cate/type';


export default function CustomerForm({customerCate, customer}:{customerCate:CustomerCate[], customer?:ResponseCustomer}) {
  const initialState = useMemo(() => customer ? {...customer,customerCateId:customer.customerCateId.customerCateId}:{}, [customer]);
  const [state, action, isPending] = useActionState(submitBusinessInfo, initialState);
  const router = useRouter();


  return (
    <>
    {!customer &&
      <header className="register-header">
          <Image src={asideArrow} alt=">" />
          <h4>전표입력</h4>
      </header>
      }
      <form action={action} className="customer-form-container">
      <table className="customer-form-table print-section" key={state.customerId}>
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
                <select className="label-selector" 
                        size={1} name="category" defaultValue={state.category ??'none'} key={state.category??'none'}>
                    <option value='none'>선택</option>
                    <option value="SALE">판매처</option>
                    <option value="PURCHASE">구매처</option>
                    <option value="CONSUMER">소비자</option>
                    <option value="SUBCONTRACTOR">하청업체</option>
                    <option value="ETC">기타</option>
                </select>
                {state.formErrors?.category &&  
                  <ErrorBox key={state.formErrors.errorKey}>
                    {state.formErrors.category}
                  </ErrorBox>
                 }
              </td>
              <td className='table-label'>소속</td>
              <td>
                <select size={1} name="customerCateId" defaultValue={state.customerCateId?? 'none'} key={state.customerCateId?? 'none'}>
                    <option value='none'>소속선택</option>
                    {customerCate.map((cate)=>(
                        <option key={cate.customerCateId} value={cate.customerCateId}>
                                {cate.customerCateName}
                        </option>
                    ))}
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
                <input type='text' name="customerName" defaultValue={state.customerName ?? ''}/>
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
              <td><input type='text' name="ceo" defaultValue={state.ceo ?? ''}/></td>
              <td className='table-label'>주민번호</td>
              <td><input type='text' name="ceoNum"  defaultValue={state.ceoNum ?? ''}/></td>
            </tr>
            <tr>
              <td className='table-label'>사업자등록번호</td>
              <td><input type='text' name="companyNum"  defaultValue={state.companyNum ?? ''}/></td>
              <td className='table-label'>업태</td>
              <td><input type='text' name="businessType"  defaultValue={state.businessType ?? ''}/></td>
            </tr>
            <tr>
              <td className='table-label'>종목</td>
              <td><input type='text' name="contents" defaultValue={state.contents ?? ''}/></td>
              <td className='table-label'>담당자</td>
              <td>
                <select className="label-selector" size={1} name="etc" key={state.etc} defaultValue={state.etc}>
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
              <td><input type='text' name="phoneNumber" defaultValue={state.phoneNumber ?? ''}/></td>
              <td className='table-label'>FAX</td>
              <td><input type='text' name="fax" defaultValue={state.fax ?? ''}/></td>
            </tr>
            <tr>
              <td rowSpan={3} className='table-label'>주소</td>
              <td colSpan={3}>
                [우편번호]
                <input className='zip-code-input' name='zipCode' defaultValue={state.zipCode ?? ''}/>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <input name='address1' defaultValue={state.address1 ?? ''} />
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <input name='address2' defaultValue={state.address2 ?? ''}/>
              </td>
            </tr>
            <tr>
              <td className='table-label'>담당</td>
              <td><input type='text' name='customerRp' defaultValue={state.customerRp ?? ''}/></td>
              <td className='table-label'>담당자연락처</td>
              <td><input type='text' name="customerRpCall" defaultValue={state.customerRpCall ?? ''}/></td>
            </tr>
            <tr>
              <td className='table-label'>거래은행</td>
              <td><input type='text' name="bankName" defaultValue={state.bankName ?? ''}/></td>
              <td className='table-label'>계좌번호</td>
              <td><input type='text' name="bankNum" defaultValue={state.bankNum ?? ''}/></td>
            </tr>
            <tr>
              <td className='table-label'>예금주</td>
              <td><input type='text' name="bankOwner" defaultValue={state.bankOwner ?? ''}/></td>
              <td className='table-label'>이월잔액</td>
              <td><input type='text' name=""/></td>
            </tr>
            <tr>
                <td className='table-label'>취급품목</td>
                <td colSpan={3}><textarea  name="handlingItem" defaultValue={state.handlingItem ?? ''}/></td>
            </tr>
            <tr>
                <td className='table-label'>메모</td>
                <td colSpan={3}><textarea name="memo" defaultValue={state.memo ?? ''}/></td>
            </tr>
        </tbody>
      </table>
      <div className='button-container'>
        <button type={'submit'} disabled={isPending}>저장</button>
        <button type={'button'} onClick={ ()=> customer ? router.push(`customer?target=${customer.customerId}`):window.close()}>취소</button>
      </div>
    </form>
    </>
    
  );
}