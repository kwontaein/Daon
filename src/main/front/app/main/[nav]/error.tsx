'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error }: ErrorProps) {
  useEffect(() => {
    if (error?.message) {
      window.alert(error.message);
    }
    // 여기서 리디렉트 하고 싶다면 아래 코드도 사용 가능
    window.location.replace('/');
  }, [error]);

  return (
    <html>
      <body>
        {/* <h2>요청 중 문제가 발생했습니다.</h2> */}
      </body>
    </html>
  );
}