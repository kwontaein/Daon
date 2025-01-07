'use client'

import { useEffect, useReducer } from "react";
import "./_mobile-nav-button.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MobileNavButton(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showNavList,toggleShowNavList] = useReducer((prev)=>!prev, !!searchParams.get('toggle'));
    const pathname = usePathname();


    const navigationHandler = () => {
      if(!showNavList){
        router.push(`?toggle=true`);
      }else{
        router.push(`${pathname}`)
      }
      toggleShowNavList()
    };

    return(
        <div className='mobile-nav-wrapper' onClick={navigationHandler}>
            <div className={showNavList ? 'animation' : ''}/>
            {!showNavList && <div/>}
            <div className={showNavList ? 'animation' : ''}/>    
        </div>
    )
} 