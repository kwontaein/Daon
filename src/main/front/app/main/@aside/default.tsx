import MainAside from "@/components/main/layout/aside/_aside"
import { cookies } from "next/headers";
import { notFound } from "next/navigation";



export default async function AsidePage(){
    const enable_url = (await cookies()).get('enable_url')?.value;
    if(!enable_url){
      return notFound()
    }

    return <MainAside enableUrl={JSON.parse(enable_url)}/>
}