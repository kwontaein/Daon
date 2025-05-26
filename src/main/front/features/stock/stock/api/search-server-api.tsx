"use server"
import jwtFilter from "@/features/share/jwtFilter";
import {StockSearchCondition} from "@/model/types/stock/stock/types";
import {cookies} from "next/headers";


export async function searchStockApi(searchCondition: StockSearchCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
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
        cache:'no-cache'
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch (async (error)=> {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}

export async function getStockListApi(searchCondition: StockSearchCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
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
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch (async (error)=> {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}


export async function getStockByIdApi(stockId: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
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
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch (async (error)=> {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}

