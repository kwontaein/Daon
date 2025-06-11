'use client'; 

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & {digest:string}, reset: () => void }) {

  const router = useRouter()
  useEffect(() => {
    if (error.digest) {
        const errorJSON = JSON.parse(error.digest)
        alert(errorJSON.message);
        if(['401', '403'].includes(errorJSON.statusCode)){
          router.replace('/'); 
        } 
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
    }
  }, [error.message]);

  return null
}