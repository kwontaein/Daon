'use client'
import React from "react";
import './_header.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import MobileNavButton from "../nav/mobile/_mobile-nav-button";


export default function MainHeader(){
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