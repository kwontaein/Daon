"use client";

import { ResponseCustomer } from '@/types/customer/type';
import './search-result.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { memo, useEffect, useState } from 'react';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import CustomerOptions from './options';
import useCheckBoxState from '@/hooks/share/useCheckboxState';

const CustomerCategoryMap = {
    SALE:'판매처', 
    BUY: '구매처',
    CONSUMER: '소비자',
    WORK: '하청업체',
    ETC: '기타'
}
function CustomerSearchResult({customers}:{customers:ResponseCustomer[]}){
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const customerIdList = customers.map((({customerId})=> customerId))
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(customerIdList)
 
    return(
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
                    {customers.map((customer:ResponseCustomer, index) => (
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
                                <FontAwesomeIcon icon={faEllipsis} style={target === customer.customerId &&{color:'orange'}}/>
                                {target === customer.customerId && <CustomerOptions customerId={customer.customerId}/>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
      
    )
}

export default memo(CustomerSearchResult, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.customers) === JSON.stringify(nextProps.customers);
});