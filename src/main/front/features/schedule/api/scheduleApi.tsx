import jwtFilter from "@/features/share/jwtFilter";
import { RequestSchedule, ResponseSchedule } from "@/model/types/schedule/type";

export async function getUserSchedule(userId,year):Promise<ResponseSchedule[]> {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);


    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSchedules`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({userId,year}),
        signal,

    }).then(async (response) => {
        await jwtFilter(response.status.toString());
        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }else  if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}

export async function saveSchedules(scheduleList:RequestSchedule[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveSchedules`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(scheduleList),
        signal,

    }).then(async (response) => {

        await jwtFilter(response.status.toString());
        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }else  if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}
