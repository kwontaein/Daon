import { CustomerCategoryMap } from "@/constants/customer/customer-data";
import { ResponseCustomer } from "@/types/customer/type";
import './register/customer-form.scss'

export default function CustomerDetail({customer}:{customer:ResponseCustomer}){
    return(
        <>
        <table className="customer-form-table">
            <tbody>
                <tr>
                <td className='table-label'>거래처 구분</td>
                <td>
                    {CustomerCategoryMap[customer.category]}
                </td>
                <td className='table-label'>소속</td>
                <td>
                    {customer.customerCateId.customerCateName}
                </td>
                </tr>
                <tr>
                <td className='table-label'>상호명</td>
                <td colSpan={3}>
                    {customer.customerName}
                </td>
                </tr>
                <tr>
                <td className='table-label'>계산서명</td>
                <td colSpan={3}>{customer.billName}</td>
                </tr>
                <tr>
                <td className='table-label'>대표자</td>
                <td>{customer.ceo}</td>
                <td className='table-label'>주민번호</td>
                <td>{customer.ceoNum}</td>
                </tr>
                <tr>
                <td className='table-label'>사업자등록번호</td>
                <td>{customer.companyNum}</td>
                <td className='table-label'>업태</td>
                <td>{customer.businessType}</td>
                </tr>
                <tr>
                <td className='table-label'>종목</td>
                <td>{customer.contents}</td>
                <td className='table-label'>담당자</td>
                <td>
                    {customer.etc}
                </td>
                </tr>
                <tr>
                <td className='table-label'>전화</td>
                <td>{customer.phoneNumber}</td>
                <td className='table-label'>FAX</td>
                <td>{customer.fax}</td>
                </tr>
                <tr>
                <td rowSpan={3} className='table-label'>주소</td>
                <td colSpan={3}>
                    [우편번호]
                    {customer.zipCode}
                </td>
                </tr>
                <tr>
                <td colSpan={3}>
                    {customer.address1}
                </td>
                </tr>
                <tr>
                <td colSpan={3}>
                    {customer.address2}
                </td>
                </tr>
                <tr>
                <td className='table-label'>담당</td>
                <td>{customer.customerRp}</td>
                <td className='table-label'>담당자연락처</td>
                <td>{customer.customerRpCall}</td>
                </tr>
                <tr>
                <td className='table-label'>거래은행</td>
                <td>{customer.bankName}</td>
                <td className='table-label'>계좌번호</td>
                <td>{customer.bankNum}</td>
                </tr>
                <tr>
                <td className='table-label'>예금주</td>
                <td>{customer.bankOwner}</td>
                <td className='table-label'>이월잔액</td>
                <td>0</td>
                </tr>
                <tr>
                    <td className='table-label'>취급품목</td>
                    <td colSpan={3}>{customer.handlingItem}</td>
                </tr>
                <tr>
                    <td className='table-label'>메모</td>
                    <td colSpan={3}>{customer.memo}</td>
                </tr>
            </tbody>
      </table>
      <div className="button-container">
        <button onClick={()=>window.print()}>인쇄</button>
        <button>수정</button>
        <button>삭제</button>
        <button onClick={()=>window.close()}>창닫기</button>
      </div>
    </>
    )
}