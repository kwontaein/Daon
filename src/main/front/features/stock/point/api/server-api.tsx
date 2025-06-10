'use server';

import jwtFilter from "@/features/share/jwtFilter";
import { BusinessError } from "@/model/constants/BusinessError";
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
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;
    }).catch (async (error)=> {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
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
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;
    }).catch (async (error)=> {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}

