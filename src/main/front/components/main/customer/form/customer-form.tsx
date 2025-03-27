'use client';

import React, {useMemo} from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import '@/styles/form-style/form.scss'

import asideArrow from '@/assets/aside-arrow.gif';

import { submitBusinessInfo } from '@/features/customer/customer/actions/customer-action';
import ErrorBox from '@/components/share/error-box/error-box';
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { Affiliation } from '@/model/types/customer/affiliation/type';
import { ResponseEmployee } from '@/model/types/staff/employee/type';


export default function CustomerForm({affiliation, employees, customer} : {
    affiliation: Affiliation[],
    employees: ResponseEmployee[],
    customer?: ResponseCustomer
}) {
  const initialState = useMemo(() => customer ? {...customer,affiliationId:customer.affiliation.affiliationId}:{}, [customer]);
  const [state, action, isPending] = useActionState(submitBusinessInfo, initialState);
  const router = useRouter();

  return (
    <section className='register-form-container'>
    {!customer &&
      <header className="register-header">
          <Image src={asideArrow} alt=">" width={15}/>
          <h4>전표입력</h4>
      </header>
      }
      <form action={action}>
      <table className="register-form-table print-section" key={state.customerId}>
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
                        size={1} name="category" defaultValue={state.category ??'category'} key={state.category}>
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
                <select className="label-selector" size={1} name="etc" key={state.etc ?? 'etc'} defaultValue={state.etc}>
                    <option value='none'>선택</option>
                    {employees.map((employee)=>(
                      <option value={employee.userId} key={employee.userId}>{employee.name}</option>
                    ))}
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
                <input className='zip-code-input' name='zipCode' defaultValue={state.zipCode ?? ''}/>
                [우편번호]
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
    </section>
    
  );
}