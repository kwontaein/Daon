'use server'

import { ResponseStaff } from "@/model/types/staff/staff/type";

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

export const saveEmployeeApi = async(userInfo:Omit<ResponseStaff,'dept'> & {deptId:string}):Promise<number|void>=>{
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

export const updateEmployeeApi = async(userInfo:Omit<ResponseStaff,'dept'> & {deptId:string}):Promise<number|void>=>{
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