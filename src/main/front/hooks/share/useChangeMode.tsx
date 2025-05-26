import { useSearchParams,useRouter,usePathname } from "next/navigation";

export default function useChangeMode(){
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    return (mode)=>{
        const params = new URLSearchParams(searchParams.toString()); 
        params.set("mode", mode); 
        console.log(`${pathname}?${params.toString()}`)
        router.push(`${pathname}?${params.toString()}`); 
    }

}