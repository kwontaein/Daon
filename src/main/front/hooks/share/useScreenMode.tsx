import { useEffect, useState } from "react";

type ComponentMode = 'pc'|'tabelt' | 'mobile'

export const useScreenMode = ({tabletSize, mobileSize} : {
    tabletSize: number,
    mobileSize: number
}): ComponentMode => {
    const [mode, setMode] = useState<ComponentMode>();

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const {width, height} = entries[0].contentRect;
                if(width>tabletSize){
                    setMode('pc')
                }else if(width>mobileSize){
                    setMode('tabelt')
                }else{
                    setMode('mobile')
                }
            }
        });
        observer.observe(document.body);
        
        return () => {
            observer.unobserve(document.body);
        };
    }, []);

    return mode;
}