'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import { deleteCompany } from '@/features/staff/company/api/company-api';
import { useConfirm } from '@/hooks/share/useConfirm';
import useRouterPath from '@/hooks/share/useRouterPath';

export default function CompanyOptions({companyId}:{companyId:string}){
    const redirect = useRouterPath()
    const viewStaffInfoHandler = (companyId:string)=>{
        
        const params = new URLSearchParams({
            mode: "detail",
            target: companyId,
            });
        if(window.innerWidth>620){
            const url = `${apiUrl}/company?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
            window.open(url, "PopupWindow", popupOptions);
        }else{
            redirect(`company?${params.toString()}`)
        }
    }

    const deleteHandler = ()=>{
        const onDelete = async()=>{
            await deleteCompany(companyId).then(res=>{
                if(res===200){
                    window.alert('삭제가 완료되었습니다.')
                }else{
                    window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
                }
            })
        }
        useConfirm('해당 회사를 정말로 삭제하시겠습니까?', onDelete)
    }
    return(
        <menu className='options-container'>
            <li onClick={viewStaffInfoHandler.bind(null,companyId)}>상세보기</li>
            <li onClick={deleteHandler} className='delete-option'>삭제하기</li>
        </menu>    
    )
}