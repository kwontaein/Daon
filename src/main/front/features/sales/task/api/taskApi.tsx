'use server'
import {SaveTask, TaskSearchCondition} from "@/model/types/sales/task/type";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";

export const fetchSearchTask = async (searchCondition: TaskSearchCondition) => {

    const accessToken = (await cookies()).get('accessToken').value
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
        const text = await response.text();
        jwtFilter(text)

        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function getTaskApi(taskId: string) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    if (!taskId.trim()) return null

    const accessToken = (await cookies()).get('accessToken').value
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
        const text = await response.text();
        jwtFilter(text)

        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
}

export async function getTasksApi() {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const accessToken = (await cookies()).get('accessToken').value
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
        const text = await response.text();
        jwtFilter(text)

        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
}


export const saveTask = async (task: SaveTask) => {

    const accessToken = (await cookies()).get('accessToken').value
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
        });        const text = await response.text();
        jwtFilter(text)

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const updateTask = async (task: SaveTask) => {

    const accessToken = (await cookies()).get('accessToken').value
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
        });        const text = await response.text();
        jwtFilter(text)

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}


export const deleteTask = async (taskIds: string[]) => {

    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteTask`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify({taskIds}),
        });        const text = await response.text();
        jwtFilter(text)

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}


export const postTaskComplete = async (taskId: string, actionTaken: string) => {

    const accessToken = (await cookies()).get('accessToken').value
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
        });        const text = await response.text();
        jwtFilter(text)

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}


export const updateTaskUserApi = async (taskId, assignedUser) => {

    const accessToken = (await cookies()).get('accessToken').value
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
        });        const text = await response.text();
        jwtFilter(text)

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}