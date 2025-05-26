'use client'
import './loading.scss'
import Spinner from '@/public/assets/spinner.gif'
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CustomLoading({content}:{content?:string}){
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(()=>{
            setVisible(true)
        },300)
      }, []);
     return(
        <div className={`full-screen-div ${visible ? "visible" : ""}`}>
            <Image src={Spinner} alt={'Loading'}/>
            <p>{content ??'데이터를 불러오는 중입니다.'}</p>
        </div>
    )
}