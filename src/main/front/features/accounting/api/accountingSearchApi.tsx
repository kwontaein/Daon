"use server"
import {cookies} from "next/headers"
import {jwtFilter} from "@/features/login/api/loginApi";

type searchCondition = {
    searchSDate?: Date,
    searchEDate?: Date,
    customerName?: string,
    purchaseVATId?: string,
    salesVATId?: string,
    cardTransactionId?: string
    expenseProofId?: string
    procurementSettlementId?: string
}


//매입부가세
export async function getPurchaseVatApi(searchCondition?: searchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getPurchaseVAT`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify({...searchCondition ?? {}}),
            ...(searchCondition ? {cache: 'no-store'} : {}),
            next: {revalidate: 3600, tags: ['purchaseVAT']} //1시간마다 재검증
        })
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//매출부가세
export async function getSalesVATApi(searchCondition?: searchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSalesVAT`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition ?? {}),
            ...(searchCondition ? {cache: 'no-store'} : {}),
            next: {revalidate: 3600, tags: ['salesVAT']} //1시간마다 재검증
        })
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//카드증빙
export async function getCardTransactionfApi(searchCondition?: searchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCardTransaction`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition ?? {}),
            ...(searchCondition ? {cache: 'no-store'} : {}),
            next: {revalidate: 3600, tags: ['cardTransaction']} //1시간마다 재검증
        })
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//지출증빙
export async function getExpenseProofApi(searchCondition?: searchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getExpenseProof`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition ?? {}),
            ...(searchCondition ? {cache: 'no-store'} : {}),
            next: {revalidate: 3600, tags: ['expenseProof']} //1시간마다 재검증
        })
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//조달 및 수의 계산정산
export async function getProcurementApi(searchCondition?: searchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getProcurement`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition ?? {}),
            ...(searchCondition ? {cache: 'no-store'} : {}),
            next: {revalidate: 3600, tags: ['procurementSettlement']} //1시간마다 재검증
        })
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}