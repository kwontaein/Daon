'use client'
import Link from 'next/link';
import { useEffect, useState , useRef} from 'react';
import './navigation.scss';
import MainHeader from './header';

export default function Navigation(){
    const [screenMode, setScreenMode] = useState<string>("pc");
    const [showNavList, setShowNavList] = useState<boolean>(false)
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleResize = ()=>{
            let state = window.innerWidth > 880 ? "pc" : window.innerWidth > 420 ? "tablet" : "mobile"
            setScreenMode(state)
        }
        window.addEventListener("resize", handleResize);

        handleResize(); // 처음 로드 시에도 창 크기 체크

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return(
        <>
            <MainHeader/>
            <nav className={'nav-container'}>
                <ul className={'nav-container__ul'}>
                    <li>
                        <b>|</b>
                        <Link href={'/main/?nav=sales'}>판매회계</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/?nav=customer'}>고객관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/?nav=stock'}>품목/재고</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/?nav=ledger'}>원장출력</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/?nav=staff'}>회사/사원관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/?nav=task'}>업무관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/?nav=accounting'}>회계 및 거래관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/?nav=board'}>사내게시판</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/?nav=schedule'}>내일정관리</Link>
                        <b>|</b>
                    </li>
                </ul>
            </nav>
        </>

    )
}