import { StockSearchCondition } from "@/model/types/stock/stock/types";


export async function searchStockApi(searchCondition: StockSearchCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const nextOptions = {
        revalidate: 300,
        ...(searchCondition.name ? { tags: [searchCondition.name] } : {})
    };

    return await fetch("http://localhost:8080/api/getStockList", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...searchCondition, receiptCategory: 'DEPOSIT' }),
        signal,
        next:nextOptions
      
    }).then(async (response) => {
        console.log("Cache Status:", response.headers.get("x-nextjs-cache")); // 캐싱 상태 확인

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

export async function getStockListApi(searchCondition: StockSearchCondition) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch("http://localhost:8080/api/getStockList", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...searchCondition, receiptCategory: 'DEPOSIT' }),
        signal,
        next: {
            revalidate: 3600, 
            tags: ['stock'],
        }
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