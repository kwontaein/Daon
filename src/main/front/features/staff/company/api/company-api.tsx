import {ResponseCompany} from "@/model/types/staff/company/type";
import { cookies } from "next/headers";


const cookieStore = cookies()
const cookie = cookieStore.toString()

export async function getCompany() {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCompany`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        signal,
        // cache:'no-store',
        next: {revalidate: 3600, tags: ['company']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
}

export async function getCompanyDetail(companyId:string) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCompanyDetail`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        signal,
        body: JSON.stringify({companyId}),
        next: {revalidate: 1800, tags: [`${companyId}`]} //30분마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
}

export async function saveCompany(companyData: Omit<ResponseCompany, 'companyId'>) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveCompany`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            body: JSON.stringify(companyData)
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function updateCompany(companyData: ResponseCompany) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateCompany`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            body: JSON.stringify(companyData)
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteCompany(companyId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteCompany`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            body: JSON.stringify({companyId})
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}