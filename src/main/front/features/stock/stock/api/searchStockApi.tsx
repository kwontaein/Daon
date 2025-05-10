"use server"
import { jwtFilter } from "@/features/login/api/loginApi";
import {StockSearchCondition} from "@/model/types/stock/stock/types";
import {cookies} from "next/headers";


export async function searchStockApi(searchCondition: StockSearchCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockList`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(searchCondition),
        signal,
        next: {
            revalidate: 300,
            ...(searchCondition.productName ? {tags: [`${searchCondition.productName}`]} : {})
        }
    }).then(async (response) => {
        const text = await response.text();
        jwtFilter(text)

        return text ? JSON.parse(text) : [];

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}

export async function getStockListApi(searchCondition: StockSearchCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockList`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(searchCondition),
        signal,
        next: {
            revalidate: 3600,
            tags: ['stock'],
        }
    }).then(async (response) => {
        const text = await response.text();
        jwtFilter(text)

        return text ? JSON.parse(text) : [];

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}


export async function getStockByIdApi(stockId: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockById`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({stockId}),
        signal,
    }).then(async (response) => {
        const text = await response.text();
        jwtFilter(text)

        return text ? JSON.parse(text) : [];

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}

