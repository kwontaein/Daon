import { useConfirm } from "@/hooks/share/useConfirm";
import { apiUrl } from "@/model/constants/apiUrl";
import { ResponseCustomer } from "@/model/types/customer/customer/type";
import { useEffect, useRef, useState } from "react";

export default function useSearchCustomer(){
    
    const [customerInfo, setCustomerInfo] = useState<Pick<ResponseCustomer,'customerName'|'customerId'>>({
        customerName:'',
        customerId:''
    })
    const customerNameRef = useRef(null);
    
    //검색을 위한 이벤트등록
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data) {
                const { customerName, customerId } = event.data;
                if(customerName && customerId){
                    setCustomerInfo({ customerName, customerId })
                }
            }
        };
        window.removeEventListener("message", handleMessage);
        window.addEventListener("message", handleMessage);  

        return () => window.removeEventListener("message", handleMessage);
    }, []);




    const searchCustomerHandler = (e)=>{
        //거래처를 찾고나서 수정 시도 시
        if(customerInfo.customerId){
            const deleteCustomer = ()=>{
                setCustomerInfo({customerName:'',customerId:''})
            }
            useConfirm('거래처를 다시 선택하시겠습니까?',deleteCustomer,()=>{})
        }
        //Enter 외의 다른 키 입력 시
        const value = customerNameRef.current?.value
        if(value || e.key !=='Enter') return
        e.preventDefault();
        //pc
        if(window.innerWidth>620){
            const url = `${apiUrl}/search-customer-items?searchName=${customerNameRef.current?.value}`; // 열고 싶은 링크
            const popupOptions = "width=500,height=700,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "searchCustomer", popupOptions);
        }

    }

    return { customerInfo, searchCustomerHandler, customerNameRef }
    
}