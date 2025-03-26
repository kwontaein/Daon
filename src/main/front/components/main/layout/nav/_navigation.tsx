import Link from 'next/link';
import './_navigation.scss';
import { AsideOptions } from '@/model/constants/asideOptions';

export default function Navigation(){
    const navigation_route = Object.entries(AsideOptions)
    return(
            <nav className={'nav-container'}>
                <ul className={'nav-container__ul'}>
                    
                    {navigation_route.map(([currentNav, {asideTitle,asideItems}],index)=>(
                        <li key={currentNav}>
                            {index===0 && <b>|</b>}
                            <Link href={`/main/${currentNav}/${asideItems[0].link}`}>{asideTitle}</Link>
                            <b>|</b>
                        </li>
                    ))}
                </ul>
            </nav>
    )
}