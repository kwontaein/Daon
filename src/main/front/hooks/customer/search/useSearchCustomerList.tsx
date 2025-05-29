import { selectConfrim } from "@/hooks/share/selectConfrim";
import useRouterPath from "@/hooks/share/useRouterPath";
import { ResponseCustomer } from "@/model/types/customer/customer/type";
import { useModalState } from "@/store/zustand/modal";
import { useEffect, useId, useState } from "react";

export default function useSearchCustomerList(
    checkCustomerName : () => boolean,
    changeHandler : (customerInfo : Partial<Pick<ResponseCustomer, 'customerName' | 'customerId'>[]>,uuid?: string) => void
) {
    
    const {customerList, setModalState} = useModalState()
    const searchKey = useId()
    const redirect = useRouterPath()
    //검색을 위한 이벤트등록
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data) {
                const { customerArr } = event.data;

                if(customerArr&& customerArr.length>0){
                    changeHandler(customerArr)
                }
            }
        };
        window.removeEventListener("message", handleMessage);
        window.addEventListener("message", handleMessage);  

        return () => window.removeEventListener("message", handleMessage);
    }, []);


    useEffect(()=>{
        
        if(customerList.length>0){
            changeHandler(customerList)
            setModalState({searchKeyword:'', customerList:[],modalPage:1})
        }
    },[customerList])


    const searchCustomerHandler = (e)=>{
        //거래처를 찾고나서 수정 시도 시
        const isSpecialKey = ['Backspace', 'Delete', 'Process'].includes(e.key);

        if(checkCustomerName() && isSpecialKey){
            e.preventDefault();
            const deleteCustomer = ()=>{
                changeHandler([])
            }
            selectConfrim('거래처를 다시 선택하시겠습니까?',deleteCustomer)
            return
        }
        const value =e.target.value

        //Enter 외의 다른 키 입력 시
        if(!value || e.key !=='Enter') return
        e.preventDefault();
        //pc
        if(window.innerWidth>620){
            const url = `/search-customer-list?searchName=${value}`; // 열고 싶은 링크
            const popupOptions = "width=500,height=750,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "searchCustomerList", popupOptions);
        }else{
            setModalState({searchKeyword:value,modalPage:1,modalKey:searchKey})
            redirect('search-customer-list')
        }

    }

    return searchCustomerHandler
    
}