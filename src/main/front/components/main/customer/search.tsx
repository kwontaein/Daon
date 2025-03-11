'use client'
import {
    startTransition,
    useActionState,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';

import '@/styles/table-style/search.scss';

import {apiUrl} from '@/model/constants/apiUrl';
import {Affiliation} from '@/model/types/customer/affiliation/type';

import {useWindowSize} from '@/hooks/share/useWindowSize';
import {customerSearchAction, initialCustomerState} from '@/features/customer/customer/actions/customerSearchAction';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {ResponseCustomer} from '@/model/types/customer/customer/type';
import {changeFormData} from '@/features/share/changeFormData';
import CustomerSearchResult from './search-result';
import Pagination from '@/components/share/pagination';

export default function CustomerSearch(
    {affiliations, initialCustomers, page} : {
        affiliations: Affiliation[],
        initialCustomers: ResponseCustomer[],
        page: number
    }
) {
    const [state, action, isPending] = useActionState(customerSearchAction, {
        ...initialCustomerState,
        customers: initialCustomers,
        initialCustomers
    });
    console.log(affiliations)

    const pageByCustomers = useMemo(() =>
        state.customers.slice((page - 1) * 20, ((page - 1) * 20) + 20)
    ,[state.customers, page])

    const [loading, setLoading] = useState(true)
    const size = useWindowSize()
    const inputRef = useRef(null)

    useEffect(() => {
        setLoading(isPending)
    }, [isPending])

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
    const registerCustomer = () => {
        //pc
        if (size.width > 620) {
            const url = `${apiUrl}/register-customer`; // 열고 싶은 링크
            const popupOptions = "width=600,height=500,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }

    console.log(pageByCustomers)
    return (
        <>
        <div className='search-container'>
            <form action={action}>
            <table className="search-table">
                <colgroup>
                    <col style={{width: '5%'}}/>
                    <col style={{width: '70%'}}/>
                    <col style={{width: '1%'}}/>
                </colgroup>
                <thead>
                    <tr>
                        <td colSpan={3} className="table-title">
                            거래처 구분 &nbsp;: &nbsp;
                            <label>
                                <select
                                    className="title-selector"
                                    size={1}
                                    name='category'
                                    defaultValue={state.postSearchInfo.category ?? 'none'}
                                    key={state.postSearchInfo.category}>
                                    <option value='none'>선택안함</option>
                                    <option value="SALE">판매처</option>
                                    <option value="PURCHASE">구매처</option>
                                    <option value="CONSUMER">소비자</option>
                                    <option value="SUBCONTRACTOR">하청업체</option>
                                    <option value="ETC">기타</option>
                                </select>
                            </label>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='table-label'>소속</td>
                        <td>
                            <label>
                                <select
                                    size={1}
                                    name='cateId'
                                    defaultValue={state.postSearchInfo.cateId ?? 'none'}
                                    key={state.searchKey}>
                                    <option value='none'>선택안함</option>
                                    {
                                        affiliations.map((affiliation) => (
                                            <option key={affiliation.affiliationId} value={affiliation.affiliationId}>
                                                {affiliation.affiliationName}
                                            </option>
                                        ))
                                    }
                                </select>
                            </label>
                        </td>
                        <td rowSpan={3}>
                            <div className="grid-table-buttons">
                                <button type='submit' disabled={isPending} onClick={redirectPage}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button
                                    type='submit'
                                    disabled={isPending}
                                    onClick={(e) => startTransition(() => {
                                        e.preventDefault();
                                        const formData = changeFormData({
                                            ...initialCustomerState,
                                        })
                                        action(formData)
                                        redirectPage()
                                    })}>전 체 보 기</button>
                                <button onClick={registerCustomer}>신 규 등 록</button>
                                <button>엑 셀 변 환</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>검색대상</td>
                        <td className='table-radio-container'>
                            <div>
                                <label>
                                    <input
                                        type='radio'
                                        name='searchTarget'
                                        value='all'
                                        key={state.searchKey}
                                        defaultChecked={state.postSearchInfo.searchTarget==='all'}/>
                                    전체
                                </label>
                                <label>
                                    <input
                                        type='radio'
                                        name='searchTarget'
                                        value='payment'
                                        key={state.searchKey}
                                        defaultChecked={state.postSearchInfo.searchTarget==='payment'}/>
                                    미수/미지급 거래처만
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td
                            className='table-label'
                            style={{
                                paddingInline: '0.4em'
                            }}>
                            <select
                                className='classification-label'
                                name="searchInputTarget"
                                size={1}
                                key={state.searchKey}
                                defaultValue={state.searchInputTarget}>
                                <option value="customerName">상호명/담당기사</option>
                                <option value="ceo">대표자</option>
                            </select>
                        </td>
                        <td>
                            <input
                               ref={useCallback((node)=>{
                                    inputRef.current = node;
                                    inputRef.current?.focus();
                                },[pageByCustomers])}
                                type='text'
                                name='searchInput'
                                key={state.searchKey}
                                defaultValue={state.searchInput}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            </form>
        </div>
        <CustomerSearchResult pageByCustomers={pageByCustomers}/>
            {!loading &&
                <Pagination
                    totalItems={state.customers.length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}/>
            }
        </>
    )
}