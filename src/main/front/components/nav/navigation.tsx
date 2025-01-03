import Link from 'next/link';
import './navigation.scss';
import MainHeader from './header';

export default function Navigation(){

    return(
        <>
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