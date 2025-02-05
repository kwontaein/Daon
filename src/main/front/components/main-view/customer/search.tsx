'use client'
import { useState } from 'react';
import './search.scss';
import { useComponentSize } from '@/hooks/share/useComponentsSize';
import { CustomerCateType } from '@/types/customer/cate/type';

export default function CustomerSearch({customerCate}:{customerCate: CustomerCateType[]}){
    const [division,setDivision] = useState('disabled')
    const [correspondent,setCorrespondent] = useState('disabled')

    return(
        <div className='customer-search-container'>
            <table className="search-table">
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
                                <select className="title-selector" size={1} value={division} onChange={(e)=>setDivision(e.target.value)}>
                                    <option value='disabled'>거래처 구분선택</option>
                                    <option value="sale">판매처</option>
                                    <option value="purchase">구매처</option>
                                    <option value="consumer">소비자</option>
                                    <option value="subcontractor">하청업체</option>
                                    <option value="etc">기타</option>
                                </select>
                            </label>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='table-label'>소속</td>
                        <td className="table-input">
                            <label>
                                <select name="classification" size={1} value={correspondent} onChange={(e)=>setCorrespondent(e.target.value)}>
                                    <option value='disabled'>소속선택</option>
                                    {customerCate.map((cate)=>(
                                        <option key={cate.customerCateId} value={cate.customerCateKey}>{cate.customerCateName}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td rowSpan={3}>
                           <div className="table-buttons">
                                <button>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button>전 체 보 기</button>
                                <button>신 규 등 록</button>
                                <button>엑 셀 변 환</button>
                           </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>검색대상</td>
                        <td className='table-radio-container'>
                            <label>
                                <input type='radio' name='target'/>전체
                            </label>
                            <label>
                                <input type='radio' name='target'/>미수/미지급 거래처만
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>
                            <select className='classification' name="searchOptions" size={1}>
                                <option value="business">상호명/담당기사</option>
                                <option value="exponent">대표자</option>
                            </select>
                        </td>
                        <td className='table-input '>
                            <input type='text'/>
                        </td>
                    </tr>       
                </tbody>
            </table>
        </div>
    )
}