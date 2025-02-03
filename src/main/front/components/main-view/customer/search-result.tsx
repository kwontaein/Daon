"use client";

import { ResponseCustomer } from '@/types/customer/type';
import './search-result.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';

const CustomerCategoryMap = {
    SALE:'판매처', 
    BUY: '구매처',
    CONSUMER: '소비자',
    WORK: '하청업체',
    ETC: '기타'
}
function CustomerSearchResult({customers}:{customers:ResponseCustomer[]}){
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
                        <td><input type="checkbox" /></td>
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
                        <tr key={index}>
                            <td><input type="checkbox" /></td>
                            <td>{customer.customerCateId.customerCateName}</td>
                            <td>{CustomerCategoryMap[customer.category]}</td>
                            <td className='left-align'>{customer.customerName}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.fax}</td>
                            <td>{customer.etc}</td>
                            <td></td>
                            <td>
                                <FontAwesomeIcon icon={faEllipsis} />
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