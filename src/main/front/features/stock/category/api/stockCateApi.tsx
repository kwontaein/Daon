'use server';

import {StockCate} from "@/model/types/stock/cate/type";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";


export const getStockCateApi = async () => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockCateList`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        next: {tags: ['stocksCate']}
    }).then(async (response) => {
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}

export const updateStockCateApi = async (cates: StockCate[]) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
        await jwtFilter(response.status.toString());

        return response.status
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}

export const saveStockCateApi = async (stock: Pick<StockCate, 'stockCateName'>) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
        await jwtFilter(response.status.toString());

        return response.status
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}


export const deleteStockCateApi = async (stock: StockCate) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
        await jwtFilter(response.status.toString());

        return response.status
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}