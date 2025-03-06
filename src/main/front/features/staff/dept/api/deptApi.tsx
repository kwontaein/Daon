'use server';
import { Dept } from "@/model/types/staff/dept/type";
import { revalidatePath, revalidateTag } from "next/cache";


export const updateDeptApi = async (dept: Dept[]) => {
    return fetch("http://localhost:8080/api/updateDept", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dept),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("dept");
        // revalidatePath("/main/staff/dept");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const createDeptApi = async (dept: Pick<Dept,'deptName'>) => {
    return fetch("http://localhost:8080/api/createDept", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dept),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("dept");
        // revalidatePath("/main/staff/dept");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteDeptApi =async (dept: Dept) => {
    return fetch("http://localhost:8080/api/deleteDept", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dept),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("dept");
        // revalidatePath("/main/staff/dept");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}