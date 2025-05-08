'use server'

import { ResponseEmployee } from "@/model/types/staff/employee/type";



export const getEmployeeApi = async()=>{
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getEmployees`, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        next: {revalidate: 3600, tags: ['user']} //1시간마다 재검증
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
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getEmployeeDetail`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({userId}),
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
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/duplicationCheck`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
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
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveEmployee`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
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
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateEmployee`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
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
export const deleteEmployeeApi = async(userId:string)=>{
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteEmployee`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({userId}),
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