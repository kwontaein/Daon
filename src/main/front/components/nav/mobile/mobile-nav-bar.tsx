import Link from "next/link";
import '@/components/nav/mobile/mobile-nav-bar.scss';

export default function MobileNavBar(){
    return(
        <div className='nav-mobile-container'>
            <ul className={'nav-mobile-wrapper'}>
                    <li>
                        <Link href={'/main/?nav=sales'}>판매회계</Link>
                    </li>
                    <li>
                        <Link href={'/main/?nav=customer'}>고객관리</Link>
                    </li>
                    <li>
                        <Link href={'/main/?nav=stock'}>품목/재고</Link>
                    </li>
                    <li>
                        <Link href={'/main/?nav=ledger'}>원장출력</Link>
                    </li>
                    <li>
                        <Link href={'/main/?nav=staff'}>회사/사원관리</Link>
                    </li>
                    <li>
                        <Link href={'/main/?nav=task'}>업무관리</Link>
                    </li>
                    <li>
                        <Link href={'/main/?nav=accounting'}>회계 및 거래관리</Link>
                    </li>
                    <li>
                        <Link href={'/main/?nav=board'}>사내게시판</Link>
                    </li>
                    <li>
                        <Link href={'/main/?nav=schedule'}>내일정관리</Link>
                    </li>
            </ul>
            <button className={'logout-button'}>
                로그아웃
            </button>
        </div>
    )
}