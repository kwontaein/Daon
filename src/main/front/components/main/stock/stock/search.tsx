'use client'
import '@/styles/table-style/search.scss';

import {startTransition, useActionState, useEffect, useMemo, useRef, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

import {apiUrl} from '@/model/constants/apiUrl';

import {changeFormData} from '@/features/share/changeFormData';
import {initialStockState, stockSearchAction} from '@/features/stock/stock/action/stock-search';

import {useWindowSize} from '@/hooks/share/useWindowSize';

import {StockCate} from '@/model/types/stock/cate/type';
import {ResponseStock} from '@/model/types/stock/stock/types';

import StockSearchResult from './search-result';
import Pagination from '@/components/share/pagination';

export default function StockSearch({stockCate, initialStocks, page} : {
    stockCate: StockCate[],
    initialStocks: ResponseStock[],
    page: number
}) {
    const [state, action, isPending] = useActionState(stockSearchAction, {
        ...initialStockState,
        stocks: initialStocks,
        initialStocks
    });
    const pageByStocks = useMemo(()=>state.stocks.slice((page - 1) * 20, ((page - 1) * 20) + 20),[state.stocks,page])
    const [condition, setCondition] = useState(initialStockState.condition!=='none')
    const [loading, setLoading] = useState(true)
    const size = useWindowSize()
    const inputRef = useRef(null)

    useEffect(()=>{
        setLoading(isPending)
    },[isPending])

    //router control
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const redirectPage = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        router.push(`${pathname}?${params.toString()}`);
    }

    //TODO: 모바일버전 구현
    const registerStock = () => {
        //pc
        if (size.width > 620) {
            const url = `${apiUrl}/register-stock`; // 열고 싶은 링크
            const popupOptions = "width=600,height=500,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }



    return (
        <>
            <div className='search-container'>
                <form action={action}>
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
                                        <button type='submit' disabled={isPending} onClick={redirectPage}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                        <button
                                            type='submit'
                                            disabled={isPending}
                                            onClick={(e) => startTransition(() => {
                                                e.preventDefault();
                                                const formData = changeFormData({
                                                    ...initialStockState,
                                                })
                                                action(formData)
                                                redirectPage()
                                                setCondition(false)
                                            })}>전 체 보 기</button>
                                        <button onClick={registerStock}>신 규 등 록</button>
                                        <button>엑 셀 변 환</button>
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
                                                key={state.searchKey}
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
                                                key={state.searchKey + 1}
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
                                                key={state.searchKey}
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
                                                key={state.searchKey}
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
                                           ref={inputRef}
                                           name='name' 
                                           key={state.searchKey} 
                                           defaultValue={state.name} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <StockSearchResult pageByStocks={pageByStocks}/>
            {!loading &&
                <Pagination
                    totalItems={state.stocks.length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}/>
            }
        </>
    )
}