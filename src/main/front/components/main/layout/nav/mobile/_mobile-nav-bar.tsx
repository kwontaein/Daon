'use client'
import Link from "next/link";
import '@/components/main/layout/nav/mobile/_mobile-nav-bar.scss';
import '@/styles/_global.scss';

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

import MobileAsideBar from "@/components/main/layout/aside/mobile/_mobile-aside";
import { AsideOptions } from "@/model/constants/routes/asideOptions";
import { useScreenMode } from "@/hooks/share/useScreenMode";
import { EnableUrlType } from "@/model/types/staff/employee/type";
import { kebabToCamel } from "@/features/share/kebabToCamel";

export default function MobileNavBar({enableUrl} :{enableUrl: EnableUrlType}){
    const navigation_route = Object.entries(AsideOptions)


    /* route information */
    const searchParams = useSearchParams();
    const nav = useParams().nav as string;
    /* mount component condition*/
    const mode = useScreenMode({tabletSize:900,mobileSize:620})
    const [isMount, setIsMount] = useState<boolean>(false);
    const [mobile, setMobile] = useState<boolean>(false);
    
    useEffect(()=>{
        if(mode==='mobile'){
            setTimeout(()=>{
                setIsMount(true);
            },200)
            setMobile(true);
        }else{
            setIsMount(false);
            setMobile(false);
        }
    },[mode])

    useEffect(()=>{
        if(searchParams.get('toggle')){
            // document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }
    },[searchParams])
    return(
        <>
        {(searchParams.get('toggle') && mobile) && <div className='modal-background'/>}
            {/*when toggle is true show mobile navigation, else check mount state because to prevent animation when the window is resized */}         
            <nav className={`nav-mobile-container ${searchParams.get('toggle') ? `slide` : !isMount && 'opacity'}`}>
            <section className='nav-mobile-wrapper'>
                <ul className='nav-mobile-ul'>
                    {navigation_route.map(([currentNav, {asideTitle,asideItems}])=>(
                        Object.values(enableUrl[kebabToCamel(currentNav)]).includes(true) &&
                        <li className={nav === currentNav ? 'hover' : ''} key={currentNav}>
                            <Link href={`/main/${currentNav}/${asideItems[0].link}?toggle=true`}>{asideTitle}</Link>
                        </li>
                    ))}
                </ul>
                <button className={'mobile-logout-button'}>
                    <FontAwesomeIcon icon={faPowerOff} style={{width:'1.2rem'}}/>로그아웃
                </button>
            </section>
            <MobileAsideBar nav={nav||'schedule'} enableUrl={enableUrl}/>
        </nav>
        </>
    )
}