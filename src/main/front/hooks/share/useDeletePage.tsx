import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useDeletePage(){
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    return ()=>{
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        router.push(`${pathname}?${params.toString()}`);
    }
}