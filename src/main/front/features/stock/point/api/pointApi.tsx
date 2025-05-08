'use server';

import { StockPoint } from "@/model/types/stock/point/types";
import { cookies } from "next/headers";

const cookieStore = cookies()
const cookie = cookieStore.toString()

export const updatePointApi = async (Points: StockPoint[]) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateStockPoint`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(Points),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const createPointApi = async (stock: Pick<StockPoint, 'stockPointName'>) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveStockPoint`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(stock),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deletePointApi =async (stock: StockPoint) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteStockPoint`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(stock),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}