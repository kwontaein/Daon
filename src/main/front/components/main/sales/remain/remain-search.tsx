'use client'
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import remainSearchAction from '@/features/sales/remain/action/remainSearchAction';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import {CustomerCateEnum, ResponseCustomer} from '@/model/types/customer/customer/type';
import {RemianSearchCondition, ResponseRemain} from '@/model/types/sales/remain/type';
import '@/styles/table-style/search.scss';
import {startTransition, useActionState, useCallback, useEffect, useRef, useState} from 'react';
import ReaminSearchResult from './remain-search-result';
import dayjs from 'dayjs';
import {exportRemainReportToExcel} from "@/components/main/sales/remain/exportRemainReportToExcel";

export default function RemainSearch() {
    const initailRemainSearch = {
        customerCate: 'none',
        searchSDate: dayjs().subtract(2, 'month').date(1).format('YYYY-MM-DD'),
        searchEDate: dayjs(new Date(Date.now())).endOf('month').format('YYYY-MM-DD'),
        sortCondition: 'customer',
        condition: 'ALL',
    }
    const [state, action, isPending] = useActionState(remainSearchAction, initailRemainSearch)
    const formRef = useRef(null)
    const [remainList, setRemainList] = useState<ResponseRemain[]>([])


    const checkCustomerId = useCallback(() => !!state.customerId, [state.customerId]);
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

    const searchCustomerHandler = useSearchCustomer(checkCustomerId, changeCustomerHandler);

    const submitHandler = () => {
        if (isPending) return
        const formData = new FormData(formRef.current);
        formData.set('action', 'submit');
        startTransition(() => {
            action(formData);
        });
    }


    useEffect(() => {
        if (state.searchResult) {
            const sortedResult = state.searchResult.sort((a, b) => {
                if (state.sortCondition === 'customer') {
                    return a.customerName.localeCompare(b.customerName)
                } else {
                    if (b[state.sortCondition] === a[state.sortCondition]) {
                        return a.customerName.localeCompare(b.customerName)
                    }
                    return b[state.sortCondition] - a[state.sortCondition]
                }
            })
            if (sortedResult.length === 0) {
                window.alert('조회된 결과가 존재하지 않습니다.')
                return
            }
            setRemainList(sortedResult);
        }
    }, [state])

    return (
        <>
            <div className='search-container'>
                <form ref={formRef}>
                    <table className="search-table">
                        <colgroup>
                            <col style={{width: '10%'}}/>
                            <col style={{width: '89%'}}/>
                            <col style={{width: '1%'}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <td colSpan={3} className="table-title">
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
                            <td>
                            <span className='dates-container'>
                                <CustomDateInput defaultValue={state.searchSDate}
                                                 name='searchSDate'/> ~ <CustomDateInput
                                defaultValue={state.searchEDate} name='searchEDate'/>
                            </span>
                            </td>
                            <td rowSpan={4} className='table-buttons'>
                                <button type='button' onClick={submitHandler}
                                        disabled={isPending}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색
                                </button>
                                <button disabled={remainList.length === 0} onClick={() => exportRemainReportToExcel(remainList)}>엑 셀 변 환</button>
                                <button type='button' disabled={remainList.length === 0} onClick={()=>window.print()}>인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;쇄</button>
                            </td>
                        </tr>
                        <tr>
                            <td className='table-label'>거래처명</td>
                            <td>
                                <input type='text'
                                       name='customerName'
                                       defaultValue={state.customerName ?? ''}
                                       key={state.customerName}
                                       onKeyDown={searchCustomerHandler}/>
                                <input type='hidden' name='customerId' value={state.customerId ?? ''} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td className='table-label'>정렬조건</td>
                            <td className='table-radio-container'>
                                <div>
                                    <label><input type="radio" value="customer" name="sortCondition"
                                                  defaultChecked={state.sortCondition === 'customer'}/>거래처명 순</label>
                                    <label><input type="radio" value="currentBalance" name="sortCondition"
                                                  defaultChecked={state.sortCondition === 'currentBalance'}/>잔액
                                        순</label>
                                    <label><input type="radio" value="unpaid" name="sortCondition"
                                                  defaultChecked={state.sortCondition === 'unpaid'}/>미지급 순</label>
                                    <label><input type="radio" value="deposit" name="sortCondition"
                                                  defaultChecked={state.sortCondition === 'deposit'}/>미수금 순</label>
                                </div>
                                <div style={{marginTop: '4px'}}>
                                    <label><input type="radio" value="sales" name="sortCondition"
                                                  defaultChecked={state.sortCondition === 'sales'}/>매출 순</label>
                                    <label><input type="radio" value="purchase" name="sortCondition"
                                                  defaultChecked={state.sortCondition === 'purchase'}/>매입 순</label>
                                    <label><input type="radio" value="salesDC" name="sortCondition"
                                                  defaultChecked={state.sortCondition === 'salesDC'}/>매출할인 순</label>
                                    <label><input type="radio" value="purchaseDC" name="sortCondition"
                                                  defaultChecked={state.sortCondition === 'purchaseDC'}/>매입할인 순</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='table-label'>포함조건</td>
                            <td className='table-radio-container'>
                                <div>
                                    {Object.entries(RemianSearchCondition).map(([key, value]) => (
                                        <label key={key}>
                                            <input type='radio' value={key} name='condition'
                                                   defaultChecked={state.condition === key}/>{value}
                                        </label>
                                    ))}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            {remainList.length > 0 &&
                <ReaminSearchResult remainList={remainList}/>
            }
        </>
    )
}