import { BusinessError } from "@/model/constants/BusinessError";

export default function jwtFilter(statusCode: string): never| undefined {
  const redirectUrl = '/';
  const errorMessage = {
    '401': '로그인이 필요합니다.',
    '403': '접근 권한이 없습니다.',
    '409': '참조중인 데이터가 존재하여 삭제가 불가능합니다.',
    '500': '서버 오류입니다. 관리자에게 문의하세요.',
    '404': '데이터가 존재하지 않습니다.',
  };

  if (typeof window === 'undefined') {
    // 서버 환경에서는 Next.js의 error.tsx로 전파 가능
    throw new BusinessError(JSON.stringify({message:errorMessage[statusCode]??'알 수 없는 오류가 발생했습니다.', statusCode})); // optional: 로직 중단용
  } else {
    // 클라이언트에서는 수동 처리 필요
    alert(errorMessage[statusCode]);
    if (statusCode === "409") {
      return;
    }
    if (['401', '403'].includes(statusCode)) {
      window.location.replace(redirectUrl);
    }
    throw new Error(errorMessage[statusCode]); // optional: 로직 중단용
  }
}