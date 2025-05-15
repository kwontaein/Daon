
export default function jwtFilter(statusCode: string): Promise<void> {
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
