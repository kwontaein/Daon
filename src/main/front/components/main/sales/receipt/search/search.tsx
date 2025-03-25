'use client'

import '@/styles/table-style/search.scss';
import '@/styles/_global.scss';

import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSearchDate } from '@/store/slice/receipt-search';
import { receiptCategoryArr } from '@/model/constants/sales/receipt/receipt_constants';
import receiptSearchAction, { initialReceiptSearch } from '@/features/sales/receipt/action/receiptSearchAction';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import { ResponseStock } from '@/model/types/stock/stock/types';
import useSearchStock from '@/hooks/stock/search/useSearchStock';
import ReceiptSearchResult from './search-result';
import Pagination from '@/components/share/pagination';
import { ResponseReceipt } from '@/model/types/receipt/type';
import useReceiptSearch from '@/hooks/sales/receipt/useReceiptSearch';



export default function ReceiptSearch({initialReceipts, page}:{initialReceipts :ResponseReceipt[], page:number}) {
    const [state, action, isPending] = useActionState(receiptSearchAction,initialReceiptSearch)
    const [loading, setLoading] = useState(true)

    const {
        receiptList,
        pageByReceipt,
        formRef,
        todayReceipt,
        dailySummary,
        setReceiptList
   }= useReceiptSearch(initialReceipts, page, action)


   const submitHandler = ()=>{
    const formData = new FormData(formRef.current);
    formData.set('action','submit')
    startTransition(()=>{
        action(formData)
    }) 
    }

    useEffect(()=>{
        if(state.searchReceipt){
            setReceiptList(state.searchReceipt)
        }
    },[state])

    useEffect(()=>{
        setLoading(isPending)
    },[isPending])



    /**거래처 검색관련*/
    const checkCustomerId = () => !!state.customerId

    const changeCustomerHandler = (
    customerInfo : Pick <ResponseCustomer,
    'customerName' | 'customerId' >,
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

    /**물품 검색관련*/
    const checkStockId = () => !!state.stockId

    const changeStockHandler = (
    stockInfo : Pick <ResponseStock,
    'productName' | 'stockId' >,
    ) => {
    if (formRef.current) {
        const formData = new FormData(formRef.current);
        formData.set('productName', stockInfo.productName || '')
        formData.set('stockId', stockInfo.stockId || '')
        startTransition(() => {
            action(formData)
        })
    }
    }    
    const searchCustomerHandler = useSearchCustomer(checkCustomerId, changeCustomerHandler)
    const searchStockHandler = useSearchStock(checkStockId,changeStockHandler)



    return (
        <div className="search-container">
            <form action={action} ref={formRef}>
            <table className="search-table">
                <colgroup>
                    <col style={{ width: '8%' }} />
                    <col style={{ width: '72%' }} />
                    <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td colSpan={3} className="table-title center">
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
                                    {receiptCategoryArr.map(({categoryKey,categoryValue})=>(
                                        <option key={categoryKey} value={categoryValue}>{categoryValue}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td rowSpan={4} className="table-buttons">
                            <button type='button' onClick={submitHandler}>
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
                                <CustomDateInput defaultValue={state.searchSDate} name='searchSDate'/> ~ <CustomDateInput defaultValue={state.searchEDate} name='searchEDate'/>
                            </span>
                        </td>
                        
                    </tr>
                    <tr>
                        <td className="table-label">거래처선택</td>
                        <td>
                            <input placeholder="거래처명을 입력하세요." name ='customerName' key={state.customerName} defaultValue={state.customerName} onKeyDown={searchCustomerHandler}/>
                            <input type='hidden' name='customerId' value={state.customerId}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">품목선택</td>
                        <td>
                            <input placeholder="품명을 입력하세요." name='productName' key={state.productName} defaultValue={state.productName} onKeyDown={searchStockHandler} />
                            <input type='hidden' name='stockId' value={state.stockId}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            </form>
            <ReceiptSearchResult pageByReceipt={pageByReceipt} basicIndex={(page - 1) * 10} loading={loading}/>                    
                {!loading &&
                <Pagination
                    totalItems={receiptList.length}
                    itemCountPerPage={10}
                    pageCount={4}
                    currentPage={page}
                />}
        </div>
    );
}
