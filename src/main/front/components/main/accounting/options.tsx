'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import { AccountingDivision } from '@/model/types/accounting/type';

export default function AccountingOptions({id, division,paidDate}:{id:string, division:keyof typeof AccountingDivision, paidDate?:Date}){

        //TODO: add mobile version
        const viewAccountingHandler = (id:string)=>{
           
            if(window.innerWidth>620){
                const params = new URLSearchParams({
                    mode:'edit',
                    target: id,
                    division,
                  });
                const url = `${apiUrl}/accounting?${params.toString()}`;
                const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
                window.open(url, "PopupWindow", popupOptions);
            }
        }
    return(
        <menu className='options-container'>
            {paidDate!==undefined &&
                <li style={{color:`${paidDate ? 'red' :'blue'}`}}>{paidDate ? '전환취소':'입금전환'}</li>
            }
            <li onClick={viewAccountingHandler.bind(null,id)}>수정</li>
            <li className='delete-option'>삭제</li>
        </menu>    
    )
}