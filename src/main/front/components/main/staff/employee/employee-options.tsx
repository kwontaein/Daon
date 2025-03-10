'use client'
import '@/styles/options/options.scss';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/model/constants/apiUrl';

export default function EmployeeOptions({employeeId}:{employeeId:string}){
    const size = useWindowSize()

        //TODO: add mobile version
        const viewStaffInfoHandler = (employeeId:string)=>{
           
            if(size.width>620){
                const params = new URLSearchParams({
                    mode: "detail",
                    target: employeeId,
                  });
                const url = `${apiUrl}/staff?${params.toString()}`;
                const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
                window.open(url, "PopupWindow", popupOptions);
            }
        }
    return(
        <menu className='options-container'>
            <li onClick={viewStaffInfoHandler.bind(null,employeeId)}>회원정보</li>
            <li>권한관리</li>
            <li className='delete-option'>삭제하기</li>
        </menu>    
    )
}