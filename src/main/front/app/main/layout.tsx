import '@/styles/_global.scss';
import '@/styles/main-view/main.scss';

import MainHeader from "@/components/header/_header";
import MainViewHeader from '@/components/share/header';




export default async function MainLayout({navigation,aside,children}: {
    aside: React.ReactNode;
    navigation: React.ReactNode;
    children: React.ReactNode;
  }) {
    
    return (
      <>
        <header>
          <MainHeader />
        </header>
        {navigation}
        <section className='main-layout-wrapper'>
          {aside}
          <section className={'main-view-container'}>
            <MainViewHeader/> 
            {children}
          </section>
        </section>
      </>
    );
}