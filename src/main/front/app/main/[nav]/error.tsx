// app/main/[nav]/error.tsx
'use client'; // 클라이언트 컴포넌트로 선언

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    if (error.message) {
        alert(error.message); 
        window.location.replace('/');
    } else {
        alert('알 수 없는 에러가 발생했습니다.');
    }
  }, [error]);

  return (
    <div>
      <h2>문제가 발생했습니다.</h2>
      <button onClick={reset}>다시 시도하기</button>
    </div>
  );
}