'use server'
import { RequestReceipt } from "@/model/types/receipt/type";

export async function saveReceiptListApi(receiptList:RequestReceipt[]){
    console.log(receiptList)
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
