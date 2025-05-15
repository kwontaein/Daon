import Link from 'next/link';
import './_navigation.scss';
import { AsideOptions } from '@/model/constants/routes/asideOptions';
import { kebabToCamel } from '@/features/share/kebabToCamel';
import { EnableUrlType } from '@/model/types/share/type';

export default function Navigation({enableUrl} :{enableUrl: EnableUrlType}){
    const navigation_route = Object.entries(AsideOptions)
    return(
            <nav className='nav-container'>
                <ul className='nav-container__ul'>
                    
                    {navigation_route.map(([currentNav, {asideTitle,asideItems}],index)=>(
                        Object.values(enableUrl[kebabToCamel(currentNav)]).includes(true) &&
                        <li key={currentNav}>
                            <b>|</b>
                            <Link href={`/main/${currentNav}/${asideItems[0].link}`}>{asideTitle}</Link>
                            {index===navigation_route.length-1 && <b>|</b>}
                        </li>
                    ))}
                </ul>
            </nav>
    )
}