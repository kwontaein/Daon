import { useSearchParams,useRouter,usePathname } from "next/navigation";

export default function useRouterPath(){
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    return (route)=>{
        const params = new URLSearchParams(searchParams.toString()); 
        if(pathname.includes(route)) return
        router.push(`${pathname}/${route}?${params.toString()}`); 
    }

}