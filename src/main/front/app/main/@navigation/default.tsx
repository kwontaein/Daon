import Navigation from "@/components/main/layout/nav/_navigation";
import MobileNavBar from "@/components/main/layout/nav/mobile/_mobile-nav-bar";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function MainNavigation(){
    const enable_url = (await cookies()).get('enable_url')?.value;
    if(!enable_url){
      return notFound()
    }

    return (
        <>
          <Navigation enableUrl={JSON.parse(enable_url)}/>
          <MobileNavBar enableUrl={JSON.parse(enable_url)}/>
        </>   
    )
}