'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export type paramsType = 'set'|'delete'|'get'| 'append'

export const useRedirect = (property:paramsType, searchParamsList:Record<string,string>[])=>{
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const params = new URLSearchParams(searchParams.toString());
    searchParamsList.forEach((searchParamItem:Record<string,string>)=>{
        const [key,value] = Object.entries(searchParamItem).at(-1)
        params[property](key, value);
    })
    // 기존 pathname 유지
    router.push(`${pathname}?${params.toString()}`);
}