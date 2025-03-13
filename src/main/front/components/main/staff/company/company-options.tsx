'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';

export default function CompanyOptions({companyId}:{companyId:string}){

        //TODO: add mobile version
        const viewStaffInfoHandler = (companyId:string)=>{
           
            if(window.innerWidth>620){
                const params = new URLSearchParams({
                    mode: "detail",
                    target: companyId,
                  });
                const url = `${apiUrl}/company?${params.toString()}`;
                const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
                window.open(url, "PopupWindow", popupOptions);
            }
        }
    return(
        <menu className='options-container'>
            <li onClick={viewStaffInfoHandler.bind(null,companyId)}>상세보기</li>
            <li className='delete-option'>삭제하기</li>
        </menu>    
    )
}