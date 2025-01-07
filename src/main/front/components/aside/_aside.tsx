'use client';
import { AsideOptions } from "@/app/actions/asideOptions";
import Link from "next/link";
import './_aside.scss'
import { usePathname } from "next/navigation";

export default function MainAside(){
    const pathname = usePathname();
    const nav = pathname.split('/')[2] || 'schedule'

    return(
        <aside className="aside-container">
            <div className="aside-header">
                {AsideOptions[nav].asideTitle}
            </div>
            {AsideOptions[nav].asideItems.map((item)=>(
                <li key={item.link}>
                    <b>ㆍ</b><Link href={``}>{item.name}</Link>
                </li>
            ))}
        </aside>
    )
}

