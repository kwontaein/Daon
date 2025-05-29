import useDebounce from "@/hooks/share/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";
function RememberChecked({ currentId }: { currentId: string }) {
  const [isChecked, setIsChecked] = useState(()=>false);
  const debouncing = useDebounce();

  // mount 시 localStorage 확인
  useEffect(() => {
    const savedId = localStorage.getItem('savedId');
    setIsChecked(!!savedId);
  },[]);

  // currentId 변경 시 remember가 true일 경우에만 저장
  useEffect(() => {
    if (isChecked) {
      debouncing(() => {
        localStorage.setItem('savedId', currentId);
      }, 300);
    }
  }, [currentId, isChecked, debouncing]);

  const rememberUserId = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    
    if (!checked) {
      localStorage.removeItem('savedId');
    } else {
      localStorage.setItem('savedId', currentId);
    }
  };


  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={rememberUserId}
      name="remember"
    />
  );
}

export default RememberChecked