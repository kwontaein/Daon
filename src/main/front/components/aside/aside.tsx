import { AsideOptions } from "@/app/actions/asideOptions";
import Link from "next/link";
import './aside.scss'

export default function MainAside({nav}){
    
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

