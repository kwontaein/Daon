
'use client';
import '@/styles/table-style/search.scss';

import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { initialLedgertState, ledgerSearchAction } from '@/features/ledger/actions/ledgerSearchAction';
import { StockCate } from '@/model/types/stock/cate/type';
import LedgerStockCountSearchResult from './search-result';

export default function LedgerStockCountSearch({stockCates}:{stockCates:StockCate[]}){
    const [state, action] = useActionState(ledgerSearchAction,initialLedgertState)
    const formRef = useRef(null)

    const [searchInfo, setSearchInfo] = useState({
        searchResult:[],
        searchTitle:null,
    })    
    
    useEffect(()=>{
        if(state.searchResult){
            console.log(state.searchResult)
            setSearchInfo({
                searchResult:state.searchResult,
                searchTitle:`재고조사서`,
            })
        }
    },[state])

    const submitHandler =() => {
        const formData = new FormData(formRef.current);
        formData.set('action', 'stock-count');
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
                        <td className='table-label'>품목분류</td>
                        <td>
                            <select name='stockCateId' defaultValue={state.stockCateId} key={state.stockCateId}>
                                <option value='none'>관리비분류</option>
                                {stockCates.map((stockCate)=>(
                                    <option key={stockCate.stockCateId} value={stockCate.stockCateId}>{stockCate.stockCateName}</option>
                                ))}
                            </select>
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
            {searchInfo.searchResult.length>2 &&
                <LedgerStockCountSearchResult searchInfo={searchInfo}/>
            }
        </section>
    )
}