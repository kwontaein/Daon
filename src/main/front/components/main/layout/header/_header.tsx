'use client'
import './_header.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import MobileNavButton from "../nav/mobile/_mobile-nav-button";
import { useDispatch } from "react-redux";
import { stompConnect, stompDisconnect } from "@/store/slice/stomp-reducer";
import { getUserInfo } from "@/features/login/api/loginApi";
import { useUserInformation } from "@/store/zustand/userInfo";
import { EmployeeClassEnum } from "@/model/types/staff/employee/type";

import dayjs from "dayjs";
import 'dayjs/locale/ko';
dayjs.locale('ko');
export default function MainHeader() {
    const [currentTime, setCurrentTime] = useState('');
    const { user, setUser, deleteUser } = useUserInformation();
    const dispatch = useDispatch();

    useEffect(() => {
        // 시간 설정
        const now = dayjs().format('YYYY년 M월 DD일 (ddd요일)');
        setCurrentTime(now);

        dispatch(stompConnect());
        
        // 유저 정보 요청
        const fetchUser = async () => {
            const userInfo = await getUserInfo();
            if (userInfo) {
                const user = {
                    userId: userInfo.userId,
                    userName: userInfo.name,
                    class: userInfo.userClass,
                    role: userInfo.uerRole,
                    last_login: new Date(Date.now()),
                    dept_Id: userInfo.dept.deptId,
                    deptName: userInfo.dept.deptName,
                };
                setUser(user);
            } else {
                deleteUser();
                document.location.replace('/');
            }
        };

        fetchUser();
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
                <b className="header-depart">{`${user?.deptName ?? ''} ${user?.userName ? '/':''} ${user?.userName ?? ''} ${EmployeeClassEnum[user.class] ?? ''}`}</b>
            </span>
            <span className="header-content right">
                <p className="header-lastOnline">
                    최종접속일시 : {user?.last_login ? dayjs(user.last_login).format('YYYY-MM-DD A HH:mm:ss') : ''}
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