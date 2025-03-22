'use client'
import '@/styles/table-style/search.scss'

import {apiUrl} from '@/model/constants/apiUrl';
import {useActionState, useEffect, useMemo, useRef, useState} from 'react';
import {initialTaskState, taskSearchAction} from '@/features/task/task/action/taskSearchAction';
import {ResponseTask} from '@/model/types/task/task/type';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import TaskSearchResult from './search-result';
import { ResponseEmployee } from '@/model/types/staff/employee/type';
import { revalidateTask } from '@/features/task/task/action/taskRegisterAction';
import Pagination from '@/components/share/pagination';
import useCheckBoxState from '@/hooks/share/useCheckboxState';
import { deleteTask } from '@/features/task/task/api/taskApi';
import { useConfirm } from '@/hooks/share/useConfirm';
import { Affiliation } from '@/model/types/customer/affiliation/type';


export default function TaskSearch({affiliations, initialTask, employees, page}: {
    affiliations: Affiliation[],
    initialTask: ResponseTask[],
    page: number,
    employees: ResponseEmployee[]
}) {
    const [state, action, isPending] = useActionState(taskSearchAction, {...initialTaskState, task: initialTask});
    const pageByTasks = useMemo(() => state.task.slice((page - 1) * 20, ((page - 1) * 20) + 20), [state.task, page])
    const taskIds = pageByTasks.map(({taskId})=> taskId)
    const useCheckState = useCheckBoxState(taskIds)
    const inputRef = useRef(null) //검색 input
    
    const [loading, setLoading] = useState(true)

    console.log(initialTask)

    useEffect(() => {
        setLoading(isPending)
    }, [isPending])


    //router control
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();


    const revalidateHandler = (event: MessageEvent) => {
        if (event.data) {
            const {status} = event.data 
            if(status===200){
                revalidateTask()
            }
        }
    };


    const registerTask = () => {
        //pc
        if (window.innerWidth > 620) {
            const url = `${apiUrl}/register-task`; // 열고 싶은 링크
            const popupOptions = "width=700,height=500,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.removeEventListener("message", revalidateHandler);
            window.addEventListener("message", revalidateHandler);  
            window.open(url, "PopupWindow", popupOptions);
        }
    }


    //검색 시 페이지 제거
    const redirectPage = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        router.push(`${pathname}?${params.toString()}`);
    }

    const deleteTaskHandler =()=>{
        const onDelete =async()=>{
            const checkedTaskIds = Object.keys(useCheckState.checkedState)
            await deleteTask(checkedTaskIds).then((status)=>{
                if(status===200) window.alert('삭제가 완료되었습니다.')
            })
        }
        useConfirm('체크한 항목을 삭제하시겠습니까?', onDelete, ()=>{})
    }

    return (
        <>
            <section className='search-container'>
                <form action={action}>
                    <table className='search-table'>
                        <colgroup>
                            <col style={{width: '5%'}}/>
                            <col style={{width: '70%'}}/>
                            <col style={{width: '1%'}}/>
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
                                <select name='taskType' key={state.searchKey} defaultValue={state.taskType}>
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
                                <select name='assignedUser' key={state.searchKey + 2} defaultValue={state.assignedUser}>
                                    <option value='none'>담당자구분</option>
                                    {employees.map((employee)=>(
                                        <option key={employee.userId} value={employee.userId}>{employee.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td rowSpan={3}>
                                <div className='grid-table-buttons'>
                                    <button type='submit' disabled={isPending}
                                            onClick={redirectPage}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색
                                    </button>
                                    <button>엑 셀 변 환</button>
                                    <button type='button' onClick={registerTask}>업 무 등 록</button>
                                    <button type='button' onClick={deleteTaskHandler}>체 크 삭 제</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='table-label'>거래처분류</td>
                            <td>
                                <label>
                                    <select name='affiliation' key={state.affiliation}
                                            defaultValue={state.affiliation}>
                                        <option value='none'>선택안함</option>
                                        {affiliations.map((affiliation) => (
                                            <option key={affiliation.affiliationId}
                                                    value={affiliation.affiliationId}>
                                                {affiliation.affiliationName}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className='table-label'>거래처명</td>
                            <td><input type='text' name='customer' ref={inputRef}/></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </section>
            <TaskSearchResult
                pageByTasks={pageByTasks}
                employees={employees}
                taskCheckedHook={useCheckState}/>            
            {(!loading && initialTask.length>20) &&
                <Pagination
                    totalItems={initialTask.length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}
                />
            }
        </>
    )
}