"use client";
import '@/styles/table-style/search-result.scss';

import React from 'react';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ResponseCustomer } from '@/model/types/customer/customer/type';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import useCheckBoxState from '@/hooks/share/useCheckboxState';

import CustomerOptions from './options';
import { CustomerCategoryMap } from '@/model/constants/customer/customer-data';



const CustomerSearchResult = React.memo(({pageByCustomers}:{pageByCustomers:ResponseCustomer[]})=>{
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);

    const customerIdList = pageByCustomers.map(({customerId})=> customerId)
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(customerIdList)

<<<<<<< HEAD
=======

>>>>>>> 435d1d9d85ff8e39fb4176b15182c3ed5a814454
    return(
        <table className="search-result-table">
        <colgroup>
                <col style={{ width: '1%' }}/>
                <col style={{ width: '11%' }}/>
                <col style={{ width: '9%' }}/>
                <col style={{ width: '30%' }}/>
                <col style={{ width: '11%' }}/>
                <col style={{ width: '11%' }}/>
                <col style={{ width: '9%' }}/>
                <col style={{ width: '11%' }}/>
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
            {pageByCustomers.map((customer:ResponseCustomer, index) => (
                <tr key={index} ref={(el)=> {itemsRef.current[customer.customerId] = el}} className={target === customer.customerId ?'is-click' :''}>
                    <td><input type="checkbox" 
                               checked={checkedState[customer.customerId]|| false} 
                               onChange={update_checked.bind(null,customer.customerId)}/>
                    </td>
                    <td>{customer.affiliation.affiliationName}</td>
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
            {pageByCustomers.length===0 && 
                <tr className='none-hover'>
                    <td colSpan={9}>
                        <p>조회된 결과가 없습니다.</p>
                    </td>
                </tr>
            }
        </tbody>
    </table>
    )
})

export default CustomerSearchResult;