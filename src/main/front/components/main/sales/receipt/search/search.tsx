'use client';

import '@/styles/table-style/search.scss';
import React, { startTransition, useActionState, useEffect, useMemo, useCallback } from 'react';

import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import useSearchStock from '@/hooks/stock/search/useSearchStock';
import useReceiptSearch from '@/hooks/sales/receipt/useReceiptSearch';

import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { ResponseStock } from '@/model/types/stock/stock/types';
import { ReceiptCategoryEnum, ResponseReceipt } from '@/model/types/sales/receipt/type';

import receiptSearchAction, { initialReceiptSearch } from '@/features/sales/receipt/action/receiptSearchAction';

import Pagination from '@/components/share/pagination';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import ReceiptSearchResult from './search-result';
import useDeletePage from '@/hooks/share/useDeletePage';
import { useDailySummary } from '@/store/zustand/receipt-search';


const MemoizedReceiptSearchResult = React.memo(ReceiptSearchResult);

export default function ReceiptSearch({ initialReceipts, page }: { initialReceipts: ResponseReceipt[], page: number }) {
    const [state, action, isPending] = useActionState(receiptSearchAction, initialReceiptSearch);
    const { receiptList, formRef, todayReceipt, dailySummary, setReceiptList } = useReceiptSearch(action);
    const {date, date_id} = useDailySummary()
    const deletePage = useDeletePage()

    
    //일일종합검색
    useEffect(()=>{
        if(date_id && !isPending){
            deletePage()
            const formData = new FormData(formRef.current);
            formData.set('searchSDate', date)
            formData.set('searchEDate', date)
            formData.set('customerId', initialReceiptSearch.customerId);
            formData.set('customerName', initialReceiptSearch.customerName);
            formData.set('stockId', initialReceiptSearch.stockId);
            formData.set('productName', initialReceiptSearch.productName);
            formData.set('action', 'submit');
            startTransition(() => {
                action(formData);
            });
        }
    },[date_id])

    const submitHandler = useCallback(() => {
        const formData = new FormData(formRef.current);
        formData.set('action', 'submit');
        startTransition(() => {
            action(formData);
        });
    }, [action]);

    useEffect(()=>{
        if(state.searchReceipt){
            setReceiptList(state.searchReceipt)
        }
    },[state])

    //검색중일 때 receipt이 갱신되면 해당검색조건으로 재호출
    useEffect(()=>{
        if(receiptList){
            submitHandler()
        }
    },[initialReceipts])

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

    const memoizedReceiptCategoryEnum = useMemo(() => {
        return Object.entries(ReceiptCategoryEnum).map(([key,value]) => (
            <option key={key} value={key}>
                {value}
            </option>
        ));
    }, [ReceiptCategoryEnum]);


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
                                검색 옵션
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-label">전표종류</td>
                            <td>
                                <label>
                                    <select name="category" size={1} defaultValue={state.category} key={state.category}>
                                        {memoizedReceiptCategoryEnum}
                                    </select>
                                </label>
                            </td>
                            <td rowSpan={4} className="table-buttons">
                                <button type='button' onClick={()=>{
                                        submitHandler()
                                        deletePage()
                                    }}>
                                    전 표 검 색
                                </button>
                                <button type='button' onClick={dailySummary}>
                                    일일종합검색
                                </button>
                                <button type='button' onClick={todayReceipt}>
                                    오늘일자보기
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
                                <input type='hidden' name='customerId' value={state.customerId} readOnly/>
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
            <MemoizedReceiptSearchResult allReceiptList={receiptList??initialReceipts}/>
            {!isPending &&
                <Pagination
                    totalItems={(receiptList?? initialReceipts).length}
                    itemCountPerPage={10}
                    pageCount={4}
                    currentPage={Number(page)}
                />}
        </div>
    );
}
