import { useSearchParams,useRouter,usePathname } from "next/navigation";

export default function useRouterPath(){
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    return (route)=>{
        const params = new URLSearchParams(searchParams.toString()); 
        router.push(`${pathname}/${route}?${params.toString()}`); 
    }

}