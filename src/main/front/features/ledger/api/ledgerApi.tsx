import { LedgerSearchCondition } from "@/model/types/ledger/type";
import { cookies } from "next/headers";

const cookieStore = cookies()
const cookie = cookieStore.toString()

//거래처별원장
export async function getLedgerCustomerApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getLedgers`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}


//복수거래처원장
export async function getLedgerCustomesrApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getLedgers`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}



//품목별원장
export async function getLedgerStockApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockLedger`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

//매출장
export async function getSaleReceiptApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSaleReceipt`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

//매입장
export async function getPurchaseReceiptApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getPurchaseReceipt`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

//관리비원장
export async function getFeeReceiptAoi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getFeeReceipt`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}


//재고조사서
export async function getStockSurveyApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockSurvey`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

//기타원장
export async function getExtraLedgerApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getExtraLedger`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials:'include',            
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}


