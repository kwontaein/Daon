'use client'
import React, { useEffect } from "react";
import './_header.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import MobileNavButton from "../nav/mobile/_mobile-nav-button";
import { useDispatch } from "react-redux";
import { stompConnect, stompDisconnect } from "@/store/slice/stomp-reducer";


export default function MainHeader(){
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(stompConnect())

        return ()=>{
            dispatch(stompDisconnect())
        }
    },[])
    
    return (
        <section className="header-container">
            <span className="header-content left">
                <p>2024년 12월 30일 (월요일)</p>
                <b className="header-depart"> 웹관리팀 / 강승재 사원</b>
            </span>
            <span className="header-content right">
                <p className="header-lastOnline">최종접속일시 : 2024-12-27 PM 17:08:48</p>
                
                <button className="logout-button">
                    <FontAwesomeIcon icon={faPowerOff} style={{width:'1.2rem'}}/>로그아웃
                </button>
            </span>
            <MobileNavButton/>
        </section>
    )
}