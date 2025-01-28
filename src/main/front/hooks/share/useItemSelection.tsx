import {useEffect, useRef, useState} from "react";

 //dropDown Items를 관리하는 hooks
 //view 는 현재 보고있는 컴포넌트 및 페이지, 페이지가 달라지면 아이템 셀렉터 해제
 export function useItemSelection<T>(addEvent: boolean, view?: string) {
    const [target, setTarget] = useState<T | null>(null);
    const itemsRef = useRef<Record<string, HTMLElement | null>>({}); 

    useEffect(() => {
        setTarget(null);
    }, [view]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const currentTarget = target !== null ? itemsRef.current[target as unknown as string] : null;
            if (currentTarget && !currentTarget.contains(e.target as Node)) {
                setTarget(null);
                console.log('삭제')
            }
        };

        const scrollObserver = () => {
            setTarget(null);
        };

        if (addEvent) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', scrollObserver, true);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                window.removeEventListener('scroll', scrollObserver, true);
            };
        }
    }, [itemsRef, target, view, addEvent]);

    return { itemsRef, target, setTarget };
}
