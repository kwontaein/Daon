'use client'
import './company-options.scss';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/constants/apiUrl';

export default function CompanyOptions({companyId}:{companyId:string}){
    const size = useWindowSize()

        //TODO: add mobile version
        const viewStaffInfoHandler = (companyId:string)=>{
           
            if(size.width>620){
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
        <menu className='staff-options-container'>
            <li onClick={viewStaffInfoHandler.bind(null,companyId)}>수정하기</li>
            <li>삭제하기</li>
        </menu>    
    )
}