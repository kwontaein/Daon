'use server'
import { searchStockApi } from "@/features/stock/stock/api/searchStockApi";
import {ReceiptCondition, ResponseReceipt} from "@/model/types/sales/receipt/type";

export async function saveReceiptListApi(receiptList: ResponseReceipt[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch("http://localhost:8080/api/saveReceipts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiptList),
        signal,
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.status

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}


export async function deleteReceiptApi(receiptIds: string[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch("http://localhost:8080/api/deleteReceipt", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({receiptIds}),
        signal,
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.status

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}


export async function getReceiptListApi(receiptCondition: ReceiptCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch("http://localhost:8080/api/getReceipts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiptCondition),
        signal,
        next: {revalidate: 3600, tags: ["receipt"]}
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : [];

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}


export async function getReceiptSearchListApi(receiptCondition: ReceiptCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch("http://localhost:8080/api/getReceipts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiptCondition),
        signal,
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : [];
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}

export async function getRecieptTotalApi(searchSDate) {
    console.log(searchSDate)
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch("http://localhost:8080/api/getReceiptTotal", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({searchSDate}),
        signal,
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : [];
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}
