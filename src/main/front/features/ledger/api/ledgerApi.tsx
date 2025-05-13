"use server"
import {LedgerSearchCondition} from "@/model/types/ledger/type";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";


//거래처별원장
export async function getLedgerCustomerApi(searchCondition: LedgerSearchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getLedgers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        await jwtFilter(response.status.toString());
    
        const text = await response.text();
    
        if (!text) return null;
        return JSON.parse(text);
    }catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            // 이 메시지를 클라이언트 컴포넌트로 전달
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
   
}


//복수거래처원장
export async function getLedgerCustomesrApi(searchCondition: LedgerSearchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getLedgers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}


//품목별원장
export async function getLedgerStockApi(searchCondition: LedgerSearchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockLedger`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//매출장
export async function getSaleReceiptApi(searchCondition: LedgerSearchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSaleReceipt`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//매입장
export async function getPurchaseReceiptApi(searchCondition: LedgerSearchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getPurchaseReceipt`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//관리비원장
export async function getFeeReceiptAoi(searchCondition: LedgerSearchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getFeeReceipt`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}


//재고조사서
export async function getStockSurveyApi(searchCondition: LedgerSearchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockSurvey`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//기타원장
export async function getExtraLedgerApi(searchCondition: LedgerSearchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getExtraLedger`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}