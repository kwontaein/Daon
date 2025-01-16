import '@/styles/_global.scss';
import MainHeader from "@/components/header/_header";



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
        <section className="flex-row" style={{paddingBlock : '1rem'}}>
            {aside}
            {children}
        </section>
      </>
    );
}