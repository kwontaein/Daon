import Navigation from "@/components/nav/_navigation";
import MobileNavBar from "@/components/nav/mobile/_mobile-nav-bar";

// type serverPageProps = {
//   params: Promise<{
//     nav: string|undefined
//   }>,
//   searchParams: Promise<{
//     toggle: boolean|undefined,
//   }>
// }
export default async function MainNavigation({params}){

    return (
        <>
          <Navigation/>
          <MobileNavBar/>
        </>   
    )
}