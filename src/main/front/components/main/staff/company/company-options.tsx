'use client'
import '@/styles/options/options.scss';
import { useConfirm } from '@/hooks/share/useConfirm';
import useRouterPath from '@/hooks/share/useRouterPath';
import { deleteCompany } from '@/features/staff/company/api/client-api';

export default function CompanyOptions({companyId}:{companyId:string}){
    const redirect = useRouterPath()
    const viewStaffInfoHandler = (companyId:string)=>{
        
        const params = new URLSearchParams({
            mode: "detail",
            target: companyId,
            });
        if(window.innerWidth>620){
            const url = `/company?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
            window.open(url, "PopupWindow", popupOptions);
        }else{
            redirect(`company?${params.toString()}`)
        }
    }

    const deleteHandler = ()=>{
        const onDelete = async()=>{
            await deleteCompany(companyId)
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