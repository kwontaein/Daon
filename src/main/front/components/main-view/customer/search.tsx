'use client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import './search.scss';

import { apiUrl } from '@/constants/apiUrl';
import { CustomerCateType } from '@/types/customer/cate/type';

import { useDispatch } from 'react-redux';
import { RequestCustomerData, ResetSearchQuery, CustomerSearchInputTarget, updateSearchInput, updateSearchInputTarget, updateSearchQuery, RequestAllCustomerData } from '@/hooks/redux/slice/customer-search';
import { useWindowSize } from '@/hooks/share/useWindowSize';

export default function CustomerSearch({customerCate}:{customerCate: CustomerCateType[]}){
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
            dispatch(ResetSearchQuery())
        }
    },[])
    
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
                                <select className="title-selector" size={1} 
                                        value={postSearchInfo.category}
                                        onChange={(e)=>dispatch(updateSearchQuery({category: e.target.value}))}>
                                    <option value='none'>선택안함</option>
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
                                <select name="classification" size={1}
                                        value={postSearchInfo.cateId}
                                        onChange={(e)=>dispatch(updateSearchQuery({cateId: e.target.value}))}>
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
                           <div className="table-buttons">
                                <button onClick={()=>{
                                    dispatch(RequestCustomerData(true))
                                    setTimeout(()=>{dispatch(RequestCustomerData(false))},1000)
                                }}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button onClick={()=>{
                                    dispatch(RequestAllCustomerData(true))
                                    dispatch(ResetSearchQuery())
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
                            <label>
                                <input type='radio' name='target' value='all' 
                                       checked={postSearchInfo.searchTarget ==='all'} 
                                       onChange={(e)=>dispatch(updateSearchQuery({searchTarget: e.target.value}))}/>
                                       전체
                            </label>
                            <label>
                                <input type='radio' name='target' value='payment' 
                                       checked={postSearchInfo.searchTarget ==='payment'}
                                       onChange={(e)=>dispatch(updateSearchQuery({searchTarget: e.target.value}))}/>
                                       미수/미지급 거래처만
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>
                            <select className='classification' name="searchOptions" size={1}
                                    value={searchInputTarget} 
                                    onChange={(e)=> dispatch(updateSearchInputTarget(e.target.value as CustomerSearchInputTarget))}>
                                <option value="customerName">상호명/담당기사</option>
                                <option value="ceo">대표자</option>
                            </select>
                        </td>
                        <td className='table-input '>
                            <input type='text' value={searchInput} onChange={(e)=>dispatch(updateSearchInput(e.target.value))}/>
                        </td>
                    </tr>       
                </tbody>
            </table>
        </div>
    )
}