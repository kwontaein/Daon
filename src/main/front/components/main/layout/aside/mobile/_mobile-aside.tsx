import { AsideOptions } from "@/model/constants/routes/asideOptions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import './_mobile-aside.scss';

export default function MobileAsideBar({nav}){

    return(
        <section className={'aside-mobile-wrapper'}>
            <div className={'aside-mobile-title'}>
                <b>ㆍ</b> {AsideOptions[nav?? 'schedule'].asideTitle}
            </div>
            <ul className={'aside-mobile-ul'}>
            {AsideOptions[nav ?? 'schedule'].asideItems.map((item)=>(
                <li key={item.link}>
                    <Link href={`/main/${nav}/${item.link}`}>{item.name}</Link>
                    <FontAwesomeIcon icon={faArrowRight} className='aside-arrow'/>
                </li>
                ))}
            </ul>
        </section>
    )
}
