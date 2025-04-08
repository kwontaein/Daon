'use client'
import './login.scss'
import CustomTextInput from '../share/custom-text-input/page';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import RememberChecked from './rememberChecked';
import loginAction from '@/features/login/actions/loginAction';

function Login() {
  const [currentId, setCurrentId] = useState<string|undefined>(undefined);
  const [state, action, isPending] = useActionState(loginAction,{})

  useEffect(()=>{
    const savedId = localStorage.getItem('savedId')??''
    setCurrentId(savedId)
  },[])

  useEffect(()=>{
    if(state.userId!==undefined){
      setCurrentId(state.userId)
    }
    if(state.formErrors){
      window.alert(state.formErrors.message)
    }
  },[state])


  return (
    <div className='login-container'>
      {currentId === undefined ?
        'loading...'
        :
        <form action={action}>
          <h1>로그인</h1>
          <CustomTextInput name='userId' type='text' placeholder='아이디' defaultValue={currentId} onChange={setCurrentId}/>
          <CustomTextInput name='password' type='password' placeholder='패스워드' defaultValue={state.password}/>
          <span>
            <RememberChecked currentId={currentId}/> 아이디 기억
          </span>
          <button className='login-button'>로그인</button>
        </form>
      }
        
    </div>
  );
}

export default Login;
