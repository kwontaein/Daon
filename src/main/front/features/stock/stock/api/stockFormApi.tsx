import { RequestStock } from "@/model/types/stock/stock/types";

export async function saveStockApi(stock: Omit<RequestStock,'stockId'>) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveStock`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(stock),
        signal,

    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.status;
        
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}

export async function updateStockApi(stock:RequestStock) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateStock`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(stock),
        signal,

    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.status;
        
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}

export async function deleteStockApi(stockId:string) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteStock`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({stockId}),
        signal,

    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.status;
        
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}