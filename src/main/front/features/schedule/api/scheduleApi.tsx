import jwtFilter from "@/features/share/jwtFilter";
import { BusinessError } from "@/model/constants/BusinessError";
import {RequestSchedule, ResponseSchedule} from "@/model/types/schedule/type";
import {cookies} from "next/headers";

export async function getUserSchedule(userId, year): Promise<ResponseSchedule[]> {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);


    return await fetch(`/api/getSchedules`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({userId, year}),
        signal,

    }).then(async (response) => {
        if (!response.ok) {
            jwtFilter(response.status.toString());
        }
        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch(async (error) => {
        if (error instanceof BusinessError) {
            throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}

export async function saveSchedules(scheduleList: RequestSchedule[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    return await fetch(`/api/saveSchedules`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(scheduleList),
        signal,

    }).then(async (response) => {

        if (!response.ok) {
            jwtFilter(response.status.toString());
        }
        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }).catch(async (error) => {
        if (error instanceof BusinessError) {
            throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}
