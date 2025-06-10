// app/main/[nav]/error.tsx
'use client'; // 클라이언트 컴포넌트로 선언

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & {digest:string}, reset: () => void }) {

  const router = useRouter()
  useEffect(() => {
    if (error.digest) {
        const {message, statusCode} = JSON.parse(error.digest)
        alert(message); 
        if(['401', '403'].includes(statusCode)){
          router.replace('/'); 
        }
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
    }
  }, [error.message]);

  return null
}