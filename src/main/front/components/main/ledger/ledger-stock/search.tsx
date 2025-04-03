
'use client';
import '@/styles/table-style/search.scss';

import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { startTransition, useActionState, useCallback, useEffect, useRef } from 'react';
import { initialLedgertState, ledgerSearchAction } from '@/features/ledger/actions/ledgerSearchAction';
import useSearchStock from '@/hooks/stock/search/useSearchStock';
import { ResponseStock } from '@/model/types/stock/stock/types';

export default function LedgerStockSearch(){
    const [state, action] = useActionState(ledgerSearchAction,initialLedgertState)
    const formRef = useRef(null)
        //거래처 검색관련

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
    const changeStockHandler = useCallback((stockInfo: Pick<ResponseStock,"stockId"| "productName">) => {
        changeHandler(stockInfo);
    }, [changeHandler]);

    const searchStockHandler = useSearchStock(checkStockId, changeStockHandler);

    const submitHandler =() => {
        if(!state.stockId){
            window.alert('품목을 선택해주세요')
            return
        }
        const formData = new FormData(formRef.current);
        formData.set('action', 'stock');
        startTransition(() => {
            action(formData);
        });
    }
    

    return(
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
                            검색옵션
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
                        <td className='table-label'>품목명</td>
                        <td>
                            <input type='text' 
                                   name='productName' 
                                   defaultValue={state.productName} 
                                   key={state.productName}
                                   onKeyDown={searchStockHandler}/>
                            <input type='hidden' name='stockId' value={JSON.stringify(state.stockId)} readOnly/>
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
    )
}