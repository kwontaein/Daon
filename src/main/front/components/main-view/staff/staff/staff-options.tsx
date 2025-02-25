'use client'
import './staff-options.scss';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/constants/apiUrl';

export default function StaffOptions({staffId}:{staffId:string}){
    const size = useWindowSize()

        //TODO: add mobile version
        const viewStaffInfoHandler = (staffId:string)=>{
           
            if(size.width>620){
                const params = new URLSearchParams({
                    mode: "detail",
                    target: staffId,
                  });
                const url = `${apiUrl}/staff?${params.toString()}`;
                const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
                window.open(url, "PopupWindow", popupOptions);
            }
        }
    return(
        <menu className='staff-options-container'>
            <li onClick={viewStaffInfoHandler.bind(null,staffId)}>회원정보</li>
            <li>권한관리</li>
            <li>삭제하기</li>
        </menu>    
    )
}