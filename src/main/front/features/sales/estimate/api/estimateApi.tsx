"use server"
import {EstimateCategory, EstimateCondition, RequestEstimate} from "@/model/types/sales/estimate/type";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";


export async function getEstimateApi(estimateId: string) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getEstimate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({estimateId}),
        signal,
        cache: 'no-cache'
    }).then(async (response) => {
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}

export async function saveEstimate(estimate: RequestEstimate) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveEstimate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(estimate),
        signal,
        cache: 'no-cache'
    }).then(async (response) => {        
        await jwtFilter(response.status.toString());
        return response.status

    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}

export async function updateEstimate(estimate: RequestEstimate) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateEstimate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(estimate),
        signal,
    }).then(async (response) => {        
        await jwtFilter(response.status.toString());
        return response.status

    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}

export async function deleteEstimate(estimateId) {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteEstimate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({estimateId}),
    }).then(async (response) => {        
        await jwtFilter(response.status.toString());
        return response.status

    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}

/**업무 견적서 또는 일반 견적서를 찾는 api task:true = 업무견적서 */
export async function searchAllEstimateApi(task: boolean) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const condition: EstimateCondition = {
        condition: EstimateCategory.ALL,
        searchSDate: null,
        searchEDate: null,
        customerId: null,
        stockId: null,
        task,
        receipted: false
    }

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getEstimates`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(condition),
        next: {revalidate: 3600, tags: ['estimate']}, //1시간마다 재검증
        signal,
    }).then(async (response) => {        
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}


export async function searchEstimateConditionApi(searchCondition: EstimateCondition) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    searchCondition.receipted = true;

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getEstimates`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(searchCondition),
        signal,
    }).then(async (response) => {
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}

export async function transEstimateToReceiptApi(postData: { estimateId: string, receiptDate?: Date, note?: string }) {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estimatesPaid`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(postData),
    }).then(async (response) => {
        await jwtFilter(response.status.toString());
        return response.status
        
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
} 