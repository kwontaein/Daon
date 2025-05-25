'use client';
import '@/styles/table-style/search.scss';

import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import {ResponseCustomer} from '@/model/types/customer/customer/type';
import {StockCate} from '@/model/types/stock/cate/type';
import {startTransition, useActionState, useCallback, useEffect, useRef, useState} from 'react';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import {initialLedgertState, ledgerSearchAction} from '@/features/ledger/actions/ledgerSearchAction';
import {ResponseStock} from '@/model/types/stock/stock/types';
import useSearchStock from '@/hooks/stock/search/useSearchStock';
import LedgerPurchaseSearchResult from './search-result';
import {exportLedgerPurchaseToExcel} from "@/components/main/ledger/ledger-purchase/exportLedgerPurchaseToExcel";

export default function LedgerPurchaseSearch({stockCates}: { stockCates: StockCate[] }) {
    const [state, action] = useActionState(ledgerSearchAction, initialLedgertState)
    const formRef = useRef(null)

    const [searchInfo, setSearchInfo] = useState({
        searchResult: [],
        searchTitle: null,
    })
    useEffect(() => {
        if (state.searchResult) {
            if (state.searchResult.length === 0) {
                window.alert("검색 조건에 해당하는 결과가 없습니다.")
            }
            setSearchInfo({
                searchResult: state.searchResult,
                searchTitle: `${state.searchSDate} ~ ${state.searchEDate} 매입장`,
            })
        }
    }, [state])

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

    const submitHandler = () => {
        const formData = new FormData(formRef.current);
        formData.set('action', 'purchase');
        startTransition(() => {
            action(formData);
        });
    }


    return (
        <section className='search-container'>
            <form action={action} ref={formRef}>
                <table className='search-table'>
                    <colgroup>
                        <col style={{width: '10%'}}/>
                        <col style={{width: '90%'}}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <td colSpan={4} className="table-title">
                            품목 분류 &nbsp;: &nbsp;
                            <label>
                                <select className="title-selector" size={1} name='stockCate'
                                        defaultValue={state.stockCate} key={state.stockCate}>
                                    <option value='none'>선택안함</option>
                                    {stockCates.map((stock) => (
                                        <option key={stock.stockCateId} value={stock.stockCateId}>
                                            {stock.stockCateName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className='table-label'>출력일자</td>
                        <td colSpan={3}>
                            <span className='dates-container'>
                                <CustomDateInput defaultValue={state.searchSDate}
                                                 name='searchSDate'/> ~ <CustomDateInput
                                defaultValue={state.searchEDate} name='searchEDate'/>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처명</td>
                        <td>
                            <input type='text'
                                   name='customerName'
                                   defaultValue={state.customerName}
                                   key={state.customerName}
                                   onKeyDown={searchCustomerHandler}/>
                            <input type='hidden' name='customerId' value={state.customerId} readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>물품명</td>
                        <td>
                            <input type='text'
                                   name='productName'
                                   defaultValue={state.productName}
                                   key={state.productName}
                                   onKeyDown={searchStockHandler}/>
                            <input type='hidden' name='stockId' value={state.stockId} readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className='one-line-buttons'>
                            <div>
                                <button type='button'
                                        onClick={submitHandler}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색
                                </button>
                                <button type='button' disabled={searchInfo.searchResult.length===0} onClick={() =>
                                    exportLedgerPurchaseToExcel(
                                        searchInfo.searchResult,
                                        `${searchInfo.searchTitle} 원장`,
                                        `${searchInfo.searchTitle}_원장`
                                    )
                                }>엑 셀 변 환
                                </button>
                                <button type='button' disabled={searchInfo.searchResult.length===0} onClick={()=>window.print()}>인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;쇄</button>
                            </div>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </form>
            {searchInfo.searchResult.length > 0 &&
                <LedgerPurchaseSearchResult searchInfo={searchInfo}/>
            }
        </section>
    )
}