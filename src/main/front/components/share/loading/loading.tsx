'use client'
import './loading.scss'
import Spinner from '@/public/assets/spinner.gif'
import Image from 'next/image';

export default function CustomLoading({content='', bgOpacity=true}){

    return(
        <div className={`full-screen-div ${bgOpacity && 'bg-opacity' }`}>
            <Image src={Spinner} alt={'Loading'}/>
            <p>{content ??'Loading..'}</p>
        </div>
    )
}