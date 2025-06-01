import MainAside from "@/components/main/layout/aside/_aside"
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import CryptoJS from "crypto-js";

const key = process.env.VITE_AES_SECRET;

export default async function AsidePage(){
  const enable_url = (await cookies()).get('enable_url')?.value;
  const decrypted = JSON.parse(CryptoJS.AES.decrypt(enable_url.slice(4), key).toString(CryptoJS.enc.Utf8));

  if(!decrypted){
    return notFound()
  }

  return <MainAside enableUrl={decrypted}/>
}