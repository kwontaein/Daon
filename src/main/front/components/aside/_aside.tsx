'use client';
import Link from "next/link";
import './_aside.scss'
import { notFound, useParams, useRouter } from "next/navigation";
import { AsideOptions } from "@/constants/asideOptions";
import { useEffect } from "react";

export default function MainAside(){
    const nav = useParams().nav as string;
    const router = useRouter();
    const navKeys = Object.keys(AsideOptions);
  
    useEffect(() => {
        if (!nav) {
            router.push("/main/schedule/schedule");
        }else{
            if(!navKeys.includes(nav)){
                return notFound()
            }
        }
    }, [nav, router]);

    return(
        <aside className="aside-container">
            <div className="aside-header">
                {AsideOptions[nav|| 'schedule'].asideTitle}
            </div>
            {AsideOptions[nav || 'schedule'].asideItems.map((item)=>(
                <li key={item.link}>
                    <b>ㆍ</b><Link href={`/main/${nav}/${item.link}`}>{item.name}</Link>
                </li>
            ))}
        </aside>
    )
}

