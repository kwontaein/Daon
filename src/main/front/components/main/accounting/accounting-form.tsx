'use client'
import '@/styles/form-style/form.scss';

import Image from 'next/image';
import asideArrow from '@/assets/aside-arrow.gif';
import { useActionState, useRef } from 'react';
import accountingFormAction from '@/features/accounting/action/accountingFormAction';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { ResponseCompany } from '@/model/types/staff/company/type';
import { AccountingDivision } from '@/model/types/accounting/type';


export default function AccountingForm({mode,division,companyList}:{
    mode:'write'|'detail'|'edit',
    division:AccountingDivision,
    companyList:ResponseCompany[]
}){
    const formRef = useRef<HTMLFormElement | null>(null);
    const [state, action, isPending] = useActionState(accountingFormAction,{})

    return(
        <>
        <header className="register-header">
            <Image src={asideArrow} alt=">" width={15} priority/>
            <h4>
                {mode === 'write' && '거래등록'}
                {mode === 'detail' && '거래 상세보기'}
                {mode === 'edit' && '거래수정'}
            </h4>
        </header>
        <form className='register-form-container' action={action} ref={formRef}>
            <table className='register-form-table'>
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
                        <select name='companyId' defaultValue={state.companyId} key={state.companyId}>
                            <option value={'none'}>분류선택</option>
                            {companyList.map((company)=>(
                                <option key={company.companyId} value={company.companyId}>{company.companyName}</option>
                            ))}
                        </select>
                    </td>
                    <td className='table-label'>날짜</td>
                    <td colSpan={3}>
                        <div>
                            <CustomDateInput defaultValue={state.date} name='date'/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className='table-label'>신규분류</td>
                    <td colSpan={3}><input className='placeholder-small' placeholder='※ 원하시는 분류가 없을시에는 텍스트박스에 입력해 주세요.'/></td>
                </tr>
                <tr>
                    <td className='table-label'>업체명</td>
                    <td><input/></td>
                    <td className='table-label'>사업자등록번호</td>
                    <td><input/></td>
                </tr>
                <tr>
                    <td className='table-label'>금액</td>
                    <td><input/></td>
                    <td className='table-label'>부가세</td>
                    <td>
                        <input/>
                    </td>
                </tr>
                <tr>
                    <td className='table-label'>합계</td>
                    <td colSpan={3}></td>
                </tr>
                <tr>
                    <td className='table-label'>비고</td>
                    <td colSpan={3}><textarea/></td>
                </tr>
                <tr>
                    <td className='table-label'>메모</td>
                    <td colSpan={3}><textarea/></td>
                </tr>
            </tbody>
            </table>
        </form>
        <div className='button-container'>
            <button>저장</button>
            <button>취소</button>
        </div>
        </>
    )
}