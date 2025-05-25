'use client'
import './search-result.scss'

import React, { useCallback, useMemo } from 'react'

import { ResponseTask, TaskEnumType } from '@/model/types/sales/task/type'
import  useCheckBoxState from '@/hooks/share/useCheckboxState'

import dayjs from 'dayjs'
import { ResponseEmployee } from '@/model/types/staff/employee/type'
import { useScreenMode } from '@/hooks/share/useScreenMode'
import { updateTaskUserApi } from '@/features/sales/task/api/taskApi'
import { useConfirm } from '@/hooks/share/useConfirm'
import useRouterPath from '@/hooks/share/useRouterPath'

const TaskSearchResult = React.memo(({pageByTasks, employees} : {
    pageByTasks: ResponseTask[],
    employees: ResponseEmployee[],
}) => {
    const mode = useScreenMode({tabletSize:900,mobileSize:620});   
    const nowDate = useMemo(()=>new Date(Date.now()),[])
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

    //전표등록창을 띄우기 위한 함수
    const estimateHandler = (taskId:string,estimateId:string)=>{
        const params = new URLSearchParams
        const path = estimateId ? 'estimate': 'register-estimate'
        params.set("mode", estimateId ? "detail" :"write")
        if(estimateId){
            params.set("target",estimateId)
        }else{
            params.set('taskId',taskId)
        }

        if(window.innerWidth>620){
            const url = `/${path}?${params.toString()}`;
            const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes"; 
            
            window.open(url, "PopupWindow", popupOptions);
        }else{
            redirect(`${path}?${params.toString()}`)
        }
    }
    //업무 상세보기
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

    //업무처리 상태 Handler
    const taskActionTakenHandler = (taskId:string)=>{
        const params = new URLSearchParams
        params.set('taskId',taskId)
        
        if(window.innerWidth>620){
            const url = `/register-action-taken?${params.toString()}`;
            const popupOptions = "width=600,height=400,scrollbars=yes,resizable=yes"; 
            
            window.open(url, "actionTaken", popupOptions);
        }else{
            redirect(`register-action-taken?${params.toString()}`)
        }
    }

    const updateAssingedUserHandler =(taskId,assignedUser)=>{
        if(assignedUser==='none'){
            assignedUser=null
        }
        const onUpdate = ()=>{
            updateTaskUserApi(taskId,assignedUser).then((status)=>{
                if(status===200){
                    window.alert('변경이 완료되었습니다.')
                }else{
                    window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
                }
            })
        }
        useConfirm('담당기사를 갱신하겠습니까?',onUpdate)
    }


    const dateColor = useCallback((date)=>{
        const date1 = dayjs(date);
        const date2 = dayjs(nowDate);
        const diffDay = date2.diff(date1, 'day')
        if(diffDay<1){
            return 'black'
        }else if(diffDay<2){
            return 'green'
        }else if(diffDay<3){
            return 'blue'
        }else{
            return 'red'
        }
    },[])

    return(
        mode &&
        <table className='task-search-result-table'>
            <colgroup>
                <col style={{ width: '1%' }}/>
                <col style={{ width: `${mode==='pc' ? '5%' :'5%'}`, minWidth:'55px'}}/>
                <col style={{ width: `${mode==='pc' ? '5%' :'5%'}`, minWidth:'55px'}}/>
                <col style={{ width: `${mode==='pc' ? '5%' :'30%'}`, minWidth :`${mode==='pc' ? '55px' :'none'}`}}/>
                <col style={{ width: `${mode==='pc' ? '20%' :'10%'}`}}/>
                <col style={{ width: '5%', minWidth :`${mode==='pc' ? '55px' :'95px'}`}}/>
                <col style={{ width: '5%', minWidth :`${mode==='pc' ? '55px' :'34px'}`}}/>
                {mode==='pc' &&<col style={{width:'10%', minWidth: '95px'}}/>}
                {mode==='pc' &&<col style={{width:'10%', minWidth: '55px'}}/>}
                {mode==='pc' &&<col style={{width:'5%', minWidth: '55px'}}/>}
                {mode==='pc' &&<col style={{width:'5%', minWidth: '55px'}}/>}
                {mode==='pc' &&<col style={{width:'5%', minWidth: '55px'}}/>}
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
                    <td>내용</td>
                    <td>비고</td>
                </>
                }
                <td rowSpan={mode==='pc'? 1:2}>견적서</td>
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
                            <tbody key={task.taskId} className={task.estimateId ? '' : 'no-estimate'}>
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
                                    <td style={{color:dateColor(task.createdAt)}}>
                                        {dayjs(task.createdAt).format('MM.DD HH:mm')}
                                    </td>
                                    {mode==='pc' &&
                                    <td>
                                         {task.completeAt ?
                                            <>{dayjs(task.completeAt).format('MM.DD HH:mm')}</>
                                            :
                                            <button type='button' onClick={()=>taskActionTakenHandler(task.taskId)}>처리중</button>}
                                    </td>}
                                    <td>
                                        <a onClick={()=>viewCustomerHandler(task.customer.customerId)}>
                                            {task.customer.customerName}
                                        </a>
                                    </td>
                                    <td>{task.requesterName}</td>
                                    <td>
                                        <select value={task.assignedUser.userId??'none'} onChange={(e)=>updateAssingedUserHandler(task.taskId, e.target.value)}>
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
                                            <td onClick={()=>taskDetailHandler(task.taskId)}><a>{task.details ||'-'}</a></td>
                                            <td>{task.remarks}</td>
                                    </>
                                    }
                                    <td rowSpan={mode==='pc'? 1:2}>
                                        <button type='button' onClick={estimateHandler.bind(null, task.taskId, task.estimateId)}>
                                            {task.estimateId ? '인쇄':'작성'}
                                        </button>
                                    </td>
                                </tr>   
                                {mode!=='pc' &&
                                    <tr>
                                        <td>
                                        {task.completeAt ?
                                            <>{dayjs(task.completeAt).format('MM.DD HH:mm')}</>
                                            :
                                            <button type='button' onClick={()=>taskActionTakenHandler(task.taskId)}>처리중</button>}
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

export default TaskSearchResult;