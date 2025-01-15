import Link from 'next/link';
import './_navigation.scss';

export default function Navigation(){

    return(
            <nav className={'nav-container'}>
                <ul className={'nav-container__ul'}>
                    <li>
                        <b>|</b>
                        <Link href={'/main/sales/receipt'}>판매회계</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/customer/customer'}>고객관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/stock/stock'}>품목/재고</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/ledger/ledger-customer'}>원장출력</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/staff/company'}>회사/사원관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/task/task'}>업무관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/accounting/pvat'}>회계 및 거래관리</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/board/board'}>사내게시판</Link>
                        <b>|</b>
                    </li>
                    <li>
                        <Link href={'/main/schedule/schedule'}>내일정관리</Link>
                        <b>|</b>
                    </li>
                </ul>
            </nav>
    )
}