import { useEffect, useReducer } from "react";
import { checkboxReducer, checkedType, initialCheckState } from "./reducer/checkboxReducer";

interface ReturnCheckBoxHook {
    checkedState: checkedType,
    update_checked: (id:string)=>void,
    toggleAllChecked: ()=>void,
    isAllChecked: boolean,
}

export default function useCheckBoxState(items:string[]):ReturnCheckBoxHook{
    const [checkedState, dispatchCheckedState] = useReducer(checkboxReducer, initialCheckState)

    const checkedItemList = Object.keys(checkedState)
    const isAllChecked = items.length>0 && checkedItemList.length === items.length
    
    const update_checked = (id:string)=>{
        dispatchCheckedState({type:'UPDATE_CHECKED_ITEMS', payload :id})
    }


    const toggleAllChecked = () =>{
        const newStore ={};
        if(isAllChecked){
            dispatchCheckedState({type:'TOGGLE_ALL_CHECKED_ITEMS', payload:{}})
        }else{
            items.map((id)=>{
                newStore[id]=true;
            })
            dispatchCheckedState({type:'TOGGLE_ALL_CHECKED_ITEMS', payload:newStore})
        }
    }


     return {checkedState, isAllChecked, update_checked, toggleAllChecked}
}