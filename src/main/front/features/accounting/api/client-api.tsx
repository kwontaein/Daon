'use client'
import jwtFilter from "@/features/share/jwtFilter";
import { AccountingDivision } from "@/model/types/accounting/type";

 
//삭제 관련 api
export async function deleteAccountingApi(division, id) {
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
            },
            credentials: 'include',
            body: JSON.stringify({[key]: id})
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }else{
            window.alert('삭제가 완료되었습니다.')
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
