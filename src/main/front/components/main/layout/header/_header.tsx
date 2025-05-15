'use client'
import './_header.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import React, { useEffect, useMemo, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import MobileNavButton from "../nav/mobile/_mobile-nav-button";
import { useDispatch } from "react-redux";
import { stompConnect, stompDisconnect } from "@/store/slice/stomp-reducer";
import { useUserInformation } from "@/store/zustand/userInfo";
import { EmployeeClassEnum } from "@/model/types/staff/employee/type";

import dayjs from "dayjs";
import 'dayjs/locale/ko';
dayjs.locale('ko');
export default function MainHeader({userInfo}) {
    const { user, setUser, deleteUser } = useUserInformation();
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState('');
    const [formattedLastLogin, setFormattedLastLogin] = useState('');
    

      
    useEffect(() => {
        // 시간 설정
        dispatch(stompConnect());
        setCurrentTime(dayjs().format('YYYY년 M월 DD일 (ddd요일)'));
        setFormattedLastLogin(dayjs().format('YYYY-MM-DD A HH:mm:ss'));
        // 유저 정보 세팅
        if (userInfo) {
            setUser(userInfo);
        } else {
            deleteUser();
        }

        return () => {
            dispatch(stompDisconnect());
        };
    }, []);

    return (
        <section className="header-container">
            {user&&
            <>
            <span className="header-content left">
                <p>{currentTime}</p>
                <b className="header-depart">{`${user?.deptName ?? ''} ${user?.name ? '/':''} ${user?.name ?? ''} ${EmployeeClassEnum[user.userClass] ?? ''}`}</b>
            </span>
            <span className="header-content right">
                <p className="header-lastOnline">
                    최종접속일시 : {formattedLastLogin}
                </p>
                <button className="logout-button">
                    <FontAwesomeIcon icon={faPowerOff} style={{ width: '1.2rem' }} />
                    로그아웃
                </button>
            </span>
            </>
            }
            <MobileNavButton />
        </section>
    );
}