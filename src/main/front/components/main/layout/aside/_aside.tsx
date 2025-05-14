'use client';
import Link from "next/link";
import './_aside.scss'
import { notFound, usePathname, useRouter } from "next/navigation";
import { AsideOptions } from "@/model/constants/routes/asideOptions";
import { useEffect, useRef } from "react";

export default function MainAside(){
    const pathName = usePathname()
    const nav = pathName.split("/")[2]
    const router = useRouter();

    const cacheRouteRef = useRef<Record<string, Record<string, boolean>>>({});

    useEffect(() => {
        if (!nav) {
            router.replace("/main/schedule/schedule");
            return;
        }
        const { asideItems } = AsideOptions[nav];
        const subNav = pathName.split("/")[3];
        //nav에 대한 객체 초기화
        if (!cacheRouteRef.current[nav]) {
            cacheRouteRef.current[nav] = {};
        }
        // 이미 허용된 경로라면 리턴
        if (cacheRouteRef.current[nav][subNav]) {
            return;
        }
        const isAbleRoute = asideItems.some(({ link }) => link === subNav);

        if (!isAbleRoute) {
            router.replace(`/main/${nav}/${asideItems[0].link}`);
        } else {
            cacheRouteRef.current[nav][subNav] = true;
        }
    }, [nav]);

    return(
        <>
        {nav &&  
            <aside className="aside-container">
                <div className="aside-header">
                    {AsideOptions[nav ?? 'schedule'].asideTitle}
                </div>
                {AsideOptions[nav].asideItems.map((item)=>(
                    <li key={item.link}>
                        <b>ㆍ</b><Link href={`/main/${nav}/${item.link}`}>{item.name}</Link>
                    </li>
                ))}
            </aside>}
        </>
    )
}

