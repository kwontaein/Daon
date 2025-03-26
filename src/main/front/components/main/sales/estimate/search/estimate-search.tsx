'use client';

import '@/styles/table-style/search.scss';
import React, { startTransition, useActionState, useEffect, useMemo, useCallback, useRef, useState } from 'react';

import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import useSearchStock from '@/hooks/stock/search/useSearchStock';

import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { ResponseStock } from '@/model/types/stock/stock/types';


import Pagination from '@/components/share/pagination';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { EstimateCategory, ResponseEstimate, ResponseEstimateItem } from '@/model/types/sales/estimate/type';
import estimateSearchAction, { initialEstimateSearch } from '@/features/sales/estimate/action/estimateSearchAction';
import { ResponseCompany } from '@/model/types/staff/company/type';
import EstimateSearchResult from './search-result';



export default function EstimateSearch({initialEstimate, companyList, page, isTask} : {
    initialEstimate: ResponseEstimate[],
    companyList: ResponseCompany[],
    page: number,
    isTask:boolean
}) {
    const [state, action, isPending] = useActionState(estimateSearchAction, initialEstimateSearch(companyList,isTask));
    const [estimateItems,setEstimateItems] = useState<ResponseEstimate[]>(initialEstimate)

    const pageByEstimate = useMemo(()=>estimateItems.slice((page - 1) * 20, ((page - 1) * 20) + 20),[page,estimateItems])
    const formRef = useRef(null)
 

    
    const submitHandler = useCallback(() => {
        const formData = new FormData(formRef.current);
        formData.set('action', 'submit');
        startTransition(() => {
            action(formData);
        });
    }, [action]);

    useEffect(()=>{
        if(state.searchEstimate){
            setEstimateItems(state.searchEstimate)
        }
    },[state])

    const checkCustomerId = useCallback(() => !!state.customerId, [state.customerId]);
    const checkStockId = useCallback(() => !!state.stockId, [state.stockId]);

    const changeHandler = useCallback(<T extends Record<string, string>>(info: T) => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);

            Object.entries(info).forEach(([key, value]) => {
                formData.set(key, value ?? "");
            });

            startTransition(() => {
                action(formData);
            });
        }
    }, [action]);

    const changeCustomerHandler = useCallback((customerInfo: Pick<ResponseCustomer, "customerName" | "customerId">) => {
        changeHandler(customerInfo);
    }, [changeHandler]);

    const changeStockHandler = useCallback((stockInfo: Pick<ResponseStock, "productName" | "stockId">) => {
        changeHandler(stockInfo);
    }, [changeHandler]);

    const searchCustomerHandler = useSearchCustomer(checkCustomerId, changeCustomerHandler);
    const searchStockHandler = useSearchStock(checkStockId, changeStockHandler);

    const memoizedEstimateCategory = useMemo(() => {
        return Object.entries(EstimateCategory).map(([key,value]) => (
            <option key={key} value={key}>
                {value}
            </option>
        ));
    }, [EstimateCategory]);


    return (
        <div className="search-container">
            <form action={action} ref={formRef}>
                <table className="search-table">
                    <colgroup>
                        <col style={{ width: '8%' }} />
                        <col style={{ width: '91%' }} />
                        <col style={{ width: '1%' }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <td colSpan={3} className="table-title">
                            견적서 구분 &nbsp;: &nbsp;
                            <label>
                                <select
                                    className="title-selector"
                                    size={1}
                                    name='category'
                                    defaultValue={state.condition}
                                    key={state.condition}>
                                    {memoizedEstimateCategory}
                                </select>
                            </label>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-label">전표종류</td>
                            <td>
                                <label>
                                <select name='companyId' defaultValue={state.companyId} key={state.companyId}>
                                    {companyList.map((company)=>(
                                        <option key={company.companyId} value={company.companyId}>{company.companyName}</option>
                                    ))}
                                </select>
                                </label>
                            </td>
                            <td rowSpan={4} className="table-buttons">
                                <button type='button' onClick={submitHandler}>
                                    검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색
                                </button>
                                <button type='button' onClick={()=>setEstimateItems(initialEstimate)}>
                                    전 체 보 기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">출력일자</td>
                            <td>
                                <span className='dates-container'>
                                    <CustomDateInput defaultValue={state.searchSDate} name='searchSDate' key={state.searchSDate+'S'}/>
                                     ~ 
                                    <CustomDateInput defaultValue={state.searchEDate} name='searchEDate' key={state.searchSDate+'E'}/>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">거래처선택</td>
                            <td>
                                <input placeholder="거래처명을 입력하세요." name='customerName' key={state.customerName} defaultValue={state.customerName} onKeyDown={searchCustomerHandler} />
                                <input type='hidden' name='customerId' value={state.customerId} />
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">품목선택</td>
                            <td>
                                <input placeholder="품명을 입력하세요." name='productName' key={state.productName} defaultValue={state.productName} onKeyDown={searchStockHandler} />
                                <input type='hidden' name='stockId' value={state.stockId} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <EstimateSearchResult pageByEstimate={pageByEstimate}/>
            {(!isPending && pageByEstimate.length>0) &&
                <Pagination
                    totalItems={estimateItems.length}
                    itemCountPerPage={10}
                    pageCount={4}
                    currentPage={page}
                />}
        </div>
    );
}
