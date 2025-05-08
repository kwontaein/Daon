'use server'

import {ResponseEmployee} from "@/model/types/staff/employee/type";
import {cookies} from "next/headers";


export const getEmployeeApi = async () => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getEmployees`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        next: {revalidate: 3600, tags: ['user']} //1시간마다 재검증
    }).then(async (response) => {


        const text = await response.text();
        jwtFilter(text)
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    })

}

export const getEmployeeDetailApi = async (userId: string) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getEmployeeDetail`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({userId}),
    }).then(async (response) => {


        const text = await response.text();
        jwtFilter(text)
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    })
}

export const userIdDuplicationChecked = async (userId: string): Promise<boolean | null> => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/duplicationCheck`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({userId}),
        cache: 'no-store'
    }).then(async (response) => {


        return response.json()
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveEmployeeApi = async (userInfo: Omit<ResponseEmployee, 'dept'> & {
    deptId: string
}): Promise<number | void> => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveEmployee`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(userInfo),
        cache: 'no-store'
    }).then(async (response) => {


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const updateEmployeeApi = async (userInfo: Omit<ResponseEmployee, 'dept'> & {
    deptId: string
}): Promise<number | void> => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateEmployee`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(userInfo),
        cache: 'no-store'
    }).then(async (response) => {


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}
export const deleteEmployeeApi = async (userId: string) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteEmployee`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({userId}),
        cache: 'no-store'
    }).then(async (response) => {


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}