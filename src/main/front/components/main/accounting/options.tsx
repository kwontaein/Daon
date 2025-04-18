'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import { AccountingDivision } from '@/model/types/accounting/type';

export default function AccountingOptions({id, division}:{id:string, division:keyof typeof AccountingDivision}){

        //TODO: add mobile version
        const viewAccountingHandler = (id:string)=>{
           
            if(window.innerWidth>620){
                const params = new URLSearchParams({
                    mode: "detail",
                    target: id,
                  });
                  params.set('division', division)
                const url = `${apiUrl}/${division}?${params.toString()}`;
                const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
                window.open(url, "PopupWindow", popupOptions);
            }
        }
    return(
        <menu className='options-container'>
            <li onClick={viewAccountingHandler.bind(null,id)}>수정</li>
            <li className='delete-option'>삭제</li>
        </menu>    
    )
}