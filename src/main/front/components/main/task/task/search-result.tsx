'use client'
import '@/styles/table-style/search-result.scss'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ResponseTask } from '@/model/types/task/task/type'
import useCheckBoxState from '@/hooks/share/useCheckboxState'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { fetchSearchTask } from '@/features/task/task/api/searchTaskApi'

export default function TaskSearchResult({initialTask, page}:{initialTask:ResponseTask[], page:number}){
    const [task, setTask] = useState<ResponseTask[]>(initialTask)
    
    const pageByTask = useMemo(()=>{
        setLoading(false)
        return task.slice((page-1)*20, ((page-1)*20)+20)
    },[task])  

    const stockIds = pageByTask.map(({taskId})=> taskId)
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(stockIds)
    const {postSearchInfo, isSearch} = useSelector((state:RootState)=> state.taskSearch);

    const [loading, setLoading] = useState<boolean>(true)
        

    //router variables
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    

    //when you start search, retry settings task data
   useCallback(async()=>{
        if(isSearch){
            const {taskType, customer, customerCate, assignedUser} = postSearchInfo
            if(!taskType && !customerCate && !assignedUser && !customer){
                setTask(initialTask)
            }else {
                const task = await fetchSearchTask(postSearchInfo)
                setTask(task)
            }

            const params = new URLSearchParams(searchParams.toString()); 
            params.delete("page"); 
            // 기존 pathname 유지
            router.push(`${pathname}?${params.toString()}`); 
        }
    },[isSearch])


    return(
        <table className='search-result-table'>
            <thead>
              <tr>
                <td><input type='checkbox' 
                            onChange={toggleAllChecked} 
                            checked={isAllChecked}/></td>
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
              </tr>
            </thead>
            <tbody>
                    {pageByTask.map(stock=>(
                        <tr key={stock.taskId}>
                            <td><input type='checkbox' 
                                       checked={checkedState[stock.taskId]} 
                                       onChange={()=>update_checked(stock.taskId)}/></td>
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
                            <td colSpan={12}>
                                <p>조회된 결과가 없습니다.</p>
                            </td>
                        </tr>
                    }
            </tbody>
        </table>
    )
}