"use server"
import {
    AccountingDivision,
    CardTransaction,
    ExpenseProof,
    ProcurementSettlement,
    PurchaseVAT,
    SalesVAT,
    UnionAccountingType
} from "@/model/types/accounting/type";
import {cookies} from "next/headers";
import jwtFilter from "@/features/share/jwtFilter";



//회계 거래처분류 
export async function getCategorySelectionApi() {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCategorySelection`, {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
        });
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    }catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//매입부가세
export async function savePurchaseVatApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/savePurchaseVAT`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as PurchaseVAT)
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//매출부가세
export async function saveSalesVATApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveSalesVAT`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as SalesVAT)
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//카드증빙
export async function saveCardTransactionApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveCardTransaction`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as CardTransaction)
        })        
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//지출증빙
export async function saveExpenseProofApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveExpenseProof`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as ExpenseProof)
        })        
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//조달 및 수의 계산정산
export async function saveProcurementApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveProcurement`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as ProcurementSettlement)
        })        
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}


//매입부가세
export async function updatePurchaseVatApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updatePurchaseVAT`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as PurchaseVAT)
        })        
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//매출부가세
export async function updateSalesVATApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateSalesVAT`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as SalesVAT)
        })        
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//카드증빙
export async function updateCardTransactionApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateCardTransaction`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as CardTransaction)
        })        
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//지출증빙
export async function updateExpenseProofApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateExpenseProof`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as ExpenseProof)
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

//조달 및 수의 계산정산
export async function updateProcurementApi(saveData: UnionAccountingType) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateProcurement`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify(saveData as ProcurementSettlement)
        })        
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status;

    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}


