import { StockSearchCondition } from "@/model/types/stock/stock/types";




export async function searchStockApi(searchCondition: StockSearchCondition){
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    return await fetch("http://localhost:8080/api/getStockList", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...searchCondition,receiptCategory: 'DEPOSIT'}),
        signal,
        // cache:'no-store'
        next: {revalidate: searchCondition.name ?(1000 * 60* 5) : (1000 * 60 * 60), tags: [searchCondition.name ?? 'stock']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
}