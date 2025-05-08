'use server';

import {StockCate} from "@/model/types/stock/cate/type";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";


export const getStockCateApi = async () => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockCateList`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        next: {tags: ['stocksCate']}
    }).then(async (response) => {


        const text = await response.text();
        jwtFilter(text)
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
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(cates),
        cache: 'no-store'
    }).then(async (response) => {


        const text = await response.text();
        jwtFilter(text)
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
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(stock),
        cache: 'no-store'
    }).then(async (response) => {


        const text = await response.text();
        jwtFilter(text)
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteStockCateApi = async (stock: StockCate) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteStockCate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(stock),
        cache: 'no-store'
    }).then(async (response) => {


        const text = await response.text();
        jwtFilter(text)
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}