'use server'
import { SaveTask, TaskSearchCondition } from "@/model/types/sales/task/type";
import { cookies } from "next/headers";

const cookieStore = cookies()
const cookie = cookieStore.toString()
export const fetchSearchTask = async (searchCondition:TaskSearchCondition)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTaskByOption`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}




export async function getTaskApi(taskId:string){
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    if(!taskId.trim()) return null
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTask`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body:JSON.stringify({taskId}),
        signal,
        next: {revalidate: 3600, tags: ['task']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
} 

export async function getTasksApi(){
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTasks`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        signal,
        next: {revalidate: 3600, tags: ['task']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
} 


export const saveTask = async (task:SaveTask)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveTask`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',
            body: JSON.stringify(task),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const updateTask = async (task:SaveTask)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateTask`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify(task),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}


export const deleteTask = async (taskIds:string[])=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteTask`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify({taskIds}),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}




export const postTaskComplete = async (taskId:string, actionTaken:string)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/taskComplete`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify({taskId:taskId,actionTaken:actionTaken}),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}


export const updateTaskUserApi= async (taskId, assignedUser)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateTaskUser`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify({taskId,assignedUser}),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}