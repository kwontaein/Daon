'use server'
import { SaveTask, TaskSearchCondition } from "@/model/types/task/task/type";

import { revalidateTag } from "next/cache";

export const fetchSearchTask = async (searchCondition:TaskSearchCondition)=>{
    try {
        const response = await fetch("http://localhost:8080/api/getTaskByOption", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}




export default async function getTask(){
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    return fetch("http://localhost:8080/api/getTask", {
        headers: {
            'Content-Type': 'application/json',
        },
        signal,
        next: {revalidate: 3600000, tags: ['task']} //1시간마다 재검증
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
        const response = await fetch("http://localhost:8080/api/saveTask", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
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
        const response = await fetch("http://localhost:8080/api/deleteTask", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({taskIds}),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        if(response.status===200){
            revalidateTag('task')
        }
        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}

