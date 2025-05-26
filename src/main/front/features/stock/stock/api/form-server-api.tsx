"use server"
import jwtFilter from "@/features/share/jwtFilter";
import {RequestStock} from "@/model/types/stock/stock/types";
import {cookies} from "next/headers";


export async function saveStockApi(stock: Omit<RequestStock, 'stockId'>) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveStock`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(stock),
        signal,

    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

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

export async function updateStockApi(stock: RequestStock) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateStock`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(stock),
        signal,

    }).then(async (response) => {

        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

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
