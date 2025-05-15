import { AsideOptions } from "@/model/constants/routes/asideOptions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import './_mobile-aside.scss';
import { kebabToCamel } from "@/features/share/kebabToCamel";
import { EnableUrlType } from "@/model/types/share/type";

export default function MobileAsideBar({enableUrl, nav} :{enableUrl: EnableUrlType, nav: string}){

    return(
        <section className={'aside-mobile-wrapper'}>
            <div className={'aside-mobile-title'}>
                <b>ㆍ</b> {AsideOptions[nav].asideTitle}
            </div>
            <ul className={'aside-mobile-ul'}>
            {AsideOptions[kebabToCamel(nav)].asideItems.map((item)=>(
                enableUrl[kebabToCamel(nav)][kebabToCamel(item.link)] &&
                <li key={item.link}>
                    <Link href={`/main/${nav}/${item.link}`}>{item.name}</Link>
                    <FontAwesomeIcon icon={faArrowRight} className='aside-arrow'/>
                </li>
                ))}
            </ul>
        </section>
    )
}
