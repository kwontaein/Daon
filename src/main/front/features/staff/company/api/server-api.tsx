"use server"
import {ResponseCompany} from "@/model/types/staff/company/type";
import {cookies} from "next/headers";
import jwtFilter from "@/features/share/jwtFilter";
import { BusinessError } from "@/model/constants/BusinessError";



export async function getCompany() {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCompany`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        signal,
        // cache:'no-store',
        next: {revalidate: 3600, tags: ['company']} //1시간마다 재검증
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}

export async function getCompanyDetail(companyId: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCompanyDetail`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        signal,
        body: JSON.stringify({companyId}),
        next: {revalidate: 1800, tags: [`${companyId}`]} //30분마다 재검증
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));
}

export async function saveCompany(companyData: Omit<ResponseCompany, 'companyId'>) {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveCompany`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            body: JSON.stringify(companyData)
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

export async function updateCompany(companyData: ResponseCompany) {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateCompany`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            body: JSON.stringify(companyData)
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}
