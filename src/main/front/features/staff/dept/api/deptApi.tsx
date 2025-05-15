'use server';
import {Dept} from "@/model/types/staff/dept/type";
import {cookies} from "next/headers";
import jwtFilter from "@/features/share/jwtFilter";



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
        return JSON.parse(text);
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
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
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
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
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
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
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}

