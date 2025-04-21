'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import { deleteEmployeeApi } from '@/features/staff/employee/api/employeeApi';
import { useConfirm } from '@/hooks/share/useConfirm';

export default function EmployeeOptions({employeeId}:{employeeId:string}){

        //TODO: add mobile version
        const viewEmployeeInfoHandler = (employeeId:string)=>{
           
            if(window.innerWidth>620){
                const params = new URLSearchParams({
                    mode: "detail",
                    target: employeeId,
                  });
                const url = `${apiUrl}/employee?${params.toString()}`;
                const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
                window.open(url, "PopupWindow", popupOptions);
            }
        }

        
        const deleteAccountingHandler = ()=>{
            const onDelete=()=>{
                deleteEmployeeApi(employeeId).then((res)=>{
                    if(res ===200){
                        window.alert('삭제가 완료되었습니다.')
                    }else{
                        window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
                    }
                })
            }
            useConfirm('정말로 삭제하시겠습니까?',onDelete)
        }

    return(
        <menu className='options-container'>
            <li onClick={viewEmployeeInfoHandler.bind(null,employeeId)}>회원정보</li>
            <li>권한관리</li>
            <li onClick={deleteAccountingHandler} className='delete-option'>삭제하기</li>
        </menu>    
    )
}