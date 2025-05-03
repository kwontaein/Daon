'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import useRouterPath from '@/hooks/share/useRouterPath';

export default function CustomerOptions({customerId}:{customerId:string}){

    const redirect = useRouterPath()
    const viewCustomerHandler = (customerId:string)=>{
        
        const params = new URLSearchParams({
            mode: "detail",
            target: customerId,
            });

        if(window.innerWidth>620){
            const url = `${apiUrl}/customer?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
            window.open(url, "PopupWindow", popupOptions);
        }
        redirect(`customer?${params.toString()}`)
    }
    return(
        <menu className='options-container'>
            <li>원장조회</li>
            <li onClick={viewCustomerHandler.bind(null,customerId)}>상세보기</li>
        </menu>    
    )
}