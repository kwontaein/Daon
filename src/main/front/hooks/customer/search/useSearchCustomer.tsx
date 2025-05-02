import { useConfirm } from "@/hooks/share/useConfirm";
import useRouterPath from "@/hooks/share/useRouterPath";
import { apiUrl } from "@/model/constants/apiUrl";
import { ResponseCustomer } from "@/model/types/customer/customer/type";
import { useModalState } from "@/store/zustand/modal";
import { useEffect, useId, useRef, useState } from "react";

export default function useSearchCustomer(
    checkCustomerName : (id? : string) => boolean,
    changeHandler : (customerInfo : Partial<ResponseCustomer>,uuid?: string) => void
) {
    const [target, setTarget] = useState('') 
    const redirect = useRouterPath()
    const searchKey = useId()
    const {setModalState, customer,modalKey} = useModalState()
    //검색을 위한 이벤트등록
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data) {
                const { customerName, customerId} = event.data;
                if(customerName && customerId){
                    changeHandler({...event.data} , target)
                }
            }
        };
        window.removeEventListener("message", handleMessage);
        window.addEventListener("message", handleMessage);  
        
        return () => window.removeEventListener("message", handleMessage);
    }, [target]);
    

    useEffect(()=>{
        const {customerName, customerId} = customer
        if(customerName && customerId && modalKey===searchKey){
            changeHandler({...customer} , target)
            setModalState({searchKeyword:'',customer:{},modalPage:1})
        }
    },[customer])



    const searchCustomerHandler = (e, id?:string)=>{
        //거래처를 찾고나서 수정 시도 시
        if(checkCustomerName(id) && (e.key ==='Backspace' || e.key==='Delete' || e.key==='Process')){
            e.preventDefault();
            const deleteCustomer = ()=>{
                changeHandler({customerName:'', customerId:'', businessNumber:'', phoneNumber:'', address1:'', address2:'', zipCode:''}, id)
            }
            useConfirm('거래처를 다시 선택하시겠습니까?',deleteCustomer)
        }
        setTimeout(()=>{
            const value =e.target.value

            //Enter 외의 다른 키 입력 시
            if(!value || e.key !=='Enter') return
            if(id) setTarget(id)
            e.preventDefault();
            //pc
            if(window.innerWidth>620){
                const url = `${apiUrl}/search-customer-items?searchName=${value}`; // 열고 싶은 링크
                const popupOptions = "width=500,height=700,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
                window.open(url, "searchCustomer", popupOptions);
            }else{
                setModalState({searchKeyword:value, modalPage:1,modalKey:searchKey})
                redirect('search-customer')
            }
        },100)

    }

    return searchCustomerHandler
    
}