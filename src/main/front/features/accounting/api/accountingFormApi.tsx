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
import {jwtFilter} from "@/features/login/api/loginApi";


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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
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
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
    }
}


//삭제 관련 api
export async function deleteAccountingApi(division, id) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    let api;
    let key;
    switch (AccountingDivision[division]) {
        case "매입부가세" :
            api = 'deletePurchaseVAT'
            key = 'purchaseVATId'
            break;
        case "매출부가세" :
            api = 'deleteSalesVAT'
            key = 'salesVATId'
            break;
        case "카드증빙" :
            api = 'deleteCardTransaction'
            key = 'cardTransactionId'
            break;
        case "지출증빙" :
            api = 'deleteExpenseProof'
            key = 'expenseProofId'
            break;
        case "조달및수의" :
            api = 'deleteProcurement'
            key = 'procurementSettlementId'
            break;
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${api}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            credentials: 'include',
            body: JSON.stringify({[key]: id})
        })
        await jwtFilter(response.status.toString());
        return response.status;

    } catch (error) {
        console.error('Error:', error);
    }
}
