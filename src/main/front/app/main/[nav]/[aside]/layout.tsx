import { AsideKeyOfValues } from '@/constants/asideOptions';
import '@/styles/_global.scss';
import '@/styles/main/main-screen.scss';
import asideArrow from '@/assets/aside-arrow.gif';
import Image from 'next/image';

type PageProps={
    params :Promise<{
        nav : string
        aside : string
    }>,
    children :React.ReactNode
}

export default async function MainRootLayout({params, children}:PageProps){
    const {aside} = await params;
    const asideTitle = AsideKeyOfValues[aside];

    return(
        <section className={'main-screen-container'}>
            <h3 className={'main-route-title'}>
                <Image src={asideArrow} alt='>'></Image>
                {asideTitle}
            </h3>
            {children}
        </section>
    )
}