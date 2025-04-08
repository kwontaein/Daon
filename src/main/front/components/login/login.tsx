'use client'
import './login.scss'
import CustomTextInput from '../share/custom-text-input/page';
import { useEffect, useRef, useState } from 'react';
import RememberChecked from './rememberChecked';

function Login() {
  const formRef = useRef(null);
  const [currentId, setCurrentId] = useState<string|undefined>(undefined);
  
  useEffect(() => {
    const savedId = localStorage.getItem('savedId');
    setCurrentId(savedId ?? '');
  }, []);


  return (
    <div className='login-container'>
      {currentId === undefined ?
        'loading...'
        :
        <form ref={formRef}>
          <h1>로그인</h1>
          <CustomTextInput name='id' type='text' placeholder='아이디' defaultValue={currentId} onChange={setCurrentId}/>
          <CustomTextInput name='password' type='password' placeholder='패스워드' />
          <span>
            <RememberChecked currentId={currentId} /> 아이디 기억
          </span>
          <button type='button' className='login-button'>로그인</button>
        </form>
      }
        
    </div>
  );
}

export default Login;
