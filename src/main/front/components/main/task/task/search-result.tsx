'use client'
import './search-result.scss'

<<<<<<< HEAD
import React from 'react'

import { ResponseTask } from '@/model/types/task/task/type'
import  { ReturnCheckBoxHook } from '@/hooks/share/useCheckboxState'
=======
import React, { useEffect } from 'react'

import { ResponseTask } from '@/model/types/task/task/type'
import useCheckBoxState from '@/hooks/share/useCheckboxState'
>>>>>>> 435d1d9d85ff8e39fb4176b15182c3ed5a814454
import dayjs from 'dayjs'
import { ResponseEmployee } from '@/model/types/staff/employee/type'
import { useWindowSize } from '@/hooks/share/useWindowSize'
import { apiUrl } from '@/model/constants/apiUrl'
import { taskTypeMap } from '@/model/constants/task/taskTypeMap'
<<<<<<< HEAD
const TaskSearchResult = React.memo(({pageByTasks, employees,taskCheckedHook} : {
    pageByTasks: ResponseTask[],
    employees: ResponseEmployee[],
    taskCheckedHook: ReturnCheckBoxHook
}) => {
    const  {checkedState, isAllChecked, update_checked, toggleAllChecked} = taskCheckedHook
    const size = useWindowSize()   

=======

 const TaskSearchResult= React.memo(({pageByTasks, employees}:{pageByTasks:ResponseTask[], employees:ResponseEmployee[]})=>{

    const taskIds = pageByTasks.map(({taskId})=> taskId)
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(taskIds)
    const size = useWindowSize()   

>>>>>>> 435d1d9d85ff8e39fb4176b15182c3ed5a814454
    //TODO: add mobile version
    const viewCustomerHandler = (customerId:string)=>{
        if(size.width>620){
            const params = new URLSearchParams({
                mode: "detail",
                target: customerId,
              });
            const url = `${apiUrl}/customer?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
            
            window.open(url, "PopupWindow", popupOptions);
        }
    }

    const estimateHandler = (taskId:string,estimateId:string)=>{
            if(size.width>620){
                const params = new URLSearchParams
                params.set('taskId',taskId)
                if(estimateId){
                    params.set("mode","detail")
                    params.set("target",estimateId)
                }
                const path = estimateId ? 'estimate': 'register-estimate'
                const url = `${apiUrl}/${path}?${params.toString()}`;
                const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes"; 
                
                window.open(url, "PopupWindow", popupOptions);
            }
    }
    return(
        size.width ? 
        <table className='task-search-result-table'>
            <colgroup>
                <col style={{ width: '1%' }}/>
                <col style={{ width: `${size.width>820 ? '10%' :'5%'}`, minWidth:'55px'}}/>
                <col style={{ width: `${size.width>820 ? '10%' :'5%'}`, minWidth:'55px'}}/>
                <col style={{ width: `${size.width>820 ? '5%' :'30%'}`, minWidth :`${size.width>820 ? '55px' :'none'}`}}/>
                <col style={{ width: `${size.width>820 ? '20%' :'10%'}`}}/>
                <col style={{ width: '5%', minWidth :`${size.width>820 ? '50px' :'none'}`}}/>
                <col style={{ width: '5%', minWidth :`${size.width>820 ? '50px' :'none'}`}}/>
            </colgroup>
            <thead>
              <tr>
                <td rowSpan={size.width>820? 1:2}><input type='checkbox' 
                            onChange={toggleAllChecked} 
                            checked={isAllChecked}/></td>
                <td rowSpan={size.width>820? 1:2}>구분</td>
                <td>접수</td>
                {size.width>820 &&<td>조치</td>}
                <td>거래처</td>
                <td>의뢰자</td>
                <td>담당</td>
                {size.width>820 &&
                <>
                    <td>연락처</td>
                    <td>모델</td>
                    <td>내용</td>
                    <td>비고</td>
                </>
                }
                <td rowSpan={size.width>820? 1:2}>견적서</td>
              </tr>
              {size.width<=820 &&
                <tr>
                    <td>조치</td>
                    <td>내용</td>
                    <td>모델</td>
                    <td>연락처</td>
                </tr>
              }
            </thead>
                    {pageByTasks.length>0 ?
                        pageByTasks.map((task)=>(
                            <tbody key={task.taskId}>
                                <tr>
                                    <td rowSpan={size.width>820? 1:2}>
                                        <input type='checkbox' 
                                            checked={checkedState[task.taskId]||false} 
                                            onChange={()=>update_checked(task.taskId)}/></td>
                                    <td rowSpan={size.width>820? 1:2}>
                                        <div className='row-flex'>
                                            <p>{taskTypeMap[task.taskType]}</p>
                                            <p>[{task.assignedUser.name}]</p>
                                        </div>
                                    </td>
                                    <td>{dayjs(task.createdAt).format('MM.DD HH:mm')}</td>
                                    {size.width>820 &&
                                    <td>
                                        <button style={{paddingInline:'4px'}}>
                                            {task.isCompleted ? '':'처리중'}
                                        </button>
                                    </td>}
                                    <td>
                                        <a onClick={()=>viewCustomerHandler(task.customer.customerId)}>
                                            {task.customer.customerName}
                                        </a>
                                    </td>
                                    <td>{task.requesterName}</td>
                                    <td>
                                        <select defaultValue={task.assignedUser.userId}>
                                            <option value='none'>미지정</option>
                                            {employees.map((employee) =>(
                                                <option key={employee.userId} value={employee.userId}>{employee.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    {size.width>820 &&
                                        <>
                                            <td>{task.requesterContact}</td>
                                            <td>{task.model}</td>
                                            <td>{task.details}</td>
                                            <td>{task.remarks}</td>
                                    </>
                                    }
                                    <td rowSpan={size.width>820? 1:2}>
<<<<<<< HEAD
                                        <button style={{paddingInline:'4px'}} onClick={estimateHandler.bind(null, task.taskId, task.estimate)}>
=======
                                        <button style={{paddingInline:'4px'}}>
>>>>>>> 435d1d9d85ff8e39fb4176b15182c3ed5a814454
                                            {task.estimate ? '인쇄':'작성'}
                                        </button>
                                    </td>
                                </tr>   
                                {size.width<=820 &&
                                    <tr>
                                        <td>
                                            <button style={{paddingInline:'2px'}}>
                                                {task.isCompleted ? '':'처리중'}
                                            </button>
                                        </td>
                                        <td>{task.details}</td>
                                        <td>{task.model}</td>
                                        <td>
                                           {task.requesterContact}
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        )):
                        (pageByTasks.length===0 && 
                            <tbody>
                                <tr className={'none-hover'}>
                                    <td colSpan={12}>
                                        <p>조회된 결과가 없습니다.</p>
                                    </td>
                                </tr>
                            </tbody>
                        )}
        </table>
        :
        <div style={{marginTop:'14px'}}>loading...</div>
    )
})

export default TaskSearchResult;