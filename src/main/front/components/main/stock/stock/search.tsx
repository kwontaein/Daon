'use client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import '@/styles/table-style/search.scss';
import { apiUrl } from '@/model/constants/apiUrl';

import { useDispatch } from 'react-redux';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { StockCate } from '@/model/types/stock/cate/type';
import { RequestAllStockData, RequestStockData, ResetStockSearchQuery, updateStockSearchQuery } from '@/store/slice/stock-search';

export default function StockSearch({stockCate}:{stockCate: StockCate[]}){
    const {postSearchInfo} = useSelector((state:RootState)=> state.stockSearch);
    const dispatch = useDispatch()
    const size = useWindowSize()

    //TODO: 모바일버전 구현
    const registerStock =()=>{
        //pc
        if(size.width>620){
            const url = `${apiUrl}/register-stock`; // 열고 싶은 링크
            const popupOptions = "width=600,height=500,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }

    useEffect(()=>{
        return ()=>{
            dispatch(ResetStockSearchQuery())
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
                            <select className="title-selector" name="searchOptions" size={1}
                                    value={postSearchInfo.isConditionSearch ? 'condition' :'none' } 
                                    onChange={(e)=> dispatch(updateStockSearchQuery({isConditionSearch:!postSearchInfo.isConditionSearch}))}>
                                <option value="none">일반검색</option>
                                <option value="condition">조건부검색</option>
                            </select>
                           
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                          <td className='table-label'>분류</td>
                          <td>
                            <label>
                                <select className='classification' size={1} 
                                        value={postSearchInfo.category}
                                        onChange={(e)=>dispatch(updateStockSearchQuery({category: e.target.value}))}>
                                        <option value='none'>선택안함</option>
                                        {stockCate.map((cate:StockCate)=>(
                                            <option key={cate.stockCateId} value={cate.stockCateId}>
                                                    {cate.stockCateName}
                                            </option>
                                        ))}
                                </select>
                            </label>
                          </td>
                          <td rowSpan={4}>
                           <div className="grid-table-buttons">
                                <button onClick={()=>{
                                    dispatch(RequestStockData(true))
                                    setTimeout(()=>{dispatch(RequestStockData(false))},1000)
                                }}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button onClick={()=>{
                                    dispatch(RequestAllStockData(true))
                                    dispatch(ResetStockSearchQuery())
                                    setTimeout(()=>{
                                        dispatch(RequestAllStockData(false))
                                    },1000)
                                }}>전 체 보 기</button>
                                <button onClick={registerStock}>신 규 등 록</button>
                                <button>엑 셀 변 환</button>
                           </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>재고사용여부</td>
                        <td className='table-radio-container'>
                            <div>
                                <label className={postSearchInfo.isConditionSearch ? '' : 'lock'}>
                                    <input type='radio' name='stockUseEa'
                                        checked={postSearchInfo.isConditionSearch && postSearchInfo.isStockUseEa} 
                                        onChange={()=>dispatch(updateStockSearchQuery({isStockUseEa:true}))}/>
                                        사용
                                </label>
                                <label className={postSearchInfo.isConditionSearch ? '' : 'lock'}>
                                    <input type='radio' name='stockUseEa'
                                        checked={postSearchInfo.isConditionSearch && !postSearchInfo.isStockUseEa}
                                        onChange={()=>dispatch(updateStockSearchQuery({isStockUseEa: false}))}/>
                                        사용안함
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>재고(유/무)</td>
                        <td className='table-radio-container'>
                            <div>
                                <label className={postSearchInfo.isConditionSearch ? '' : 'lock'}>
                                    <input type='radio' name='remain' 
                                        checked={postSearchInfo.isConditionSearch && postSearchInfo.isRemain} 
                                        onChange={(e)=>dispatch(updateStockSearchQuery({isRemain: true}))}/>
                                        있음
                                </label>
                                <label className={postSearchInfo.isConditionSearch ? '' : 'lock'}>
                                    <input type='radio' name='remain'
                                        checked={postSearchInfo.isConditionSearch && !postSearchInfo.isRemain}
                                        onChange={(e)=>dispatch(updateStockSearchQuery({isRemain: false}))}/>
                                        없음
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>
                            품명
                        </td>
                        <td className='table-input '>
                            <input type='text' 
                                   value={postSearchInfo.searchInput} 
                                   onChange={(e)=>dispatch(updateStockSearchQuery({searchInput:e.target.value}))}/>
                        </td>
                    </tr>       
                </tbody>
            </table>
        </div>
    )
}