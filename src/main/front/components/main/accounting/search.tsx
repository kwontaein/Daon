'use client'
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import accountingSearchAction from '@/features/accounting/action/accountingSearchAction';
import { useScreenMode } from '@/hooks/share/useScreenMode';
import { apiUrl } from '@/model/constants/apiUrl';
import { AccountingDivision, ProcurementSettlement, PurchaseVAT, SalesVAT, UnionAccountingType } from '@/model/types/accounting/type';
import { ResponseCompany } from '@/model/types/staff/company/type';
import '@/styles/table-style/search.scss';
import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from 'react';
import SVATSaerchResult from './svat/search-result';
import PVATSaerchResult from './pvat/search-result';
import Pagination from '@/components/share/pagination';
import { getCardTransactionfApi, getExpenseProofApi, getProcurementApi, getPurchaseVatApi, getSalesVATApi } from '@/features/accounting/api/accountingSearchApi';
import PsetSaerchResult from './pset/search-result';

export default function AccountingSearch({companyList, division, initalListState, page}:{companyList:ResponseCompany[], division:string, initalListState:UnionAccountingType[], page:number}){
    const formRef = useRef(null)
    const [state, action, isPending] = useActionState(accountingSearchAction,{})
    const mode = useScreenMode({tabletSize:690, mobileSize:620})
    const [searchResult, setSearchResult] =useState()
    const pageBySearchResult = useMemo(()=>(searchResult??initalListState).slice((page - 1) * 20, ((page - 1) * 20) + 20),[initalListState, searchResult,page])


    const submitHandler =() => {
        const formData = new FormData(formRef.current);
        formData.set('action', division);
        startTransition(() => {
            action(formData);
        });
    }

    const registerAccountingHandler = ()=>{
           
        if(window.innerWidth>620){
            const params = new URLSearchParams
            params.set("division", division)
            const url = `${apiUrl}/register-accounting?${params.toString()}`;
            const popupOptions = "width=800,height=500,scrollbars=yes,resizable=yes"; 
            window.open(url, "register", popupOptions);
        }
    }
    const allViewHandler =async()=>{
        let accountingData;
        switch(AccountingDivision[division]){
            case "매입부가세" :
                accountingData = await getPurchaseVatApi()
                break;
            case "매출부가세" :
                accountingData = await getSalesVATApi()
                break;
            case "카드증빙" :
                accountingData = await getCardTransactionfApi()
                break;
            case "지출증빙" :
                accountingData = await getExpenseProofApi()
                break;
            case "조달및수의" :
                accountingData = await getProcurementApi()
                break;
        }
        setSearchResult(accountingData)
    }
    
    useEffect(()=>{
        if(state.searchResult){
            setSearchResult(state.searchResult)
        }
    },[state])

    return(
        <>
        <section className='search-container'>
            <form action={action} ref={formRef}>
            <table className='search-table'>
                <colgroup>
                    <col style={{ width: '10%'}} />
                    <col style={{ width: '89%'}} />
                    <col style={{ width: '1%'}} />
                </colgroup>
                <thead>
                    <tr>
                        <td colSpan={3} className="table-title">
                            회사상호 &nbsp;: &nbsp;
                            <label>
                                <select className="title-selector" 
                                        size={1} name='companyId'
                                        defaultValue={state.companyId}
                                        key={state.companyId}>
                                    <option value='none'>선택안함</option>
                                    {companyList.map((company)=>(
                                        <option value={company.companyId} key={company.companyId}>{company.companyName}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='table-label'>출력일자</td>
                        <td>
                            <span className='dates-container' style={{display:`${mode==='tabelt' ? 'block':'flex'}`}}>
                                <CustomDateInput defaultValue={state.searchSDate} name='searchSDate' className={mode==='tabelt' ? 'none-max-width': ''}/> {mode!=='tabelt' && '~'} 
                                <CustomDateInput defaultValue={state.searchEDate} name='searchEDate' className={mode==='tabelt' ? 'none-max-width': ''}/>
                            </span>
                        </td>
                        <td rowSpan={2}>
                            <div className='grid-table-buttons'>
                                <button type='button' disabled={isPending} onClick={submitHandler}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button type='button' onClick={allViewHandler}>전 체 보 기</button>
                                <button type='button'>엑 셀 변 환</button>
                                <button type='button' onClick={registerAccountingHandler}>신 규 등 록</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>업체명</td>
                        <td><input name='customerName' defaultValue={state.customerName||''}/></td>
                    </tr>
                </tbody>
            </table>
            </form>
        </section>
        {division ==='svat' &&
            <SVATSaerchResult salesVATList={pageBySearchResult as SalesVAT[]}/>
        }
        {division ==='pvat' &&
            <PVATSaerchResult purchaseVATList={pageBySearchResult as PurchaseVAT[]}/>
        }
        {division ==='pset' &&
            <PsetSaerchResult procurements={pageBySearchResult as ProcurementSettlement[]}/>
        }


        {!isPending &&
            <Pagination
                totalItems={(searchResult??initalListState).length}
                itemCountPerPage={20} 
                pageCount={5} 
                currentPage={Number(page)}/>
        }
        </>

    )
}