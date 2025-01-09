import {useEffect, useRef, useState} from "react";

 //dropDown Items를 관리하는 hooks
 //view 는 현재 보고있는 컴포넌트 및 페이지, 페이지가 달라지면 아이템 셀렉터 해제
export const useItemSelection = (view:string, addEvent:boolean)=>{
    const [target, setTarget] = useState(null);
    const itemsRef = useRef({});

    useEffect(()=>{
        setTarget(null)
    },[view])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (itemsRef.current[target] && !itemsRef.current[target].contains(e.target)) {
                setTarget(null);
            }
        };
        const scrollObserver = ()=>{
            setTarget(null)
        }
        if(addEvent){
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', scrollObserver,true);
            if (target===null) {
                document.removeEventListener('mousedown', handleClickOutside);
                window.removeEventListener('scroll', scrollObserver,true);
            }
            return ()=>{
                document.removeEventListener('mousedown', handleClickOutside);
                window.removeEventListener('scroll', scrollObserver,true);
            }
        }
    }, [itemsRef, target, view]);


    return {itemsRef, target, setTarget}
}