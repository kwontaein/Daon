import {RequestEstimate} from "@/model/types/task/estimate/type";

export async function getEstimateApi(estimateId: string) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    return fetch("http://localhost:8080/api/getEstimate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({estimateId}),
        signal,
        cache: 'no-cache'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response)
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
}

export async function saveEstimate(estimate: RequestEstimate) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤

    const timeoutId = setTimeout(()=> controller.abort(), 10000)
    return fetch("http://localhost:8080/api/saveEstimate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(estimate),
        signal,
        cache: 'no-cache'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.status
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
}

export async function updateEstimate(estimate: RequestEstimate) {
    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    return fetch("http://localhost:8080/api/saveEstimate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({estimate}),
        signal,
        next: {revalidate: 3600, tags: ['task']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));
} 