import '@/styles/_global.scss';
import '@/styles/main-view/main.scss';

import MainViewHeader from '@/components/main-view/header';



export default async function MainRootLayout({children} : {
    children: React.ReactNode
}) {

    return (
        <section className={'main-view-container'}>
            <MainViewHeader/> 
            {children}
        </section>
    )
}