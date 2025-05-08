'use server';
import { Dept } from "@/model/types/staff/dept/type";
import { cookies } from "next/headers";



export const getDeptApi = async () => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getDept`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        cache: 'force-cache',
        next: {tags: ['dept']}
    }).then(async (response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const updateDeptApi = async (dept: Dept[]) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateDept`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(dept),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const createDeptApi = async (dept: Pick<Dept,'deptName'>) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveDept`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(dept),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteDeptApi =async (dept: Dept) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 
    
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteDept`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(dept),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}