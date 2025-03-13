'use client'
import '@/styles/form-style/form.scss';

import Image from 'next/image';
import asideArrow from '@/assets/aside-arrow.gif';
import { ResponseCompany } from '@/model/types/staff/company/type';
import { ChangeEvent, useActionState, useMemo, useState } from 'react';
import estimateRegisterAction from '@/features/task/estimate/action/estimateRegister';
import { ResponseTask } from '@/model/types/task/task/type';
import dayjs from 'dayjs';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import EstimateForm from './estimate-form';

export default function RegisterEstimate({companyList, task}:{companyList:ResponseCompany[], task:ResponseTask}){
    const initialState ={
        companyId:companyList[0].companyId, 
        createAt:dayjs(task.createdAt).format('YYYY-MM-DD')
    }
    const [state,action,isPending] = useActionState(estimateRegisterAction,initialState)
    const [company, setCompany] = useState<ResponseCompany>(companyList[0])
    const companyHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
        const company = companyList.find(({companyId})=> companyId ===e.target.value)
        setCompany(company)
    }

    return(
        <section className='register-form-container' style={{padding:'8px', boxSizing:'border-box'}}>
             <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>견적서 작성하기</h4>
            </header>
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
                            <CustomDateInput defaultValue={state.createAt} name={'createAt'}/>
                        </td>
                        <td className='table-label'>등록번호</td>
                        <td>{company.businessNum}</td>
                    </tr>
                    <tr>
                        <td className='table-label'>업&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;체</td>
                        <td><input type='text' defaultValue={task.customer.customerName} readOnly/></td>
                        <td className='table-label'>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표</td>
                        <td>{company.ceo}</td>
                    </tr>
                    <tr>
                        <td className='table-label'>담당기사</td>
                        <td><input type='text' defaultValue={task.assignedUser.name} readOnly/></td>
                        <td className='table-label'>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</td>
                        <td>{company.address}</td>
                    </tr>
                </tbody>
            </table>
            <EstimateForm/>
        </section>
    )
}