import Navigation from "@/components/main/layout/nav/_navigation";
import MobileNavBar from "@/components/main/layout/nav/mobile/_mobile-nav-bar";

export default async function MainNavigation(){

    return (
        <>
          <Navigation/>
          <MobileNavBar/>
        </>   
    )
}