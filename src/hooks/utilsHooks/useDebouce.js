import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
  
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
  
        return () => {
          clearTimeout(handler);
        };
    },[value, delay])
    
    return debouncedValue;
}

export const debonce = (callback, delay)=>{
    let timer;
    return (value)=>{
  
      clearTimeout(timer)
      timer = setTimeout(()=>{
        
        callback(value)
      },delay)
      
    }
    
  }