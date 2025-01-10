'use client'
import Link from "next/link";
import '@/components/nav/mobile/_mobile-nav-bar.scss';

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faArrowRight} from "@fortawesome/free-solid-svg-icons";

import { useWindowSize } from "@/hooks/useWindowSize";
import MobileAsideBar from "@/components/aside/mobile/_mobile-aside";

export default function MobileNavBar(){
    /* route information */
    const searchParams = useSearchParams();
    let nav = useParams().nav as string;
    /* mount component condition*/
    const size = useWindowSize()
    const [isMount, setIsMount] = useState<boolean>(false);
    
    useEffect(()=>{
        if(size.width<620){
            setTimeout(()=>{
                setIsMount(true);
            },200)
        }else{
            setIsMount(false);
        }
    },[size.width])

    return(
        /*when toggle is true show mobile navigation, else check mount state because to prevent animation when the window is resized */
         <nav className={`nav-mobile-container ${searchParams.get('toggle') ? `slide` : !isMount && 'opacity'}`}>
            <section className={'nav-mobile-wrapper'}>
                <ul className={'nav-mobile-ul'}>
                        <li className={nav === 'sales' ? 'hover' : ''}> 
                            <Link href={'/main/sales/receipt?toggle=true'}>판매회계</Link>
                        </li>
                        <li className={nav === 'customer' ? 'hover' : ''}>
                            <Link href={'/main/customer/customer?toggle=true'}>고객관리</Link>
                        </li>
                        <li className={nav === 'stock' ? 'hover' : ''}>
                            <Link href={'/main/ stock/stock?toggle=true'}>품목/재고</Link>
                        </li>
                        <li className={nav === 'ledger' ? 'hover' : ''}>
                            <Link href={'/main/ledger/ledger-customer?toggle=true'}>원장출력</Link>
                        </li>
                        <li className={nav === 'staff' ? 'hover' : ''}>
                            <Link href={'/main/staff/company?toggle=true'}>회사/사원관리</Link>
                        </li>
                        <li className={nav === 'task' ? 'hover' : ''}>
                            <Link href={'/main/task/task?toggle=true'}>업무관리</Link>
                        </li>
                        <li className={nav === 'accounting' ? 'hover' : ''}>
                            <Link href={'/main/accounting/pvat?toggle=true'}>회계 및 거래관리</Link>
                        </li>
                        <li className={nav === 'board' ? 'hover' : ''}>
                            <Link href={'/main/board/board?toggle=true'}>사내게시판</Link>
                        </li>
                        <li className={nav === 'schedule' ? 'hover' : ''}>
                            <Link href={'/main/schedule/schedule?toggle=true'}>내일정관리</Link>
                        </li>
                </ul>
                <button className={'mobile-logout-button'}>
                    <FontAwesomeIcon icon={faPowerOff} style={{width:'1.2rem'}}/>로그아웃
                </button>
            </section>
            <MobileAsideBar nav={nav||'schedule'}/>
        </nav>
    )
}