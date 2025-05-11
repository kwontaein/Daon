'use server';
import {Dept} from "@/model/types/staff/dept/type";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";


export const getDeptApi = async () => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getDept`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        cache: 'force-cache',
        next: {tags: ['dept']}
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
        console.error('Error:', error)
    })
}

export const updateDeptApi = async (dept: Dept[]) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateDept`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(dept),
        cache: 'no-store'
    }).then(async (response) => {
        await jwtFilter(response.status.toString());

        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const createDeptApi = async (dept: Pick<Dept, 'deptName'>) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveDept`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(dept),
        cache: 'no-store'
    }).then(async (response) => {        
        await jwtFilter(response.status.toString());

        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteDeptApi = async (dept: Dept) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteDept`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(dept),
        cache: 'no-store'
    }).then(async (response) => {
        await jwtFilter(response.status.toString());

        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}