"use server"
import { jwtFilter } from "@/features/login/api/loginApi";
import {RequestRemain} from "@/model/types/sales/remain/type";
import {cookies} from "next/headers";

export const getNoPaidApi = async (searchCondition: RequestRemain) => {

    const accessToekn= (await cookies()).get('accessToken');


    const cookieStore = (await cookies()).get('accessToken');
    const cookie = accessToekn.value

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
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}