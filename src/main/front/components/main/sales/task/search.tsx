'use client'
import '@/styles/table-style/search.scss'


import {startTransition, useActionState, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {initialTaskState, taskSearchAction} from '@/features/sales/task/action/taskSearchAction';
import {ResponseTask, TaskEnumType} from '@/model/types/sales/task/type';
import TaskSearchResult from './search-result';
import {ResponseEmployee} from '@/model/types/staff/employee/type';
import Pagination from '@/components/share/pagination';
import {AffiliationType} from '@/model/types/customer/affiliation/type';
import useDeletePage from '@/hooks/share/useDeletePage';
import useRouterPath from '@/hooks/share/useRouterPath';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import {ResponseCustomer} from '@/model/types/customer/customer/type';
import {exportTasksToExcel} from "@/components/main/sales/task/exportTasksToExcel";
import { deleteTask } from '@/features/sales/task/api/client-api';
import { selectConfrim } from '@/hooks/share/selectConfrim';


export default function TaskSearch({affiliations, initialTask, employees, page}: {
    affiliations: AffiliationType[],
    initialTask: ResponseTask[],
    page: number,
    employees: ResponseEmployee[]
}) {
    const [state, action, isPending] = useActionState(taskSearchAction, initialTaskState);
    const [searchResult, setSearchResult] = useState()
    
    const pageByTasks = useMemo(
        () => (searchResult ?? initialTask).slice((page - 1) * 20, ((page - 1) * 20) + 20),
        [initialTask, searchResult, page])

    const formRef = useRef(null)

    //router control
    const deletePage = useDeletePage()
    const redirect = useRouterPath()
    const registerTask = () => {
        //pc
        if (window.innerWidth > 620) {
            const url = `/register-task`; // 열고 싶은 링크
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        } else {
            redirect('register-task')
        }
    }

    const submitHandler = () => {
        if (isPending) return
        const formData = new FormData(formRef.current);
        formData.set('action', 'submit');
        startTransition(() => {
            action(formData);
        });
    }

    const deleteTaskHandler = () => {
        const formData = new FormData(formRef.current);
        const checkedState = formData.get('checkedState').toString()
        if (checkedState === '{}') return;

        const checkedTaskIds = Object.keys(JSON.parse(checkedState))

        const onDelete = async () => {
            await deleteTask(checkedTaskIds)
        }
        selectConfrim('체크한 항목을 삭제하시겠습니까?', onDelete)
    }

    useEffect(() => {
        if (state.searchResult) {
            setSearchResult(state.searchResult)
        }
    }, [state])

    useEffect(()=>{
        if(searchResult){
            submitHandler()
        }
    },[initialTask])


    //거래처 검색관련
    const checkCustomerId = useCallback(() => !!state.customerId, [state.customerId]);
    const changeHandler = useCallback(<T extends Record<string, string>>(info: T) => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);

            Object.entries(info).forEach(([key, value]) => {
                formData.set(key, value ?? "");
            });

            startTransition(() => {
                action(formData);
            });
        }
    }, [action]);

    const changeCustomerHandler = useCallback((customerInfo: Pick<ResponseCustomer, "customerName" | "customerId">) => {
        changeHandler(customerInfo);
    }, [changeHandler]);


    const searchCustomerHandler = useSearchCustomer(checkCustomerId, changeCustomerHandler);


    return (
        <>
            <form action={action} ref={formRef}>
                <section className='search-container'>
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
                                <select name='taskType' key={state.taskType + 'taskType'} defaultValue={state.taskType}>
                                    <option value='none'>구분</option>
                                    {Object.entries(TaskEnumType).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                                <select name='assignedUser' key={state.assignedUser + 'assignedUser'}
                                        defaultValue={state.assignedUser}>
                                    <option value='none'>담당자구분</option>
                                    {employees.map((employee) => (
                                        <option key={employee.userId} value={employee.userId}>{employee.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td rowSpan={3}>
                                <div className='grid-table-buttons'>
                                    <button type='button' disabled={isPending}
                                            onClick={()=>{
                                                submitHandler()
                                                deletePage()
                                            }}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색
                                    </button>
                                    <button onClick={() => exportTasksToExcel(searchResult ?? initialTask)}>엑 셀 변 환
                                    </button>
                                    <button type='button' onClick={registerTask}>업 무 등 록</button>
                                    <button type='button' onClick={deleteTaskHandler}>체 크 삭 제</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='table-label'>거래처분류</td>
                            <td>
                                <label>
                                    <select name='affiliation' key={state.affiliation + 'affiliaction'}
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
                            <td>
                                <input type='text' name='customerName' onKeyDown={searchCustomerHandler}
                                       defaultValue={state.customerName} key={state.customerName + 'customerName'}/>
                                <input type='hidden' name='customerId' value={state.customerId ?? ''} readOnly/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <TaskSearchResult
                    pageByTasks={pageByTasks}
                    employees={employees}/>
            </form>
            {(!isPending && initialTask.length > 20) &&
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