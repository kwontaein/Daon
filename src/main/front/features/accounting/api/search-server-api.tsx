"use server"
import {cookies} from "next/headers"
import jwtFilter from "@/features/share/jwtFilter";
import {AccountingDivision} from "@/model/types/accounting/type";


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
        const response = await fetch(`/api/getPurchaseVAT`, {
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
        if (!response.ok) {
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const {message} = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//매출부가세
export async function getSalesVATApi(searchCondition?: searchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`/api/getSalesVAT`, {
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
        if (!response.ok) {
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const {message} = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//카드증빙
export async function getCardTransactionfApi(searchCondition?: searchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`/api/getCardTransaction`, {
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
        if (!response.ok) {
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const {message} = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//지출증빙
export async function getExpenseProofApi(searchCondition?: searchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`/api/getExpenseProof`, {
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
        if (!response.ok) {
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const {message} = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//조달 및 수의 계산정산
export async function getProcurementApi(searchCondition?: searchCondition) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`/api/getProcurement`, {
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
        if (!response.ok) {
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const {message} = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

export async function transAccountingToReceipt(division: keyof typeof AccountingDivision ,id :string, paidDate?:Date) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    let api;
    let key;
    switch (AccountingDivision[division]) {
        case "매출부가세" :
            api = 'salesVATPaid'
            key = 'salesVATId'
            break;
        case "카드증빙" :
            api = 'cardTransactionPaid'
            key = 'cardTransactionId'
            break;
        case "지출증빙" :
            api = 'paidExpenseProof'
            key = 'expenseProofId'
            break;
    }
    try {
        const response = await fetch(`/api/${api}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify({[key]: id, paidDate})
        })
        if (!response.ok) {
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const {message} = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }

}