'use client'

import { useEffect, useReducer } from "react";
import "./_mobile-nav-button.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MobileNavButton(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();


  const toggleNav = () => {
    const params = new URLSearchParams(searchParams.toString()); 
    if (params.get("toggle") === "true") {
      params.delete("toggle"); 
    } else {
      params.set("toggle", "true"); 
    }
  // 기존 pathname 유지
    router.push(`${pathname}?${params.toString()}`, { scroll: false }); 
  };

  return(
      <div className='mobile-nav-wrapper' onClick={toggleNav}>
          <div className={searchParams.get('toggle') ? 'animation' : ''}/>
          {!searchParams.get('toggle') && <div/>}
          <div className={searchParams.get('toggle') ? 'animation' : ''}/>    
      </div>
  )
} 