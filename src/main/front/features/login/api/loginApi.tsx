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



export  function jwtFilter(statusCode: string): Promise<void> {
    const redirectUrl = '/'; // 로그인 경로
    const errorMessage = {
        '401': '로그인이 필요합니다.',
        '403': '접근 권한이 없습니다.',
        '500': '서버 오류입니다. 관리자에게 문의하세요.',
        '404': '데이터가 존재하지 않습니다.'
      };

    // 서버 환경: window가 undefined
    if (typeof window === 'undefined') {
      // 서버에서는 응답을 throw해서 API 핸들러가 적절하게 처리하게 함
        if (["401", "403", "500"].includes(statusCode)) {
            alert( errorMessage[statusCode])

            throw new Response(JSON.stringify({ code: 'Unauthorized' ,message: errorMessage[statusCode] }), {
                status: parseInt(statusCode, 10),
                headers: {
                'Content-Type': 'application/json',
                },
            });
        }
        return
    }
  
    // 클라이언트 환경
    switch (statusCode) {
        case '401':
        case '403':
        alert(errorMessage[statusCode]);
        window.location.replace(redirectUrl);
        break;
        case '500':
        alert(errorMessage[statusCode]);
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
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}