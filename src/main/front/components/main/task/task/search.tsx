'use client'
import '@/styles/table-style/search.scss'

import { CustomerCate } from '@/model/types/customer/cate/type'
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RequestTaskData, ResetTaskSearchQuery, updateTaskSearchQuery } from '@/store/slice/task-search';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/model/constants/apiUrl';
import { useEffect } from 'react';

export default function TaskSearch({customerCate}:{customerCate:CustomerCate[]}){
    const {postSearchInfo} = useSelector((state:RootState)=> state.taskSearch);
    const dispatch = useDispatch()
    const size = useWindowSize()

    const registerTask =()=>{
        //pc
        if(size.width>620){
            const url = `${apiUrl}/register-customer`; // 열고 싶은 링크
            const popupOptions = "width=600,height=500,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }
    useEffect(()=>{
        return ()=>{
            dispatch(ResetTaskSearchQuery())
        }
    },[])

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
                        검색옵션
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='table-label'>구분/담당자</td>
                        <td className='td-gap'>
                            <select value={postSearchInfo.taskType ?? 'none'}
                                    onChange={(e)=>dispatch(updateTaskSearchQuery({taskType:e.target.value}))}>
                                <option value='none'>구분</option>
                                <option value='AS'>A/S</option>
                                <option value='INCOMING'>입고</option>
                                <option value='DELIVERY'>납품</option>
                                <option value='INVENTORY'>재고</option>
                                <option value='OTHER'>기타</option>
                                <option value='RENTAL'>임대</option>
                                <option value='MAINTENANCE'>유지보수</option>
                                <option value='ATTENDANCE'>근태</option>
                            </select>         
                            <select value={postSearchInfo.assignedUser ?? 'none'}
                                    onChange={(e)=>dispatch(updateTaskSearchQuery({assignedUser:e.target.value}))}>
                                <option value='none'>담당자구분</option>
                                <option value='햄부기'>햄부기</option>
                            </select>
                        </td>
                        <td rowSpan={3}>
                            <div  className='grid-table-buttons'>
                                <button onClick={()=>{
                                    dispatch(RequestTaskData(true))
                                    setTimeout(()=>{dispatch(RequestTaskData(false))},1000)
                                }}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button>엑 셀 변 환</button>
                                <button onClick={registerTask}>업 무 등 록</button>
                                <button>체 크 삭 제</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처분류</td>
                        <td>
                            <label>
                                <select size={1} 
                                        value={postSearchInfo.customerCate ?? 'none'}
                                        onChange={(e)=>dispatch(updateTaskSearchQuery({customerCate:e.target.value}))}>
                                        <option value='none'>선택안함</option>
                                        {customerCate.map((cate)=>(
                                            <option key={cate.customerCateId} value={cate.customerCateId}>
                                                    {cate.customerCateName}
                                            </option>
                                        ))}
                                </select>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처명</td>
                        <td><input type='text' 
                                   value={postSearchInfo.customer}
                                   onChange={(e)=>dispatch(updateTaskSearchQuery({customer:e.target.value}))}/></td>
                    </tr>
                </tbody>
            </table> 
        </section>

    )
}