'use server';

import {StockPoint} from "@/model/types/stock/point/types";
import {cookies} from "next/headers";


export const updatePointApi = async (Points: StockPoint[]) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}

export const createPointApi = async (stock: Pick<StockPoint, 'stockPointName'>) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}


export const deletePointApi = async (stock: StockPoint) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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
    }).catch(async(error) => {
       if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}