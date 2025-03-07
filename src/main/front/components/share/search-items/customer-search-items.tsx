'use client'
import '@/styles/table-style/search-result.scss';
import '@/styles/_global.scss'
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { useMemo, useState } from 'react';
import Pagination from '../pagination';
import { CustomerCategoryMap } from '@/model/constants/customer/customer-data';
export default function CustomerSearchItems({customers, page, pageLength} : {
    customers: ResponseCustomer[],
    page: number,
    pageLength: number
}) {

    const selectValue = (value: string) => {
        if (window.opener) {
          window.opener.postMessage(value, "*");
          window.close();
        }
    };
      
    return(
        <section>
        <table className='search-result-table'>
            <thead>
                <tr>
                    <td>구분</td>
                    <td>상호명</td>
                    <td>전화</td>
                    <td>FAX</td>
                    <td>담당</td>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr key={customer.customerId} onClick={selectValue.bind(null,customer)}>
                        <td className='left-align'>{customer.customerName}</td>
                        <td>{CustomerCategoryMap[customer.category]}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.fax}</td>
                        <td>{customer.etc}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Pagination
                    totalItems={pageLength}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}/>
        </section>
    )
}