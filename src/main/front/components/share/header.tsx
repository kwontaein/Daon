'use client'
import { AsideKeyOfValues } from '@/constants/asideOptions';
import '@/styles/_global.scss';
import '@/styles/main-view/header.scss';
import asideArrow from '@/assets/aside-arrow.gif';
import Image from 'next/image';
import { notFound, useParams, usePathname } from 'next/navigation';


export default function MainViewHeader(){
    const pathname = usePathname();
    const aside = pathname.split('/')[3]
    const asideTitle = AsideKeyOfValues[aside];
    if(!asideTitle){
        return notFound();
    }
    return(
            <h3 className={'header-title'}>
                <Image src={asideArrow} alt='>'></Image>
                {asideTitle}
            </h3>
    )
}