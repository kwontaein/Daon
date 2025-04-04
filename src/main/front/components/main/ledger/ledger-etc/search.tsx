
'use client';
import '@/styles/table-style/search.scss';

import { Affiliation } from '@/model/types/customer/affiliation/type';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { CustomerCateEnum, ResponseCustomer } from '@/model/types/customer/customer/type';
import { StockCate } from '@/model/types/stock/cate/type';
import { startTransition, useActionState, useCallback, useEffect, useRef } from 'react';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import { initialLedgertState, ledgerSearchAction } from '@/features/ledger/actions/ledgerSearchAction';
import { ResponseStock } from '@/model/types/stock/stock/types';
import useSearchStock from '@/hooks/stock/search/useSearchStock';

export default function LedgerEtcSearch({affiliations, stockCates}:{affiliations:Affiliation[], stockCates:StockCate[]}){
    const [state, action] = useActionState(ledgerSearchAction,initialLedgertState)
    const formRef = useRef(null)
        

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

    const submitHandler =() => {
        const formData = new FormData(formRef.current);
        formData.set('action', 'etc');
        startTransition(() => {
            action(formData);
        });
    }
    

    return(
        <section className='search-container'>
            <form action={action} ref={formRef}>
            <table className='search-table'>
                <colgroup>
                    <col style={{ width: '5%'}} />
                    <col style={{ width: '10%'}} />
                    <col style={{ width: '5%'}} />
                    <col style={{ width: '80%'}} />
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
                                    {Object.entries(CustomerCateEnum).map(([key,value])=>(
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
                                <CustomDateInput defaultValue={state.searchSDate} name='searchSDate'/> ~ <CustomDateInput defaultValue={state.searchEDate} name='searchEDate'/>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>소속</td>
                        <td>
                            <label>
                                <select size={1} name='affiliationId' defaultValue={state.affiliationId} key={state.affiliationId}>                      
                                        <option value='none'>선택안함</option>
                                        {affiliations.map((affiliation)=>(
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
                                   className='short-input'
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
                                <select size={1} name='stockCate' defaultValue={state.stockCate} key={state.stockCate} style={{width:'calc(100% + 4px)'}}>
                                    <option value='none'>선택안함</option>
                                    {stockCates.map((stock)=>(
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
                                   className='short-input'
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
                        <td colSpan={4} className='one-line-buttons'>
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