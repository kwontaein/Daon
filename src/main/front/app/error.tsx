// app/main/[nav]/error.tsx
'use client'; // 클라이언트 컴포넌트로 선언

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()
  useEffect(() => {
    if (error.message) {
        alert(error.message); 
        router.replace('/'); 
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
    }
  }, [error.message]);

  return null
}