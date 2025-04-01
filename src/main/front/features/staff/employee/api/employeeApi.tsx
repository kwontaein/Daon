'use server'

import { ResponseEmployee } from "@/model/types/staff/employee/type";



export const getEmployeeApi = async()=>{
    return await fetch("http://localhost:8080/api/getEmployees", {
        headers: {
            'Content-Type': 'application/json',
        },
        next: {revalidate: 3600, tags: ['employee']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    })

}

export const getEmployeeDetailApi = async(userId:string)=>{
    return await fetch("http://localhost:8080/api/getEmployeeDetail", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
        next: {revalidate: 1800, tags: [`${userId}`]} //30분마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    })
}

export const userIdDuplicationChecked = async(userId:string):Promise<boolean|null>=>{
    return fetch("http://localhost:8080/api/duplicationCheck", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveEmployeeApi = async(userInfo:Omit<ResponseEmployee,'dept'> & {deptId:string}):Promise<number|void>=>{
    return fetch("http://localhost:8080/api/saveEmployee", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const updateEmployeeApi = async(userInfo:Omit<ResponseEmployee,'dept'> & {deptId:string}):Promise<number|void>=>{
    return fetch("http://localhost:8080/api/updateEmployee", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}