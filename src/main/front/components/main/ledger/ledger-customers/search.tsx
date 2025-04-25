
'use client';
import '@/styles/table-style/search.scss';

import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { startTransition, useActionState, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { initialLedgertState, ledgerSearchAction } from '@/features/ledger/actions/ledgerSearchAction';
import useSearchCustomerList from '@/hooks/customer/search/useSearchCustomerList';
import LedgerCustomersSearchResult from './search-result';

export default function LedgerCustomerListSearch(){
    const [state, action] = useActionState(ledgerSearchAction,initialLedgertState)
    const formRef = useRef(null)

    const [searchInfo, setSearchInfo] = useState({
        searchResult:[],
        searchTitle:null,
        searchSDate:null
    })
    useEffect(()=>{
        if(state.searchResult){
            if(state.searchResult.length===0){
                window.alert("검색 조건에 해당하는 결과가 없습니다.")
            }
            setSearchInfo({
                searchResult:state.searchResult,
                searchTitle:`${state.searchSDate} ~ ${state.searchEDate} 복수거래처원장`,
                searchSDate: state.searchSDate
            })
        }
    },[state])

    
    //거래처 검색관련    
    const checkCustomerId = useCallback(() => {
        return (state.customerIds??[]).length >0
    }, [state.customerIds]);

    const changeHandler = useCallback(<T extends Record<string, string>[]>(customerList: T) => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const customerIds = customerList.map(({customerId})=>customerId)
            const customerNames = customerList.map(({customerName},idx)=> (idx!==0 ? ' ' : '') + customerName)
            formData.set('customerIds' ,JSON.stringify(customerIds));
            formData.set('customerName' ,customerNames.toString());
            

            startTransition(() => {
                action(formData);
            });
        }
    }, [action]);

    const changeCustomerHandler = useCallback((customerInfo: Pick<ResponseCustomer, "customerName" | "customerId">[]) => {
        changeHandler(customerInfo);
    }, [changeHandler]);

    const searchCustomerHandler = useSearchCustomerList(checkCustomerId, changeCustomerHandler);

    const submitHandler =() => {
        if((state.customerIds??[]).length===0){
            window.alert('거래처를 선택해주세요')
            return
        }
        const formData = new FormData(formRef.current);
        formData.set('action', 'customers');
        startTransition(() => {
            action(formData);
        });
    }
    

    return(
        <>
        <section className='search-container'>
            <form action={action} ref={formRef}>
            <table className='search-table'>
                <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '90%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td colSpan={2} className="table-title">
                            거래처 구분 
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='table-label'>출력일자</td>
                        <td>
                            <span className='dates-container'>
                                <CustomDateInput defaultValue={state.searchSDate} name='searchSDate'/> ~ <CustomDateInput defaultValue={state.searchEDate} name='searchEDate'/>
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
                            <input type='hidden' name='customerIds' value={JSON.stringify(state.customerIds)+''} readOnly/>
                        </td>              
                    </tr>
                    <tr>
                        <td className='table-label'>전표선택</td>
                        <td className='table-radio-container'>
                            <div>
                                <label><input type='checkbox' name='receiptCate' defaultChecked={state.sales} value='sales'/> 매출</label>
                                <label><input type='checkbox' name='receiptCate' defaultChecked={state.purchase} value='purchase'/> 매입</label>
                                <label><input type='checkbox' name='receiptCate' defaultChecked={state.deposit} value='deposit'/> 입금</label>
                                <label><input type='checkbox' name='receiptCate' defaultChecked={state.withdrawal} value='withdrawal'/> 출금</label>
                                <label><input type='checkbox' name='receiptCate' defaultChecked={state.salesDiscount} value='salesDiscount'/> 매출할인</label>
                                <label><input type='checkbox' name='receiptCate' defaultChecked={state.purchaseDiscount} value='purchaseDiscount'/> 매입할인</label>
                                <label><input type='checkbox' name='receiptCate' defaultChecked={state.returnOut} value='returnOut'/> 반품출고</label>
                                <label><input type='checkbox' name='receiptCate' defaultChecked={state.returnIn} value='returnIn'/> 반품입고</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='one-line-buttons'>
                            <div>
                                <button type='button' onClick={submitHandler}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button type='button'>엑 셀 변 환</button>
                                <button type='button'>인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;쇄</button>
                           </div>
                        </td>
                    </tr>
                        
                </tbody>
            </table>
            </form>
        </section>
        {searchInfo.searchResult.length>0 &&
            <LedgerCustomersSearchResult searchInfo={searchInfo}/>
        }
        </>
    )
}