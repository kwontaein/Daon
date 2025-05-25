'use client'
import { useEffect } from 'react'
import './error-alert.scss'
import { useRouter } from 'next/navigation';

export default function ErrorAlert({status}:{status:number}){
    const errorMessage = {
        '401': '로그인이 필요합니다.',
        '403': '접근 권한이 없습니다.',
        '500': '서버 오류입니다. 관리자에게 문의하세요.',
        '404': '데이터가 존재하지 않습니다.'
      };
    const router = useRouter()
    useEffect(()=>{
        if(errorMessage[status]){
            window.alert(errorMessage[status])
        }else{
            window.alert('알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요.')
        }
        router.replace('/')
    },[])

    return null
}