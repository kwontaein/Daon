'use client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import '@/styles/table-style/search.scss';

import { apiUrl } from '@/model/constants/apiUrl';
import { CustomerCate } from '@/model/types/customer/cate/type';

import { useDispatch } from 'react-redux';
import { RequestCustomerData, CustomerSearchInputTarget, RequestAllCustomerData, updateCustomerSearchQuery, ResetCustomerSearchQuery, updateCustomerSearchInputTarget, updateCustomerSearchInput } from '@/store/slice/customer-search';
import { useWindowSize } from '@/hooks/share/useWindowSize';

export default function CustomerSearch({customerCate}:{customerCate: CustomerCate[]}){
    const {searchInputTarget, searchInput, postSearchInfo} = useSelector((state:RootState)=> state.customerSearch);
    const dispatch = useDispatch()
    const size = useWindowSize()

    //TODO: 모바일버전 구현
    const registerCustomer =()=>{
        //pc
        if(size.width>620){
            const url = `${apiUrl}/register-customer`; // 열고 싶은 링크
            const popupOptions = "width=600,height=500,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }

    useEffect(()=>{
        return ()=>{
            dispatch(ResetCustomerSearchQuery())
        }
    },[])
    
    return(
        <div className='search-container'>
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
                                <select className="title-selector" size={1} 
                                        value={postSearchInfo.category}
                                        onChange={(e)=>dispatch(updateCustomerSearchQuery({category: e.target.value}))}>
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
                        <td className="table-input">
                            <label>
                                <select className="classification" size={1}
                                        value={postSearchInfo.cateId}
                                        onChange={(e)=>dispatch(updateCustomerSearchQuery({cateId: e.target.value}))}>
                                        <option value='none'>선택안함</option>
                                        {customerCate.map((cate)=>(
                                            <option key={cate.customerCateId} value={cate.customerCateId}>
                                                    {cate.customerCateName}
                                            </option>
                                        ))}
                                </select>
                            </label>
                        </td>
                        <td rowSpan={3}>
                           <div className="grid-table-buttons">
                                <button onClick={()=>{
                                    dispatch(RequestCustomerData(true))
                                    setTimeout(()=>{dispatch(RequestCustomerData(false))},1000)
                                }}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button onClick={()=>{
                                    dispatch(RequestAllCustomerData(true))
                                    dispatch(ResetCustomerSearchQuery())
                                    setTimeout(()=>{dispatch(RequestAllCustomerData(false))},1000)
                                }}>전 체 보 기</button>
                                <button onClick={registerCustomer}>신 규 등 록</button>
                                <button>엑 셀 변 환</button>
                           </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>검색대상</td>
                        <td className='table-radio-container'>
                            <div>
                                <label>
                                    <input type='radio' name='target' value='all' 
                                        checked={postSearchInfo.searchTarget ==='all'} 
                                        onChange={(e)=>dispatch(updateCustomerSearchQuery({searchTarget: e.target.value}))}/>
                                        전체
                                </label>
                                <label>
                                    <input type='radio' name='target' value='payment' 
                                        checked={postSearchInfo.searchTarget ==='payment'}
                                        onChange={(e)=>dispatch(updateCustomerSearchQuery({searchTarget: e.target.value}))}/>
                                        미수/미지급 거래처만
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>
                            <select className='classification-label' name="searchOptions" size={1}
                                    value={searchInputTarget} 
                                    onChange={(e)=> dispatch(updateCustomerSearchInputTarget(e.target.value as CustomerSearchInputTarget))}>
                                <option value="customerName">상호명/담당기사</option>
                                <option value="ceo">대표자</option>
                            </select>
                        </td>
                        <td className='table-input '>
                            <input type='text' value={searchInput} onChange={(e)=>dispatch(updateCustomerSearchInput(e.target.value))}/>
                        </td>
                    </tr>       
                </tbody>
            </table>
        </div>
    )
}