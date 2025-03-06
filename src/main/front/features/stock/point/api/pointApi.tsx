'use server';

import { StockPoint } from "@/model/types/stock/point/types";
import { revalidatePath, revalidateTag } from "next/cache";


export const updatePointApi = async (Points: StockPoint[]) => {
    return fetch("http://localhost:8080/api/updateStockPoint", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Points),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("stockPoint");
        revalidatePath("/main/stock/stock-point");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const createPointApi = async (stock: Pick<StockPoint, 'stockPointName'>) => {
    return fetch("http://localhost:8080/api/saveStockPoint", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(stock),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("stockPoint");
        revalidatePath("/main/stock/stock-point");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deletePointApi =async (stock: StockPoint) => {
    return fetch("http://localhost:8080/api/deleteStockPoint", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(stock),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("stockPoint")
        revalidatePath("/main/stock/stock-point");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}