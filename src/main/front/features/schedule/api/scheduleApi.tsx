import { jwtFilter } from "@/features/login/api/loginApi";
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

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
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

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}
