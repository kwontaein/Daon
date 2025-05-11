'use server'

import { jwtFilter } from "@/features/login/api/loginApi";
import {ResponseEmployee} from "@/model/types/staff/employee/type";
import {cookies} from "next/headers";


export const getEmployeeApi = async () => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getEmployees`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        next: {revalidate: 3600, tags: ['user']} //1시간마다 재검증
    }).then(async (response) => {        
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    })

}

export const getEmployeeDetailApi = async (userId: string) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getEmployeeDetail`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({userId}),
    }).then(async (response) => {        
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    })
}

export const userIdDuplicationChecked = async (userId: string): Promise<boolean | null> => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
        await jwtFilter(response.status.toString());


        return response.json()
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveEmployeeApi = async (userInfo: Omit<ResponseEmployee, 'dept'> & {
    deptId: string
}): Promise<number | void> => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
        await jwtFilter(response.status.toString());


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const updateEmployeeApi = async (userInfo: Omit<ResponseEmployee, 'dept'> & {
    deptId: string
}): Promise<number | void> => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
        await jwtFilter(response.status.toString());


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}
export const deleteEmployeeApi = async (userId: string) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
        await jwtFilter(response.status.toString());


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}