'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import { AccountingDivision } from '@/model/types/accounting/type';
import { deleteAccountingApi } from '@/features/accounting/api/accountingFormApi';
import { useConfirm } from '@/hooks/share/useConfirm';

export default function AccountingOptions({id, division,paidDate}:{id:string, division:keyof typeof AccountingDivision, paidDate?:Date}){

        //TODO: add mobile version
        const viewAccountingHandler = ()=>{
           
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

        const deleteAccountingHandler = ()=>{
            const onDelete=()=>{
                deleteAccountingApi(division,id).then((res)=>{
                    if(res ===200){
                        window.alert('삭제가 완료되었습니다.')
                    }else{
                        window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
                    }
                })
            }
            useConfirm('정말로 삭제하시겠습니까?',onDelete,()=>{})
        }
    return(
        <menu className='options-container'>
            {paidDate!==undefined &&
                <li style={{color:`${paidDate ? 'red' :'blue'}`}}>{paidDate ? '전환취소':'입금전환'}</li>
            }
            <li onClick={viewAccountingHandler}>수정</li>
            <li onClick={deleteAccountingHandler} className='delete-option'>삭제</li>
        </menu>    
    )
}