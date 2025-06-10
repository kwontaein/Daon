"use server"
import jwtFilter from "@/features/share/jwtFilter";
import { BusinessError } from "@/model/constants/BusinessError";
import {RequestRemain} from "@/model/types/sales/remain/type";
import {cookies} from "next/headers";

export const getNoPaidApi = async (searchCondition: RequestRemain) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getNoPaid`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
        });
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}