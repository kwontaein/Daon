'use server';

import {StockPoint} from "@/model/types/stock/point/types";
import {cookies} from "next/headers";


export const updatePointApi = async (Points: StockPoint[]) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateStockPoint`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(Points),
        cache: 'no-store'
    }).then(async (response) => {


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const createPointApi = async (stock: Pick<StockPoint, 'stockPointName'>) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveStockPoint`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(stock),
        cache: 'no-store'
    }).then(async (response) => {


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deletePointApi = async (stock: StockPoint) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteStockPoint`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(stock),
        cache: 'no-store'
    }).then(async (response) => {


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}