'use server'
import {ReceiptCondition, ResponseReceipt} from "@/model/types/sales/receipt/type";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";


export async function saveReceiptListApi(receiptList: ResponseReceipt[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveReceipts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(receiptList),
        signal,
    }).then(async (response) => {

        await jwtFilter(response.status.toString());
        return response.status

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}

export async function updateReceiptListApi(receiptList: ResponseReceipt[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateReceipt`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(receiptList),
        signal,
    }).then(async (response) => {

        await jwtFilter(response.status.toString());
        return response.status

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}


export async function deleteReceiptApi(receiptIds: string[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteReceipt`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({receiptIds}),
        signal,
    }).then(async (response) => {

        await jwtFilter(response.status.toString());
        return response.status

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
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
        next: {revalidate: 3600, tags: ["receipt"]}
    }).then(async (response) => {


        await jwtFilter(response.status.toString());
        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}

export async function getReceiptByIds(receiptIds: string[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

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


        await jwtFilter(response.status.toString());
        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
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


        await jwtFilter(response.status.toString());
        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}

export async function getRecieptTotalApi(searchSDate) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getReceiptTotal`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({searchSDate}),
        signal,
    }).then(async (response) => {


        await jwtFilter(response.status.toString());
        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}
