'use client'
import '@/styles/table-style/search-result.scss'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ResponseTask } from '@/model/types/task/task/type'
import useCheckBoxState from '@/hooks/share/useCheckboxState'

 const TaskSearchResult= React.memo(({pageByTasks}:{pageByTasks:ResponseTask[]})=>{

    const taskIds = pageByTasks.map(({taskId})=> taskId)
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(taskIds)

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
                    {pageByTasks.map(Tasks=>(
                        <tr key={Tasks.taskId}>
                            <td><input type='checkbox' 
                                       checked={checkedState[Tasks.taskId]} 
                                       onChange={()=>update_checked(Tasks.taskId)}/></td>
                            <td>{Tasks.taskType}</td>
                            <td>{Tasks.createdAt}</td>
                            <td>{Tasks.isCompleted}</td>
                            <td>{Tasks.customer}</td>
                            <td>{Tasks.requesterName}</td>
                            <td>{Tasks.assignedUser}</td>
                            <td>{Tasks.requesterContact}</td>
                            <td>{Tasks.model}</td>
                            <td>{Tasks.details}</td>
                            <td>{Tasks.remarks}</td>
                            <td>{Tasks.isCompleted}</td>
                        </tr>
                    ))}
                    {pageByTasks.length===0 && 
                        <tr  className={'none-hover'}>
                            <td colSpan={12}>
                                <p>조회된 결과가 없습니다.</p>
                            </td>
                        </tr>
                    }
            </tbody>
        </table>
    )
})

export default TaskSearchResult;