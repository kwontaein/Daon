
'use client';
import '@/styles/table-style/search.scss';

import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import { startTransition, useActionState, useCallback, useEffect, useRef, useState } from 'react';
import { initialLedgertState, ledgerSearchAction } from '@/features/ledger/actions/ledgerSearchAction';
import useSearchStock from '@/hooks/stock/search/useSearchStock';
import { ResponseStock } from '@/model/types/stock/stock/types';
import LedgerStockSearchResult from './search-result';
import { useModalState } from '@/store/zustand/modal';

export default function LedgerStockSearch(){
    const [state, action] = useActionState(ledgerSearchAction,initialLedgertState)
    const [searchInfo, setSearchInfo] = useState({
        searchResult:[],
        searchTitle:null,
        searchSDate:null,
    })
    const {stock,setModalState} = useModalState() 
    const formRef = useRef(null)
        
    useEffect(()=>{
        //품목에서 원장조회를 누를 시 ModalState 갱신 후 ledger-stock로 이동하여 조회 
        //첫 랜더링 시에만 검색처리
        const {stockId, productName, modelName} = stock
        if(stockId && productName){

            const formData = new FormData(formRef.current);
            formData.set('stockId',stockId)
            formData.set('productName',productName)
            formData.set('modelName',modelName)

            formData.set('action', 'customer');
            startTransition(() => {
                action(formData);
            });
            
            //조회 후 값 비워주기 -> 재조회 방지
            setModalState({stock:{}})
        }
    },[])

    //물품 검색관련
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

    const changeStockHandler = useCallback((stockInfo: Pick<ResponseStock,"stockId"|"productName"|"modelName">) => {
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

    useEffect(()=>{
        if(state.searchResult){
            if(state.searchResult.length===0){
                window.alert("검색 조건에 해당하는 결과가 없습니다.")
            }
            setSearchInfo({
                searchResult:state.searchResult,
                searchTitle:`${state.productName}(${state.modelName??'-'})`,
                searchSDate: state.searchSDate
            })
        }
    },[state])

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
                                   defaultValue={state.stockId ? `${state.productName} [${state.modelName??'-'}]` : ''} 
                                   key={state.stockId}
                                   onKeyDown={searchStockHandler}/>
                            <input type='hidden' name='stockId' value={state.stockId??''} readOnly/>
                            <input type='hidden' name='productName' value={state.productName??''} readOnly/>
                            <input type='hidden' name='modelName' value={state.modelName??''} readOnly/>
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
                                <button type='button' onClick={()=>window.print()}>인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;쇄</button>
                           </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </form>
            {searchInfo.searchResult.length>0 &&
                <LedgerStockSearchResult searchInfo={searchInfo}/>
            }
        </section>
    )
}