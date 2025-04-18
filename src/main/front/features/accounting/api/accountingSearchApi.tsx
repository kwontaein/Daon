import { PurchaseVAT, SalesVAT } from "@/model/types/accounting/type";

const initalSearchCondition = {
    searchSDate:null,
    searchEDate:null,
    customerName:null,
}
//매입부가세
export async function getPurchaseVatApi(purchaseVATId?:string){
    try{
        const response = await fetch("http://localhost:8080/api/getPurchaseVAT", {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({purchaseVATId}),
            next: {revalidate: 3600, tags: ['purchaseVAT']} //1시간마다 재검증
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

//매출부가세
export async function getSalesVATApi(salesVATId?:string){
    try{
        const response = await fetch("http://localhost:8080/api/getSalesVAT", {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({salesVATId}),
            next: {revalidate: 3600, tags: ['salesVAT']} //1시간마다 재검증
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

//카드증빙
export async function getCardTransactionfApi(cardTransactionId?:string){
    try{
        const response = await fetch("http://localhost:8080/api/getCardTransaction", {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...initalSearchCondition,cardTransactionId}),
            next: {revalidate: 3600, tags: ['cardTransaction']} //1시간마다 재검증
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

//지출증빙
export async function getExpenseProofApi(expenseProofId?:string){
    try{
        const response = await fetch("http://localhost:8080/api/getExpenseProof", {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({expenseProofId}),
            next: {revalidate: 3600, tags: ['expenseProof']} //1시간마다 재검증
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

//조달 및 수의 계산정산
export async function getProcurementApi(procurementSettlementId?:string){
    try{
        const response = await fetch("http://localhost:8080/api/getProcurement", {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({procurementSettlementId}),
            next: {revalidate: 3600, tags: ['procurement']} //1시간마다 재검증
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}