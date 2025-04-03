"use client";
import './form/company-form.scss'
import { ResponseCompany } from "@/model/types/staff/company/type";
import useChangeMode from '@/hooks/share/useChangeMode';

export default function CompanyDetail({company}:{company:ResponseCompany}){
    const changeModeHandler = useChangeMode()

    return(
        <section className="company-form-container">
            <table className="company-form-table">
                <colgroup>
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '35%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '35%' }} />
                </colgroup>
                <tbody>
                    <tr>
                        <td className="table-label">상호명</td>
                        <td>{company.companyName}</td>
                        <td className="table-label">인쇄명</td>
                        <td>{company.printName}</td>
                    </tr>
                    <tr>
                        <td className="table-label">대표자</td>
                        <td>{company.ceo}</td>
                        <td className="table-label">주민등록번호</td>
                        <td>{company.ceoCert}</td>
                    </tr>
                    <tr>
                        <td className="table-label">사업자등록번호</td>
                        <td>{company.businessNum}</td>
                        <td className="table-label">전화</td>
                        <td>{company.tel}</td>
                    </tr>
                    <tr>
                        <td className="table-label">전화2</td>
                        <td>{company.tel2}</td>
                        <td className="table-label">FAX</td>
                        <td>{company.fax}</td>
                    </tr>
                    <tr>
                        <td className="table-label">업태</td>
                        <td>{company.businessStatus}</td>
                        <td className="table-label">종목</td>
                        <td>{company.businessKind}</td>
                    </tr>
                    <tr>
                        <td rowSpan={3} className="table-label">주소</td>
                        <td colSpan={3}>
                            <input className="zip-code-input" value={company.zipcode ? company.zipcode.split('-')[0] : ''} disabled/> -
                            <input className="zip-code-input" value={company.zipcode ? company.zipcode.split('-')[1] : ''} disabled style={{marginLeft:'4px'}}/>
                            [우편번호]
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            {company.address}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            {company.addressDetail}
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">메모</td>
                        <td colSpan={3}  className={company.memo ? '' :'memo'}>{company.memo}</td>
                    </tr>
                    <tr>
                        <td className="table-label">견적서파일명</td>
                        <td colSpan={3}>{company.estimate}</td>
                    </tr>
                    <tr>
                        <td className="table-label">도장파일명</td>
                        <td colSpan={3}>{company.stamp}</td>
                    </tr>
                </tbody>
            </table>
            <div className="button-container">
                <button onClick={()=>window.print()}>인쇄</button>
                <button onClick={()=>changeModeHandler('edit')}>수정</button>
                <button>삭제</button>
                <button onClick={()=>window.close()}>창닫기</button>
            </div>
        </section>
    )
}