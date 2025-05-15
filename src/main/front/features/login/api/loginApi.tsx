'use server'
import jwtFilter from "@/features/share/jwtFilter";
import {cookies} from "next/headers";

export const loginApi = async (userInfo: { userId: string, password: string }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signIn`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo),
            credentials: "include",
        });
        
        const text = await response.text();
        if (!response.ok) {
            loginFilter(text)
        } else {
            document.location.replace('/main/schedule/schedule')
        }
    } catch (error) {
        // console.error('Error:', error);
    }
}

function loginFilter(error: string): void {
    if (error === "NON_EXISTENT_ERROR") {
        window.alert("존재하지 않는 아이디 입니다. 다시 확인해주세요.")

    } else if (error === "PW_ERROR") {
        window.alert("비밀번호가 틀렸습니다. 다시 입력해주세요.")
    } else {
        window.alert("알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.")
    }
}



export async function getUserInfo(){
   const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getMyDetail`, {
            credentials: "include", 
            headers : {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
        })
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}