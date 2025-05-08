import { Schedule } from "@/model/types/schedule/type";
import { cookies } from "next/headers";

export async function getUserSchedule(userId,year,month) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSchedules`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify({userId,year,month}),
        signal,

    }).then(async (response) => {


        return response.status;

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}

export async function saveSchedules(scheduleList:Schedule) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveSchedules`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(scheduleList),
        signal,

    }).then(async (response) => {


        return response.status;

    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.');
        }
        console.error('Error:', error);
    }).finally(() => clearTimeout(timeoutId));
}
