'use client'
import Link from "next/link";
import '@/components/nav/mobile/_mobile-nav-bar.scss';

import { usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

export default function MobileNavBar(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const nav = pathname.split('/')[2] || 'schedule'
    

    return(
         <div className={`nav-mobile-container ${searchParams.get('toggle') && 'slide'}`}>
            <ul className={'nav-mobile-wrapper'}>
                    <li className={nav === 'sales' ? 'hover' : ''}> 
                        <Link href={'/main/sales?toggle=true'}>판매회계</Link>
                    </li>
                    <li className={nav === 'customer' ? 'hover' : ''}>
                        <Link href={'/main/customer?toggle=true'}>고객관리</Link>
                    </li>
                    <li className={nav === 'stock' ? 'hover' : ''}>
                        <Link href={'/main/stock?toggle=true'}>품목/재고</Link>
                    </li>
                    <li className={nav === 'ledger' ? 'hover' : ''}>
                        <Link href={'/main/ledger?toggle=true'}>원장출력</Link>
                    </li>
                    <li className={nav === 'staff' ? 'hover' : ''}>
                        <Link href={'/main/staff?toggle=true'}>회사/사원관리</Link>
                    </li>
                    <li className={nav === 'task' ? 'hover' : ''}>
                        <Link href={'/main/task?toggle=true'}>업무관리</Link>
                    </li>
                    <li className={nav === 'accounting' ? 'hover' : ''}>
                        <Link href={'/main/accounting?toggle=true'}>회계 및 거래관리</Link>
                    </li>
                    <li className={nav === 'board' ? 'hover' : ''}>
                        <Link href={'/main/board?toggle=true'}>사내게시판</Link>
                    </li>
                    <li className={nav === 'schedule' ? 'hover' : ''}>
                        <Link href={'/main/schedule?toggle=true'}>내일정관리</Link>
                    </li>
            </ul>
            <button className={'mobile-logout-button'}>
                <FontAwesomeIcon icon={faPowerOff} style={{width:'1.2rem'}}/>로그아웃
            </button>
        </div>
       
    )
}