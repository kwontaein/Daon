'use client'
import '@/styles/table-style/search.scss';

import {startTransition, useActionState, useEffect, useMemo, useRef, useState} from 'react';

import {apiUrl} from '@/model/constants/apiUrl';
import {changeFormData} from '@/features/share/changeFormData';
import {initialStockState, stockSearchAction} from '@/features/stock/stock/action/stock-search';


import {StockCate} from '@/model/types/stock/cate/type';
import {ResponseStock} from '@/model/types/stock/stock/types';

import StockSearchResult from './search-result';
import Pagination from '@/components/share/pagination';
import useDeletePage from '@/hooks/share/useDeletePage';

export default function StockSearch({stockCate, initialStocks, page} : {
    stockCate: StockCate[],
    initialStocks: ResponseStock[],
    page: number
}) {
    const [state, action, isPending] = useActionState(stockSearchAction, initialStockState);
    const [searchResult, setSerchResult] = useState<ResponseStock[]>()
    const pageByStocks = useMemo(()=>(searchResult??initialStocks).slice((page - 1) * 20, ((page - 1) * 20) + 20),[initialStocks,searchResult,page])
    const [condition, setCondition] = useState(initialStockState.condition!=='none')

    const formRef = useRef(null)
    const redirectPage = useDeletePage()
    

    //TODO: 모바일버전 구현
    const registerStock = () => {
        //pc
        if (window.innerWidth> 620) {
            const url = `${apiUrl}/register-stock`; // 열고 싶은 링크
            const popupOptions = "width=600,height=500,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }

    
    const submitHandler = () => {
        if(isPending) return
        const formData = new FormData(formRef.current!);
        formData.set('action', 'submit');
        startTransition(() => {
            action(formData);
        });
    };

    useEffect(()=>{
        if(state.searchResult){
            setSerchResult(state.searchResult)
            redirectPage()
        }
    },[state])

    return (
        <>
            <div className='search-container'>
                <form action={action} ref={formRef}>
                    <table className="search-table">
                        <colgroup>
                            <col style={{ width: '5%' }}/>
                            <col style={{ width: '70%' }}/>
                            <col style={{ width: '1%' }}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <td colSpan={3} className="table-title">
                                    <select
                                        className="title-selector"
                                        name="condition"
                                        key={state.searchKey}
                                        value={condition
                                            ? 'condition'
                                            : 'none'}
                                        onChange={(e) => setCondition(e.target.value === 'condition')}>
                                        <option value="none">일반검색</option>
                                        <option value="condition">조건부검색</option>
                                    </select>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='table-label'>분류</td>
                                <td>
                                    <label>
                                        <select
                                            size={1}
                                            name='category'
                                            key={state.searchKey}
                                            defaultValue={state.category}>
                                            <option value='none'>선택안함</option>
                                            {
                                                stockCate.map((cate : StockCate) => (
                                                    <option key={cate.stockCateId} value={cate.stockCateId}>
                                                        {cate.stockCateName}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </label>
                                </td>
                                <td rowSpan={4}>
                                    <div className="grid-table-buttons">
                                        <button type='submit' disabled={isPending} onClick={submitHandler}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                        <button
                                            type="button"
                                            disabled={isPending}
                                            onClick={(e) => {
                                                setSerchResult(null)
                                                redirectPage()
                                                setCondition(false)
                                            }}>전 체 보 기</button>
                                        <button type="button" onClick={registerStock}>신 규 등 록</button>
                                        <button type="button">엑 셀 변 환</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-label'>재고사용여부</td>
                                <td className='table-radio-container' key={JSON.stringify(condition)}>
                                    <div>
                                        <label
                                            className={condition
                                                ? ''
                                                : 'lock'}>
                                            <input
                                                type='radio'
                                                name='stockUseEa'
                                                key={state.stockUseEa}
                                                value='use'
                                                disabled={!condition}
                                                defaultChecked={condition && state.stockUseEa}/>
                                            사용
                                        </label>
                                        <label
                                            className={condition
                                                ? ''
                                                : 'lock'}>
                                            <input
                                                type='radio'
                                                name='stockUseEa'
                                                key={state.stockUseEa + 1}
                                                value='unUse'
                                                disabled={!condition}
                                                defaultChecked={condition && !state.stockUseEa}/>
                                            사용안함
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-label'>재고(유/무)</td>
                                <td className='table-radio-container' key={JSON.stringify(condition)}>
                                    <div>
                                        <label
                                            className={condition
                                                ? ''
                                                : 'lock'}>
                                            <input
                                                type='radio'
                                                name='remain'
                                                key={state.remain}
                                                value='use'
                                                disabled={!condition}
                                                defaultChecked={condition && state.remain}/>
                                            있음
                                        </label>
                                        <label
                                            className={condition
                                                ? ''
                                                : 'lock'}>
                                            <input
                                                type='radio'
                                                name='remain'
                                                key={state.remain+1}
                                                value='unUse'
                                                disabled={!condition}
                                                defaultChecked={condition && !state.remain}/>
                                            없음
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-label'>품명</td>
                                <td>
                                    <input type='text' 
                                           name='productName' 
                                           key={state.productName} 
                                           defaultValue={state.productName} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <StockSearchResult pageByStocks={pageByStocks}/>
            {!isPending &&
                <Pagination
                    totalItems={(searchResult??initialStocks).length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}/>
            }
        </>
    )
}