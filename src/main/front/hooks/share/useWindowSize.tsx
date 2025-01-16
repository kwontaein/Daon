import {useState, useEffect, useRef} from 'react';

interface ComponentSize {
    width: number;
    height: number;
};

export const useWindowSize = (): ComponentSize => {
    const [size, setSize] = useState<ComponentSize>({width: 0, height: 0});

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const {width, height} = entries[0].contentRect;
                setSize({width, height});
            }
        });
        observer.observe(document.body);
        
        return () => {
            observer.unobserve(document.body);
        };
    }, []);

    return size;
}