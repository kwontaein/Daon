'use client';
import '@/styles/table-style/search.scss';

import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import {startTransition, useActionState, useEffect, useMemo, useRef, useState} from 'react';
import {initialLedgertState, ledgerSearchAction} from '@/features/ledger/actions/ledgerSearchAction';
import {ResponseOfficial} from '@/model/types/sales/official/type';
import LedgerOfficialSearchResult from './search-result';


import {exportLedgerToExcel} from "@/components/main/ledger/ledger-official/exportLedgerToExcel";


export default function LedgerOfficialSearch({officials}: { officials: ResponseOfficial[] }) {
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
                searchTitle: `${state.searchSDate} ~ ${state.searchEDate} 관리비원장`,
            })
        }
    }, [state])

    const submitHandler = () => {
        const formData = new FormData(formRef.current);
        formData.set('action', 'official');
        startTransition(() => {
            action(formData);
        });
    }


    const officialMap = useMemo(() =>
            Object.fromEntries(officials.map(({officialId}) => [officialId, 0]))
        , [officials])


    const totalResult = useMemo(() =>
            searchInfo.searchResult.reduce((prev, next) => {
                const {total, quantity, outPrice} = prev
                prev.officialTotal[next.officialId] += next.totalPrice
                return {
                    total: total + next.totalPrice,
                    quantity: quantity + next.quantity,
                    outPrice: outPrice + next.outPrice,
                    officialTotal: prev.officialTotal
                }
            }, {total: 0, quantity: 0, outPrice: 0, officialTotal: {...officialMap}})

        , [searchInfo])

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
                                <CustomDateInput defaultValue={state.searchSDate}
                                                 name='searchSDate'/> ~ <CustomDateInput
                                defaultValue={state.searchEDate} name='searchEDate'/>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>관리비분류</td>
                        <td>
                            <select name='officialId' defaultValue={state.officialId} key={state.officialId}>
                                <option value='none'>관리비분류</option>
                                {officials.map((official) => (
                                    <option key={official.officialId}
                                            value={official.officialId}>{official.officialName}</option>
                                ))}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} className='one-line-buttons'>
                            <div>
                                <button type='button'
                                        onClick={submitHandler}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색
                                </button>
                                <button type='button' disabled={searchInfo.searchResult.length===0} onClick={() => exportLedgerToExcel(
                                    searchInfo.searchResult,
                                    totalResult.officialTotal,
                                    officials
                                )}>엑 셀
                                    변 환
                                </button>
                                <button type='button' disabled={searchInfo.searchResult.length===0} onClick={()=>window.print()}>인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;쇄</button>
                            </div>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </form>
            {searchInfo.searchResult.length > 0 &&
                <LedgerOfficialSearchResult searchInfo={searchInfo} officials={officials} totalResult={totalResult}/>
            }
        </section>
    )
}