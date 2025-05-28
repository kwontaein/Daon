'use client'
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import accountingSearchAction from '@/features/accounting/action/accountingSearchAction';
import {useScreenMode} from '@/hooks/share/useScreenMode';

import {
    CardTransaction,
    ExpenseProof,
    ProcurementSettlement,
    PurchaseVAT,
    SalesVAT,
    UnionAccountingType
} from '@/model/types/accounting/type';
import {ResponseCompany} from '@/model/types/staff/company/type';
import '@/styles/table-style/search.scss';
import {JSX, startTransition, useActionState, useEffect, useMemo, useRef, useState} from 'react';
import SVATSearchResult from './svat/search-result';
import PVATSearchResult from './pvat/search-result';
import PsetSearchResult from './pset/search-result';
import ProofSearchResult from './proof/search-result';
import CardSearchResult from './card/search-result';
import Pagination from '@/components/share/pagination';
import {
    getCardTransactionfApi,
    getExpenseProofApi,
    getProcurementApi,
    getPurchaseVatApi,
    getSalesVATApi
} from '@/features/accounting/api/search-server-api';
import dayjs from 'dayjs';
import useRouterPath from '@/hooks/share/useRouterPath';
import {exportSvatToExcel} from "@/components/main/accounting/svat/exportSvatToExcel";
import {exportPvatToExcel} from "@/components/main/accounting/pvat/exportPvatToExcel";
import {exportPsetToExcel} from "@/components/main/accounting/pset/exportPsetToExcel";
import {exportProofToExcel} from "@/components/main/accounting/proof/exportProofToExcel";
import {exportCardTransactionToExcel} from "@/components/main/accounting/card/exportCardTransactionToExcel";

const resultComponentMap: Record<string, (data: UnionAccountingType[]) => JSX.Element> = {
    svat: data => <SVATSearchResult salesVATList={data as SalesVAT[]}/>,
    pvat: data => <PVATSearchResult purchaseVATList={data as PurchaseVAT[]}/>,
    pset: data => <PsetSearchResult procurements={data as ProcurementSettlement[]}/>,
    proof: data => <ProofSearchResult expenseProofs={data as ExpenseProof[]}/>,
    card: data => <CardSearchResult cardTransaction={data as CardTransaction[]}/>,
};

const apiMap: Record<string, () => Promise<UnionAccountingType[]>> = {
    pvat: getPurchaseVatApi,
    svat: getSalesVATApi,
    card: getCardTransactionfApi,
    proof: getExpenseProofApi,
    pset: getProcurementApi,
};

export default function AccountingSearch({
                                             companyList,
                                             division,
                                             initialListState,
                                             page
                                         }: {
    companyList: ResponseCompany[];
    division: string;
    initialListState: UnionAccountingType[];
    page: number;
}) {
    const initialPset = {
        searchSDate: dayjs().subtract(2, 'month').date(1).format('YYYY-MM-DD'),
        searchEDate: dayjs(new Date(Date.now())).endOf('month').format('YYYY-MM-DD'),
    }
    const formRef = useRef<HTMLFormElement>(null);
    const [state, action, isPending] = useActionState(accountingSearchAction, initialPset);
    const mode = useScreenMode({tabletSize: 690, mobileSize: 620});
    const [searchResult, setSearchResult] = useState<UnionAccountingType[]>();

    const pageBySearchResult = useMemo(() => {
        const data = searchResult ?? initialListState;
        const start = (page - 1) * 20;
        return data.slice(start, start + 20);
    }, [searchResult, initialListState, page]);

    const submitHandler = () => {
        const formData = new FormData(formRef.current!);
        formData.set('action', division);
        startTransition(() => {
            action(formData);
        });
    };

    const redirect = useRouterPath()
    const registerAccountingHandler = () => {
        const params = new URLSearchParams({division});
        const url = `/register-accounting?${params.toString()}`;
        if (window.innerWidth > 620) {
            const popupOptions = 'width=800,height=500,scrollbars=yes,resizable=yes';
            window.open(url, 'register', popupOptions);
        } else {
            redirect(`register-accounting?${params.toString()}`);
        }
    };

    const allViewHandler = async () => {
        const fetchFn = apiMap[division];
        if (fetchFn) {
            const data = await fetchFn();
            setSearchResult(data);
        }
    };

    useEffect(() => {
        if (state.searchResult) {
            setSearchResult(state.searchResult);
        }
    }, [state]);

    const excelDownloadHandler = () => {
        if (division === 'svat') {
            const data = searchResult ?? initialListState;
            exportSvatToExcel(data as SalesVAT[]);
        } else if (division === 'pvat') {
            const data = searchResult ?? initialListState;
            exportPvatToExcel(data as PurchaseVAT[]);
        } else if (division === 'pset') {
            const data = searchResult ?? initialListState;
            exportPsetToExcel(data as ProcurementSettlement[]);
        } else if (division === 'proof') {
            const data = searchResult ?? initialListState;
            exportProofToExcel(data as ExpenseProof[]);
        } else if (division === 'card') {
            const data = searchResult ?? initialListState;
            exportCardTransactionToExcel(data as CardTransaction[]);
        }
        // pvat, card 등 다른 division 도 추가 가능
    };

    return (
        <>
            <section className="search-container">
                <form action={action} ref={formRef}>
                    <table className="search-table">
                        <colgroup>
                            <col style={{width: '10%'}}/>
                            <col style={{width: '89%'}}/>
                            <col style={{width: '1%'}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <td colSpan={3} className="table-title">
                                회사상호 &nbsp;: &nbsp;
                                <label>
                                    <select
                                        className="title-selector"
                                        size={1}
                                        name="companyId"
                                        defaultValue={state.companyId}
                                        key={state.companyId}
                                    >
                                        <option value="none">선택안함</option>
                                        {companyList.map(company => (
                                            <option value={company.companyId} key={company.companyId}>
                                                {company.companyName}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="table-label">출력일자</td>
                            <td>
                  <span
                      className="dates-container"
                      style={{display: `${mode === 'tabelt' ? 'block' : 'flex'}`}}>
                    <CustomDateInput
                        defaultValue={state.searchSDate}
                        name="searchSDate"
                        className={mode === 'tabelt' ? 'none-max-width' : ''}
                    />
                      {mode !== 'tabelt' && '~'}
                      <CustomDateInput
                          defaultValue={state.searchEDate}
                          name="searchEDate"
                          className={mode === 'tabelt' ? 'none-max-width' : ''}
                      />
                  </span>
                            </td>
                            <td rowSpan={2}>
                                <div className="grid-table-buttons">
                                    <button type="button" disabled={isPending} onClick={submitHandler}>
                                        검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색
                                    </button>
                                    <button type="button" onClick={allViewHandler}>
                                        전 체 보 기
                                    </button>
                                    <button type="button" onClick={excelDownloadHandler}>엑 셀 변 환</button>
                                    <button type="button" onClick={registerAccountingHandler}>
                                        신 규 등 록
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">업체명</td>
                            <td>
                                <input name="customerName" defaultValue={state.customerName || ''}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </section>

            {resultComponentMap[division]?.(pageBySearchResult) ?? null}

            {!isPending && (
                <Pagination
                    totalItems={(searchResult ?? initialListState).length}
                    itemCountPerPage={20}
                    pageCount={5}
                    currentPage={Number(page)}
                />
            )}
        </>
    );
}
