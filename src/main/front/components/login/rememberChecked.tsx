import useDebounce from "@/hooks/share/useDebounce";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

function RememberChecked({currentId}){
    const [remember, setRemember] = useState(false);
    const timeOutRef = useRef(null)
    const debouncing = useDebounce()  
    
    useEffect(() => {
      const savedId = localStorage.getItem('savedId');
      setRemember(!!savedId);
    }, []);
    
    useEffect(()=>{
      if(remember){
        debouncing(()=>{
          localStorage.setItem('savedId', currentId);
          console.log('저장실행')
        },1000)

      }
    },[currentId])
  
    const rememberUserId = (e:ChangeEvent<HTMLInputElement>) => {
      if (remember) {
          localStorage.removeItem('savedId');
          setRemember(false)
        } else {
            localStorage.setItem('savedId', currentId);
            setRemember(true)
      }
      // 로그인 로직 실행
    };  


    return <input type='checkbox' checked={remember} onChange={rememberUserId}/> 

}
export default RememberChecked