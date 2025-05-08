"use server"
import {RequestRemain} from "@/model/types/sales/remain/type";
import {cookies} from "next/headers";

export const getNoPaidApi = async (searchCondition: RequestRemain) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString();

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


        const text = await response.text();
        jwtFilter(text)
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}