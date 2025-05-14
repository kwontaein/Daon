import { useCallback, useEffect, useMemo, useReducer } from "react";
import { checkboxReducer, checkedType } from "./reducer/checkboxReducer";

export interface ReturnCheckBoxHook {
    checkedState: checkedType,
    update_checked: (id:string)=>void,
    toggleAllChecked: ()=>void,
    resetChecked:()=>void,
    isAllChecked: boolean,
}

export default function useCheckBoxState(items:string[],pageReset:boolean =false, initialCheckState?:Record<string,boolean>[]):ReturnCheckBoxHook{
    const [checkedState, dispatchCheckedState] = useReducer(checkboxReducer, initialCheckState??{})
    
    const isAllChecked = useMemo(() => {
        if (items.length === 0) return false;
        return items.every((id) => checkedState[id]);
      }, [items, checkedState]);

    const update_checked = useCallback((id: string) => {
        dispatchCheckedState({ type: "UPDATE_CHECKED_ITEMS", payload: id });
    }, []);

    useEffect(()=>{
        if(!pageReset) return
        resetChecked()
    },[items])
    
    const toggleAllChecked = useCallback(() =>{
        let updatedStore ={};
        if(isAllChecked){
            updatedStore = Object.keys(checkedState).reduce((prev,key)=>{
                // 해제: items 목록만 false로 만들고, 나머지는 유지
                if(!items.includes(key)) prev[key] = true;
                
                return prev;
            },{} as Record<string, boolean>)
        }else{
            updatedStore = { ...checkedState };
            items.forEach((id) => {
                updatedStore[id] = true;
            });
        }
        dispatchCheckedState({type:'TOGGLE_ALL_CHECKED_ITEMS', payload:updatedStore})
    },[isAllChecked, items, checkedState]);


    const resetChecked = useCallback(() => {
        dispatchCheckedState({ type: "TOGGLE_ALL_CHECKED_ITEMS", payload: {} });
    }, []);

     return {checkedState, isAllChecked, update_checked, resetChecked, toggleAllChecked}
}