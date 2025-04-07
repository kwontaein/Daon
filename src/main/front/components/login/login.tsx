'use client'
import { useState } from 'react';
import './login.scss'
import CustomTextInput from '../share/custom-text-input/page';
function Login(){
    const [value, setValue] = useState('');

    return(
        <div className='login-container'>
            <h1>로그인</h1>
            <CustomTextInput name='id' type='text' placeholder='아이디'/>
            <CustomTextInput name='password' type='password' placeholder='패스워드'/>
            <span>
                <input type='checkbox'/> 아이디 기억
            </span>
            <button className='login-button'>로그인</button>
        </div>
    )
}

export default Login;