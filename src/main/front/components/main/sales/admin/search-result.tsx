'use client'
import '@/styles/table-style/search-result.scss'

import React, { useCallback, useMemo } from 'react'

import { ResponseTask, TaskEnumType } from '@/model/types/sales/task/type'
import  useCheckBoxState from '@/hooks/share/useCheckboxState'

import dayjs from 'dayjs'
import { ResponseEmployee } from '@/model/types/staff/employee/type'
import { useScreenMode } from '@/hooks/share/useScreenMode'
import useRouterPath from '@/hooks/share/useRouterPath'

const AdminDataSearchSearchResult = React.memo(({pageByTasks, employees} : {
    pageByTasks: ResponseTask[],
    employees: ResponseEmployee[],
}) => {
    const mode = useScreenMode({tabletSize:900,mobileSize:620});   
    const taskIds = pageByTasks.map(({taskId})=>taskId)
    const {checkedState, isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(taskIds)

    const redirect = useRouterPath()
    const viewCustomerHandler = (customerId:string)=>{
        const params = new URLSearchParams({
            mode: "detail",
            target: customerId,
          });

        if(window.innerWidth>620){
            const url = `/customer?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
            
            window.open(url, "PopupWindow", popupOptions);
        }else{
            redirect(`customer?${params.toString()}`)
        }
    }

    
    const taskDetailHandler = (taskId:string)=>{
        const params = new URLSearchParams
        params.set('target',taskId)
        params.set('mode','detail')

        if(window.innerWidth>620){
            const url = `/task?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
            
            window.open(url, "PopupWindow", popupOptions);
        }else{
            redirect(`task?${params.toString()}`)
        }
    }


    return(
        mode &&
        <table className='search-result-table'>
            <colgroup>
                <col style={{ width: '1%' }}/>
                <col style={{ width: `${mode==='pc' ? '5%' :'5%'}`, minWidth:'55px'}}/>
                <col style={{ width: `${mode==='pc' ? '5%' :'5%'}`, minWidth:'55px'}}/>
                <col style={{ width: `${mode==='pc' ? '5%' :'30%'}`, minWidth :`${mode==='pc' ? '55px' :'none'}`}}/>
                <col style={{ width: `${mode==='pc' ? '20%' :'10%'}`}}/>
                <col style={{ width: '5%', minWidth :`${mode==='pc' ? '55px' :'95px'}`}}/>
                <col style={{ width: '5%', minWidth :`${mode==='pc' ? '55px' :'none'}`}}/>
                {mode==='pc' &&<col style={{width:'10%', minWidth: '95px'}}/>}
                {mode==='pc' &&<col style={{width:'10%', minWidth: '55px'}}/>}
                {mode==='pc' &&<col style={{width:'15%', minWidth: '55px'}}/>}
            </colgroup>
            <thead>
              <tr>
                <td rowSpan={mode==='pc'? 1:2}><input type='checkbox' 
                            onChange={toggleAllChecked} 
                            checked={isAllChecked}/></td>
                <td rowSpan={mode==='pc'? 1:2}>구분</td>
                <td>접수</td>
                {mode==='pc' &&<td>조치</td>}
                <td>거래처</td>
                <td>의뢰자</td>
                <td>
                    담당
                    <input type='hidden' name='checkedState' value={JSON.stringify(checkedState)} readOnly/>
                </td>
                {mode==='pc' &&
                <>
                    <td>연락처</td>
                    <td>모델</td>
                </>
                }
                <td rowSpan={mode==='pc'? 1:2}>내용</td>
              </tr>
              {mode!=='pc' &&
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
                                    <td rowSpan={mode==='pc'? 1:2}>
                                        <input type='checkbox' 
                                            checked={checkedState[task.taskId]||false} 
                                            onChange={()=>update_checked(task.taskId)}/></td>
                                    <td rowSpan={mode==='pc'? 1:2}>
                                        <div className='row-flex'>
                                            <p>{TaskEnumType[task.taskType]}</p>
                                            <p>[{task.assignedUser.name}]</p>
                                        </div>
                                    </td>
                                    <td>
                                        {dayjs(task.createdAt).format('MM.DD HH:mm')}
                                    </td>
                                    {mode==='pc' &&
                                    <td>
                                         {task.completeAt && dayjs(task.completeAt).format('MM.DD HH:mm')}
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
                                    {mode==='pc' &&
                                        <>
                                            <td>
                                                {task.requesterContact}
                                                {task.requesterContact2 && <br/>}
                                                {task.requesterContact2}
                                            </td>
                                            <td>{task.model}</td>
                                    </>
                                    }
                                    <td rowSpan={mode==='pc'? 1:2} onClick={()=>taskDetailHandler(task.taskId)}><a>{task.details ||'-'}</a></td>
                                </tr>   
                                {mode!=='pc' &&
                                    <tr>
                                        <td>
                                        {task.completeAt &&
                                            <>{dayjs(task.completeAt).format('MM.DD HH:mm')}</>
                                        }
                                        </td>
                                        <td onClick={()=>taskDetailHandler(task.taskId)}><a>{task.details||'-'}</a></td>
                                        <td>{task.model}</td>
                                        <td>
                                            {task.requesterContact}
                                            {task.requesterContact2 && <br/>}
                                            {task.requesterContact2}
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        )):
                        (pageByTasks.length===0 && 
                            <tbody>
                                <tr className='none-hover'>
                                    <td colSpan={12}>
                                        <p>조회된 결과가 없습니다.</p>
                                    </td>
                                </tr>
                            </tbody>
                        )}
        </table>
    )
})

export default AdminDataSearchSearchResult;