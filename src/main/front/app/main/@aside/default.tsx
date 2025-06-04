import MainAside from "@/components/main/layout/aside/_aside"
import { decrypt } from "@/features/share/crypto";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AsidePage(){
  try{
    const enable_url = (await cookies()).get('enable_url')?.value;
    const enableUrl = JSON.parse(await decrypt(enable_url));
  
    if(!enableUrl){
      return notFound()
    }
    return <MainAside enableUrl={enableUrl}/>
  }catch(e){
    throw new Error('접근 권한이 없습니다.')
  }
}