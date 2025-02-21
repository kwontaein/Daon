"use client";
import './search-result.scss';

import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ResponseCustomer } from '@/types/customer/type';
import { RootState } from '@/hooks/redux/store';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import useCheckBoxState from '@/hooks/share/useCheckboxState';
import { CustomerSearchCondition } from '@/hooks/redux/slice/customer-search';

import CustomerOptions from './options';
import Pagination from '@/components/pagination';
import { CustomerCategoryMap } from '@/constants/customer/customer-data';



export default function CustomerSearchResult({initialCustomers, page}:{initialCustomers:ResponseCustomer[], page:number}){
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const [customers, setCustomers] = useState<ResponseCustomer[]>(initialCustomers)
    const [pageByCustomer, setPageByCustomer] = useState<ResponseCustomer[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);

    //router control
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
  
    const customerIdList = pageByCustomer.map((({customerId})=> customerId))
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(customerIdList)
    const {searchInputTarget, searchInput, postSearchInfo, isSearch, allView} = useSelector((state:RootState)=> state.customerSearch);

    const fetchSearchCustomers = useCallback(async (searchCondition:CustomerSearchCondition)=>{
        try {
            const response = await fetch("http://localhost:8080/api/getCustomers", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchCondition),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const text = await response.text();
            setCustomers(text ? JSON.parse(text) : []);
        } catch (error) {
            console.error('Error:', error);
        }
    },[])

  
    //if start search then retry settings customer data
    useEffect(()=>{
        if(allView ||isSearch){
            if(isSearch) {
                const cateId = postSearchInfo.cateId ==='none' ? null : postSearchInfo.cateId
                const category =  postSearchInfo.category ==='none' ? null : postSearchInfo.category
                const searchCondition ={...postSearchInfo, cateId, category, [searchInputTarget]:searchInput}
                fetchSearchCustomers(searchCondition)
            }
            if(allView){
                setCustomers(initialCustomers)
                setPageByCustomer(initialCustomers.slice((page-1)*20, ((page-1)*20)+20))
            }
        
            const params = new URLSearchParams(searchParams.toString()); 
            params.delete("page"); 
            // 기존 pathname 유지
            router.push(`${pathname}?${params.toString()}`); 
        }
    },[isSearch,allView])

    useEffect(()=>{
        setPageByCustomer(customers.slice((page-1)*20, ((page-1)*20)+20))
        setLoading(false)
    },[customers, page])


    const tableRender = useMemo(()=>{
        return(
            <>
            <table className="customer-result-table">
                <colgroup>
                        <col style={{ width: '1%' }} />
                        <col style={{ width: '11%' }} />
                        <col style={{ width: '9%' }} />
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '11%' }} />
                        <col style={{ width: '11%' }} />
                        <col style={{ width: '9%' }} />
                        <col style={{ width: '11%' }} />
                        <col style={{ width: '3%', minWidth: '32px' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td><input type="checkbox" onChange={toggleAllChecked} checked={isAllChecked}/></td>
                        <td>구분</td>
                        <td>분류</td>
                        <td>상호명</td>
                        <td>전화</td>
                        <td>FAX</td>
                        <td>담당</td>
                        <td>현잔액</td>
                        <td>옵션</td>
                    </tr>
                </thead>
                <tbody>
                    {pageByCustomer.map((customer:ResponseCustomer, index) => (
                        <tr key={index} ref={(el)=> {itemsRef.current[customer.customerId] = el}} className={target === customer.customerId ?'is-click' :''}>
                            <td><input type="checkbox" 
                                       checked={checkedState[customer.customerId]|| false} 
                                       onChange={update_checked.bind(null,customer.customerId)}/>
                            </td>
                            <td>{customer.customerCateId.customerCateName}</td>
                            <td>{CustomerCategoryMap[customer.category]}</td>
                            <td className='left-align'>{customer.customerName}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.fax}</td>
                            <td>{customer.etc}</td>
                            <td></td>
                            <td className='icon' onClick={()=> target === customer.customerId ? setTarget(null) :setTarget(customer.customerId)}>
                                <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === customer.customerId &&{color:'orange'}}/>
                                {target === customer.customerId && <CustomerOptions customerId={customer.customerId}/>}
                            </td>
                        </tr>
                    ))}
                    {!loading && pageByCustomer.length===0 && 
                        <tr className='none-hover'>
                            <td colSpan={9}>
                                <p>조회된 결과가 없습니다.</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {!loading  &&
                <Pagination
                    totalItems={customers.length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}
                />
            }
        </>
        )
    },[pageByCustomer,target])

    return(
       <>
        {tableRender}
       </>
    )
}

