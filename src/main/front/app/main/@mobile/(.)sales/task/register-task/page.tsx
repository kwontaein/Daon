'use client'

import '@/styles/_global.scss';


import '@/components/main/sales/receipt/table/receipt-table.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import TaskForm from '@/components/main/sales/task/form/task-form';
import { getEmployeeApi } from '@/features/staff/employee/api/employeeApi';
import { useEffect, useState } from 'react';
import MobileModal from '@/components/share/mobile-modal/page';

export default function MobileRegisterTask(){
    const [employees, setEmployees] = useState()
    
    useEffect(()=>{
        const fetchEmployees = async()=>{
            try{
                const response = await getEmployeeApi()
                setEmployees(response);
            }catch(error){
                console.error('고객 검색 API 오류:', error);
            }
        }
        fetchEmployees()
    },[]) 

    return(
        <MobileModal>
            <>{employees && <TaskForm employees={employees} mode="write"/>}</>
        </MobileModal>
    )
}