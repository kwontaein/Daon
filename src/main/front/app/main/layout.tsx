import '@/styles/_global.scss';
import '@/styles/main-view/main.scss';

import MainHeader from "@/components/main/layout/header/_header";
import AsideTitle from '@/components/main/layout/aside/asideTitle';
import { cookies } from 'next/headers';


export default async function MainLayout({navigation,aside,children,footer,search,mobile}: {
    aside: React.ReactNode;
    navigation: React.ReactNode;
    children: React.ReactNode;
    footer: React.ReactNode;
    search: React.ReactNode;
    mobile: React.ReactNode;
  }) {
    const userInfo = (await cookies()).get('user')?.value

    return (
      <>
        <header>
          <MainHeader userInfo={JSON.parse(userInfo)}/>
        </header>
        {search}
        {mobile}
        {navigation}
        <section className='main-layout-wrapper'>
          {aside}
          <section className='main-view-container'>
            <AsideTitle/> 
            {children}
            {footer}
          </section>
        </section>
      </>
    );
}