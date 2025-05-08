'use server';

import { StockCate } from "@/model/types/stock/cate/type";
import { cookies } from "next/headers";

const cookieStore = cookies()
const cookie = cookieStore.toString()

export const getStockCateApi = async () => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockCateList`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        next: {tags: ['stocksCate']} 
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : [];
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const updateStockCateApi = async (cates: StockCate[]) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateStockCate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(cates),
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

export const saveStockCateApi = async (stock: Pick<StockCate, 'stockCateName'>) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveStockCate`, {
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


export const deleteStockCateApi =async (stock: StockCate) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 
    
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteStockCate`, {
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