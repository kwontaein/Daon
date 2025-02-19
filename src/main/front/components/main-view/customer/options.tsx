'use client'
import { ResponseCustomer } from '@/types/customer/type';
import './options.scss';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/constants/apiUrl';

export default function CustomerOptions({customer}:{customer:ResponseCustomer}){
    const size = useWindowSize()

        //TODO: add mobile version
        const viewCustomerHandler = (customer:ResponseCustomer)=>{
            sessionStorage.setItem('customer', JSON.stringify(customer))
            //pc
            if(size.width>620){
                const url = `${apiUrl}/customer`; 
                const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
                window.open(url, "PopupWindow", popupOptions);
            }
        }
    return(
        <menu className='options-container'>
            <li>원장조회</li>
            <li onClick={viewCustomerHandler.bind(null,customer)}>상세보기</li>
        </menu>    
    )
}