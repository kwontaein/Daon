'use client';
import '@/styles/table-style/search.scss';

import {AffiliationType} from '@/model/types/customer/affiliation/type';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import {CustomerCateEnum, ResponseCustomer} from '@/model/types/customer/customer/type';
import {StockCate} from '@/model/types/stock/cate/type';
import {startTransition, useActionState, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import {initialLedgertState, ledgerSearchAction} from '@/features/ledger/actions/ledgerSearchAction';
import {ResponseStock} from '@/model/types/stock/stock/types';
import useSearchStock from '@/hooks/stock/search/useSearchStock';
import LedgerCustomerSearchResult from './search-result';
import {useModalState} from '@/store/zustand/modal';
import {exportLedgerCustomerToExcel} from "@/components/main/ledger/ledger-customer/exportLedgerCustomerToExcel";
import useRouterPath from '@/hooks/share/useRouterPath';
import useCheckBoxState from '@/hooks/share/useCheckboxState';
import { ReceiptCategoryEnum } from '@/model/types/sales/receipt/type';

export default function LedgerCustomerSearch({affiliations, stockCates}: {
    affiliations: AffiliationType[],
    stockCates: StockCate[]
}) {
    const [state, action] = useActionState(ledgerSearchAction, initialLedgertState)
    const formRef = useRef(null)
    const [searchInfo, setSearchInfo] = useState({
        searchResult: [],
        searchTitle: null,
        searchSDate: null,
    })
    const checkCustomerId = useCallback(() => !!state.customerId, [state.customerId]);
    const checkStockId = useCallback(() => !!state.stockId, [state.stockId]);
    const {customer, setModalState} = useModalState()
    const redirect = useRouterPath()

    const receiptIds = useMemo(
        () => searchInfo.searchResult.filter(({category}) =>['매출', '매출대체'].includes(ReceiptCategoryEnum[category])).map(({receiptId}) => receiptId),
        [searchInfo.searchResult]
    )
    const estimateCheckHook = useCheckBoxState(receiptIds)
  
    useEffect(() => {
        //거래처별 원장조회를 누를 시 ModalState 갱신 후 ledger-customer로 이동하여 조회 
        //첫 랜더링 시에만 검색처리
        const {customerId, customerName} = customer
        if (customerId && customerName) {

            const formData = new FormData(formRef.current);
            formData.set('customerName', customerName)
            formData.set('customerId', customerId)
            formData.set('action', 'customer');
            startTransition(() => {
                action(formData);
            });
            //조회 후 값 비워주기 -> 재조회 방지
            setModalState({customer: {}})
        }
    }, [])

    useEffect(() => {
        if (state.searchResult) {
            if (state.searchResult.length === 0) {
                window.alert("검색 조건에 해당하는 결과가 없습니다.")
            }
            setSearchInfo({
                searchResult: state.searchResult,
                searchTitle: state.customerName,
                searchSDate: state.searchSDate
            })
        }
    }, [state])

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
        if (!state.customerId) {
            window.alert('거래처를 선택해주세요')
            return
        }
        const formData = new FormData(formRef.current);
        formData.set('action', 'customer');
        startTransition(() => {
            action(formData);
        });
    }



    const printEstimatehandler = ()=>{
        const {checkedState} = estimateCheckHook
        const selectedReceipt = Object.keys(checkedState);

        if(selectedReceipt.length>17){
            window.alert('17개 이상은 출력할수 없습니다.')
            return
        }
        const params = new URLSearchParams({
            receiptIds:JSON.stringify(selectedReceipt),
         });

        if(window.innerWidth>620){
            const url = `/estimate-print?${params.toString()}`;
            const popupOptions = "width=780,height=980,scrollbars=yes,resizable=yes"; 
            window.open(url, "printEstimate", popupOptions);
        }else{
            redirect(`estimate-print?${params.toString()}`)
        }
        
    }

    return (
        <>
            <section className='search-container'>
                <form action={action} ref={formRef}>
                    <table className='search-table'>
                        <colgroup>
                            <col style={{width: '5%'}}/>
                            <col style={{width: '1%'}}/>
                            <col style={{width: '5%'}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <td colSpan={4} className="table-title">
                                거래처 구분 &nbsp;: &nbsp;
                                <label>
                                    <select className="title-selector"
                                            size={1} name='customerCate'
                                            defaultValue={state.customerCate}
                                            key={state.customerCate}>
                                        <option value='none'>선택안함</option>
                                        {Object.entries(CustomerCateEnum).map(([key, value]) => (
                                            <option value={key} key={key}>{value}</option>
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
                            <td className='table-label'>소속</td>
                            <td>
                                <label>
                                    <select size={1} name='affiliationId' defaultValue={state.affiliationId}
                                            key={state.affiliationId}>
                                        <option value='none'>선택안함</option>
                                        {affiliations.map((affiliation) => (
                                            <option key={affiliation.affiliationId} value={affiliation.affiliationId}>
                                                {affiliation.affiliationName}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </td>
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
                            <td className='table-label'>물품분류</td>
                            <td>
                                <label>
                                    <select size={1} name='stockCate' defaultValue={state.stockCate}
                                            key={state.stockCate} style={{width: 'calc(100% + 4px)'}}>
                                        <option value='none'>선택안함</option>
                                        {stockCates.map((stock) => (
                                            <option key={stock.stockCateId} value={stock.stockCateId}>
                                                {stock.stockCateName}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </td>
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
                            <td className='table-label'>전표선택</td>
                            <td className='table-radio-container' colSpan={3}>
                                <div>
                                    <label><input type='checkbox' name='receiptCate' defaultChecked={state.sales}
                                                  value='sales'/> 매출</label>
                                    <label><input type='checkbox' name='receiptCate' defaultChecked={state.purchase}
                                                  value='purchase'/> 매입</label>
                                    <label><input type='checkbox' name='receiptCate' defaultChecked={state.deposit}
                                                  value='deposit'/> 입금</label>
                                    <label><input type='checkbox' name='receiptCate' defaultChecked={state.withdrawal}
                                                  value='withdrawal'/> 출금</label>
                                    <label><input type='checkbox' name='receiptCate'
                                                  defaultChecked={state.salesDiscount}
                                                  value='salesDiscount'/> 매출할인</label>
                                    <label><input type='checkbox' name='receiptCate'
                                                  defaultChecked={state.purchaseDiscount}
                                                  value='purchaseDiscount'/> 매입할인</label>
                                    <label><input type='checkbox' name='receiptCate' defaultChecked={state.returnOut}
                                                  value='returnOut'/> 반품출고</label>
                                    <label><input type='checkbox' name='receiptCate' defaultChecked={state.returnIn}
                                                  value='returnIn'/> 반품입고</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className='one-line-buttons'>
                                <div>
                                    <button type='button'
                                            onClick={submitHandler}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색
                                    </button>
                                    <button type='button' disabled={searchInfo.searchResult.length===0} onClick={() =>
                                        exportLedgerCustomerToExcel(searchInfo.searchTitle, searchInfo.searchResult)
                                    }>엑 셀 변 환
                                    </button>
                                    <button type='button' onClick={()=>window.print()} disabled={searchInfo.searchResult.length===0}>인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;쇄</button>
                                    <button type='button' disabled={Object.keys(estimateCheckHook.checkedState).length===0} onClick={printEstimatehandler}>견적서인쇄</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </section>

            {searchInfo.searchResult.length > 0 &&
                <LedgerCustomerSearchResult searchInfo={searchInfo} estimateCheckHook={estimateCheckHook}/>
            }
        </>
    )
}