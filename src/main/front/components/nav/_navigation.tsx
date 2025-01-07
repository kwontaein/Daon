import Link from 'next/link';
import './_navigation.scss';

export default function Navigation(){

    return(
            <nav className={'nav-container'}>
                <ul className={'nav-container__ul'}>
                    <li>
                        <b>|</b>
                        <Link href={'/main/sales'}>판매회계</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/customer'}>고객관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/stock'}>품목/재고</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/ledger'}>원장출력</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/staff'}>회사/사원관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/task'}>업무관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/accounting'}>회계 및 거래관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/board'}>사내게시판</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/schedule'}>내일정관리</Link>
                        <b>|</b>
                    </li>
                </ul>
            </nav>
    )
}