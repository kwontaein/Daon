'use client';
import Link from "next/link";
import './_aside.scss'
import {  usePathname, useRouter } from "next/navigation";
import { AsideOptions } from "@/model/constants/routes/asideOptions";
import { useEffect, useRef } from "react";
import { EnableUrlType } from "@/model/types/share/type";
import { kebabToCamel } from "@/features/share/kebabToCamel";

export default function MainAside({enableUrl} :{enableUrl: EnableUrlType}){
    const pathName = usePathname()
    const nav = pathName.split("/")[2]

    return(
        <>
        {nav &&  
            <aside className="aside-container">
                <div className="aside-header">
                    {AsideOptions[nav].asideTitle}
                </div>
                {AsideOptions[nav].asideItems.map((item)=>(
                    enableUrl[kebabToCamel(nav)][kebabToCamel(item.link)] &&
                    <li key={item.link}>
                        <b>ㆍ</b><Link href={`/main/${nav}/${item.link}`}>{item.name}</Link>
                    </li>
                ))}
            </aside>}
        </>
    )
}

