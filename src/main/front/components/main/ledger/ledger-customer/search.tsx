
import '@/styles/table-style/search.scss';
import { CustomerAffiliation } from '@/model/types/customer/affiliation/type';
import { useActionState } from 'react';

export default function LedgerCustomerSearch({affiliations}:{affiliations:CustomerAffiliation[]}){
    // const [state, action] = useActionState(()=>{},{startDate: new Date(),})
    return(
        <section className='search-container'>
            <table className='search-table'>
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '70%' }} />
                    <col style={{ width: '1%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td colSpan={3} className="table-title">
                            거래처 구분 &nbsp;: &nbsp;
                            <label>
                                <select className="title-selector" size={1}>
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
                                <select size={1}>                      
                                        <option value='none'>선택안함</option>
                                        {affiliations.map((affiliation)=>(
                                            <option key={affiliation.customerAffiliationId} value={affiliation.customerAffiliationId}>
                                                    {affiliation.customerAffiliationName}
                                            </option>
                                        ))}
                                </select>
                            </label>
                        </td>
                        <td rowSpan={3}>
                            <div className="grid-table-buttons">
                                <button>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button>엑 셀 변 환</button>
                                <button>인 쇄 하 기</button>
                                <button>견적서인쇄</button>
                           </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>출력일자</td>
                        <td className='dates-container'><input className='date-input' type='date'/> ~ <input className='date-input' type='date'/></td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처명</td>
                        <td><input type='text'/></td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}