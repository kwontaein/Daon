import { PurchaseVAT, SalesVAT } from "@/model/types/accounting/type";

type searchCondition = {
    searchSDate?:Date,
    searchEDate?:Date,
    customerName?:string,
    purchaseVATId?:string,
    salesVATId?:string,
    cardTransactionId?:string
    expenseProofId?:string
    procurementSettlementId?:string
}
//매입부가세
export async function getPurchaseVatApi(searchCondition?:searchCondition){
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getPurchaseVAT`, {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...searchCondition??{}}),
            ...(searchCondition ? {cache:'no-store'} :{}),
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
export async function getSalesVATApi(searchCondition?:searchCondition){
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSalesVAT`, {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(searchCondition??{}),
            ...(searchCondition ? {cache:'no-store'} :{}),
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
export async function getCardTransactionfApi(searchCondition?:searchCondition){
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCardTransaction`, {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(searchCondition??{}),
            ...(searchCondition ? {cache:'no-store'} :{}),
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
export async function getExpenseProofApi(searchCondition?:searchCondition){
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getExpenseProof`, {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(searchCondition??{}),
            ...(searchCondition ? {cache:'no-store'} :{}),
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
export async function getProcurementApi(searchCondition?:searchCondition){
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getProcurement`, {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(searchCondition??{}),
            ...(searchCondition ? {cache:'no-store'} :{}),
            next: {revalidate: 3600, tags: ['procurement']} //1시간마다 재검증
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}