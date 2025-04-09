'use client'
import './login.scss'
import CustomTextInput from '../share/custom-text-input/page';
import { startTransition, useActionState, useCallback, useEffect, useRef, useState } from 'react';
import RememberChecked from './rememberChecked';
import loginAction from '@/features/login/actions/loginAction';

function Login() {
  const [currentId, setCurrentId] = useState<string|undefined>(undefined);
  const [state, action, isPending] = useActionState(loginAction,{})
  const formRef =useRef(null)


  const submitHandler = useCallback(() => {
    const formData = new FormData(formRef.current);
    startTransition(() => {
        action(formData);
    });
}, [action]);

  useEffect(()=>{
    const savedId = localStorage.getItem('savedId')??''
    setCurrentId(savedId)
  },[])

  useEffect(()=>{
    if(state.formErrors){
      window.alert(state.formErrors.message)
    }
  },[state])


  return (
    <div className='login-container'>
      {currentId === undefined ?
        'loading...'
        :
        <>
        <form action={action} ref={formRef}>
          <h1>로그인</h1>
          <CustomTextInput name='userId' type='text' placeholder='아이디' defaultValue={currentId} onChange={setCurrentId}/>
          <CustomTextInput name='password' type='password' placeholder='패스워드' defaultValue={state.password}/>
          <button style={{display:'none'}}></button>
        </form>
          <span>
            <RememberChecked currentId={currentId}/> 아이디 기억
          </span>
        <button onClick={submitHandler} className='login-button'>로그인</button>
       </>
      }
        
    </div>
  );
}

export default Login;
