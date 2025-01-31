import { ResponseCustomer } from '@/types/customer/type';
import './search-result.scss';


export default function CustomerSearchResult({customers}:{customers:ResponseCustomer[]}){
    console.log(customers)
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
                            <td>{customer.customerName}</td>
                            <td>
                                <button>수정</button>
                                <button>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
      
    )
}