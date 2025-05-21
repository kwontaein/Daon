'use client'
import '@/styles/options/options.scss';
import { deleteEmployeeApi } from '@/features/staff/employee/api/employeeApi';
import { useConfirm } from '@/hooks/share/useConfirm';
import useRouterPath from '@/hooks/share/useRouterPath';
import { useUserInformation } from '@/store/zustand/userInfo';
import { UserRoleEnum } from '@/model/types/staff/employee/type';

export default function EmployeeOptions({employeeId}:{employeeId:string}){
    const redirect = useRouterPath()
    const {user} = useUserInformation()

    const viewEmployeeInfoHandler = (employeeId:string)=>{
        if(UserRoleEnum[user.userRole] !=='관리자' && user.userId!==employeeId){
            window.alert('접근권한이 없습니다.')
            return
        }
        const params = new URLSearchParams({
            mode: "detail",
            target: employeeId,
            });
        if(window.innerWidth>620){
            const url = `/employee?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
            window.open(url, "PopupWindow", popupOptions);
        }else{
            redirect(`employee?${params.toString()}`)
        }
    }

        
    const deleteAccountingHandler = ()=>{
        if(UserRoleEnum[user.userRole] !=='관리자'){
            window.alert('접근권한이 없습니다.')
            return
        }
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
    
    const employeePermissionHandler =()=>{
        if(UserRoleEnum[user.userRole] !=='관리자'){
            window.alert('접근권한이 없습니다.')
            return
        }
        redirect(`?permissionTarget=${employeeId}`)
    }

    return(
        <menu className='options-container'>
            <li onClick={viewEmployeeInfoHandler.bind(null,employeeId)}>회원정보</li>
            <li onClick={employeePermissionHandler}>권한관리</li>
            <li onClick={deleteAccountingHandler} className='delete-option'>삭제하기</li>
        </menu>    
    )
}