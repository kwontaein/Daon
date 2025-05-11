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

export async function jwtFilter(error: string): Promise<void> {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    switch (error) {
        case "302":
            window.alert("모든 토큰이 만료되었습니다. 재로그인하세요.");
            await delay(100); // alert 표시를 위한 짧은 대기
            document.location.replace('/');
            break;

        case "401":
            window.alert("알수없는 접근입니다. 재로그인하세요.");
            await delay(100);
            document.location.replace('/');
            break;

        case "409":
            window.alert("다른 곳에서 로그인되었습니다. 로그아웃합니다.");
            await delay(100);
            document.location.replace('/');
            break;

        case "404":
            window.alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
            break;

        default:
            break;
    }
}

export async function getUserInfo(){

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getMyDetail`, {
            credentials: "include", 
            headers : {
                'Content-Type': 'application/json'
            },
        })
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