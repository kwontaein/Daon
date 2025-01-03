'use client'
import { useReducer } from "react";
import "./mobile-nav-button.scss";
import { useRouter } from "next/router";

export default function MobileNavButton(){
    const [showNavList, setShowNavList] = useReducer((prev)=>!prev,false)
    const router = useRouter()

    const navigationHandler = ()=>{
        setShowNavList()
        if(showNavList){
    
        }else{

        }
    }

    return(
        <div className='mobile-nav-wrapper' onClick={navigationHandler}>
            <div className={showNavList ? 'animation' : ''}/>
            {!showNavList && <div/>}
            <div className={showNavList ? 'animation' : ''}/>    
        </div>
    )
} 