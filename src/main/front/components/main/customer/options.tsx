'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';

export default function CustomerOptions({customerId}:{customerId:string}){

        //TODO: add mobile version
        const viewCustomerHandler = (customerId:string)=>{
           
            if(window.innerWidth>620){
                const params = new URLSearchParams({
                    mode: "detail",
                    target: customerId,
                  });
                const url = `${apiUrl}/customer?${params.toString()}`;
                const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
                window.open(url, "PopupWindow", popupOptions);
            }
        }
    return(
        <menu className='options-container'>
            <li>원장조회</li>
            <li onClick={viewCustomerHandler.bind(null,customerId)}>상세보기</li>
        </menu>    
    )
}