'use server'
import {SaveTask, TaskSearchCondition} from "@/model/types/sales/task/type";
import {cookies} from "next/headers";
import jwtFilter from "@/features/share/jwtFilter";


export const fetchSearchTask = async (searchCondition: TaskSearchCondition) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTaskByOption`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}


export async function getTaskApi(taskId: string) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    if (!taskId.trim()) return null

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({taskId}),
        signal,
        next: {revalidate: 3600, tags: ['task']} //1시간마다 재검증
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}

export async function getTasksApi() {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTasks`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        signal,
        next: {revalidate: 3600, tags: ['task']} //1시간마다 재검증
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}

export async function getAdminTasksApi() {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAdminTask`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        signal,
        next: {revalidate: 3600, tags: ['adminTask']} //1시간마다 재검증
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}


export const saveTask = async (task: SaveTask) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveTask`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(task),
        });        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        return response.status;
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

export const updateTask = async (task: SaveTask) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateTask`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(task),
        });        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        return response.status;
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}



export const postTaskComplete = async (taskId: string, actionTaken: string) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/taskComplete`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify({taskId: taskId, actionTaken: actionTaken}),
        });        
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;
        
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}


export const updateTaskUserApi = async (taskId, assignedUser) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateTaskUser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify({taskId, assignedUser}),
        });        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        return response.status;
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}