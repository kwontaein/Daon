'use client'
import '@/styles/table-style/search.scss'

import {startTransition, useActionState, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {initialTaskState, taskSearchAction} from '@/features/sales/task/action/taskSearchAction';

import {ResponseTask, TaskEnumType} from '@/model/types/sales/task/type';
import {ResponseEmployee} from '@/model/types/staff/employee/type';

import AdminDataSearchSearchResult from './search-result';
import Pagination from '@/components/share/pagination';
import {AffiliationType} from '@/model/types/customer/affiliation/type';
import useDeletePage from '@/hooks/share/useDeletePage';
import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import {useScreenMode} from '@/hooks/share/useScreenMode';
import useSearchCustomer from '@/hooks/customer/search/useSearchCustomer';
import {ResponseCustomer} from '@/model/types/customer/customer/type';
import {exportAdminTasksToExcel} from "@/components/main/sales/admin/exportTasksToExcel";


export default function AdminDataSearch({affiliations, initialTask, employees, page}: {
    affiliations: AffiliationType[],
    initialTask: ResponseTask[],
    page: number,
    employees: ResponseEmployee[]
}) {
    const [state, action, isPending] = useActionState(taskSearchAction, initialTaskState);
    const [searchResult, setSearchResult] = useState()
    const pageByTasks = useMemo(() => (searchResult ?? initialTask).slice((page - 1) * 20, ((page - 1) * 20) + 20), [initialTask, searchResult, page])
    const formRef = useRef(null)
    const mode = useScreenMode({tabletSize: 690, mobileSize: 620});


    //router control
    const deletePage = useDeletePage()

    const submitHandler = () => {
        if (isPending) return
        const formData = new FormData(formRef.current);
        formData.set('action', 'submit');
        startTransition(() => {
            action(formData);
        });
    }

    useEffect(() => {
        if (state.searchResult) {
            setSearchResult(state.searchResult)
            if (page === 1) return
            deletePage()
        }
    }, [state])

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
                                <label>
                                    거래처분류 &nbsp;: &nbsp;
                                    <select className='title-selector' name='affiliation'
                                            key={state.affiliation + 'affiliaction'}
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
                        </thead>
                        <tbody>
                        <tr>
                            <td className="table-label">출력일자</td>
                            <td>
                        <span
                            className="dates-container"
                            style={{display: `${mode === 'tabelt' ? 'block' : 'flex'}`}}>
                            <CustomDateInput
                                defaultValue={state.searchSDate}
                                name="searchSDate"
                                className={mode === 'tabelt' ? 'none-max-width' : ''}/>
                            {mode !== 'tabelt' && '~'}
                            <CustomDateInput
                                defaultValue={state.searchEDate}
                                name="searchEDate"
                                className={mode === 'tabelt' ? 'none-max-width' : ''}/>
                        </span>
                            </td>
                            <td rowSpan={4}>
                                <div className='grid-table-buttons'>
                                    <button type='button' disabled={isPending}
                                            onClick={submitHandler}>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색
                                    </button>
                                    <button type='button' onClick={setSearchResult.bind(null, null)}>전 체 보 기</button>
                                    <button type='button'>인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;쇄
                                    </button>
                                    <button type='button'
                                            onClick={() => exportAdminTasksToExcel(searchResult ?? initialTask)}>엑 셀 변 환
                                    </button>
                                </div>
                            </td>
                        </tr>
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
                <AdminDataSearchSearchResult
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