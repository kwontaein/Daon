'use server'
import {ReceiptCondition, ResponseReceipt} from "@/model/types/sales/receipt/type";
import {cookies} from "next/headers";
import jwtFilter from "@/features/share/jwtFilter";
import { BusinessError } from "@/model/constants/BusinessError";



export async function getAllReceiptsApi() {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllReceipts`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        signal,
        next: {revalidate: 3600, tags: ["receipt"]}
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch (async (error)=> {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}

export async function getReceiptListApi(receiptCondition: ReceiptCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getReceipts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(receiptCondition),
        signal,
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch (async (error)=> {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}

export async function getReceiptByIds(receiptIds: string[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    
    if (!receiptIds || receiptIds.length===0) return null
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getReceiptsById`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({receiptIds}),
        signal,
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch (async (error)=> {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}


export async function getReceiptSearchListApi(receiptCondition: ReceiptCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getReceipts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(receiptCondition),
        signal,
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch (async (error)=> {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}
