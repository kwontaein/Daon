'use client'
import '@/styles/table-style/search-result.scss'

import React, { useEffect, useRef, useState } from 'react'

import { ResponseTask } from '@/model/types/task/task/type'
import useCheckBoxState from '@/hooks/share/useCheckboxState'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskSearchCondition } from '@/store/slice/task-search'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function TaskSearchResult({initialTask, page}:{initialTask:ResponseTask[], page:number}){
    const [task, setTask] = useState<ResponseTask[]>(initialTask)
    const stockIds = task.map(({taskId})=> taskId)
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(stockIds)
    
    const [pageByTask, setPageByTask] = useState<ResponseTask[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    
    //search input variables 
    
    //router variables
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()


    const {postSearchInfo, isSearch, allView} = useSelector((state:RootState)=> state.taskSearch);

    const fetchSearchCustomers = async (searchCondition:TaskSearchCondition)=>{
        try {
            const response = await fetch("http://localhost:8080/api/getTaskByOption", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchCondition),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const text = await response.text();
            setTask(text ? JSON.parse(text) : []);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //if start search then retry settings customer data
    useEffect(()=>{
        if(allView ||isSearch){
            if(isSearch) {
                const customer = postSearchInfo.customer ==='none' ? null : postSearchInfo.customer
                const taskType =  postSearchInfo.taskType ==='none' ? null : postSearchInfo.taskType
                const customerCate = postSearchInfo.customerCate ==='none' ? null : postSearchInfo.customerCate 
                const searchCondition ={...postSearchInfo, customer, taskType, customerCate}
                fetchSearchCustomers(searchCondition)
            }
            if(allView){
                setTask(initialTask)
            }
        
            const params = new URLSearchParams(searchParams.toString()); 
            params.delete("page"); 
            // 기존 pathname 유지
            router.push(`${pathname}?${params.toString()}`); 
        }
    },[isSearch,allView])

    useEffect(()=>{
        setPageByTask(task.slice((page-1)*20, ((page-1)*20)+20))
        setLoading(false)
    },[task, page])

    return(
        <table className='search-result-table'>
            <thead>
                <td><input type='checkbox' onClick={toggleAllChecked} checked={isAllChecked}/></td>
                <td>구분</td>
                <td>접수</td>
                <td>조치</td>
                <td>거래처</td>
                <td>의뢰자</td>
                <td>담당</td>
                <td>연락처</td>
                <td>모델</td>
                <td>내용</td>
                <td>비고</td>
                <td>견적서</td>
            </thead>
            <tbody>
                    {pageByTask.map(stock=>(
                        <tr key={stock.taskId}>
                            <td><input type='checkbox' checked={checkedState[stock.taskId]} onChange={()=>update_checked(stock.taskId)}/></td>
                            <td>{stock.taskType}</td>
                            <td>{stock.createdAt}</td>
                            <td>{stock.isCompleted}</td>
                            <td>{stock.customer}</td>
                            <td>{stock.requesterName}</td>
                            <td>{stock.assignedUser}</td>
                            <td>{stock.requesterContact}</td>
                            <td>{stock.model}</td>
                            <td>{stock.details}</td>
                            <td>{stock.remarks}</td>
                            <td>{stock.isCompleted}</td>
                        </tr>
                    ))}
                    {!loading && pageByTask.length===0 && 
                        <tr  className={'none-hover'}>
                            <td colSpan={9}>
                                <p>조회된 결과가 없습니다.</p>
                            </td>
                        </tr>
                    }
            </tbody>
        </table>
    )
}