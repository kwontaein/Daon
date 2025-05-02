'use client'
import CustomerForm from "@/components/main/customer/form/customer-form";
import MobileModal from "@/components/share/mobile-modal/page";
import { getAffiliation } from "@/features/customer/affiliation/api/customerCateApi";
import { getEmployeeApi } from "@/features/staff/employee/api/employeeApi";

import { useEffect, useState } from "react";

export default async function RegisterAffiliation(){
    const [affiliation,setAffilation] = useState()
    const [employees,setEmployees] = useState()
    
    useEffect(()=>{
        const fetchAffiliation = async()=>{
            try{
                const response = await getAffiliation()
                setAffilation(response);
            }catch(error){
                console.error('API 오류:', error);
            }
        }
        const fetchEmployees = async()=>{
            try{
                const response = await getEmployeeApi()
                setEmployees(response);
            }catch(error){
                console.error('API 오류:', error);
            }
        }
        fetchAffiliation()
        fetchEmployees()
    },[]) 

    return(
        <MobileModal>
            <CustomerForm affiliation={affiliation} employees={employees} mode='write'/>
        </MobileModal>
    )
}