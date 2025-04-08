import { useCallback, useEffect, useRef } from "react";

function useDebounce() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    const debounce = useCallback((fn: () => void, delay: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(fn, delay);
    }, []);
  
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);
  
    return debounce;
}

export default useDebounce
