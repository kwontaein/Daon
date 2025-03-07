'use client'
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import '@/styles/table-style/search-result.scss';
import { useMemo, useState } from 'react';
export default function CustomerSearchItems({customers, page, pageLength} : {
    customers: ResponseCustomer,
    page: number,
    pageLength: number
}) {


    return(
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

            </tbody>
        </table>
    )
}