'use client'

import { useConfirm } from '@/hooks/share/useConfirm';
import './total-buttons.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import { deleteReceiptApi } from '@/features/sales/receipt/api/receiptApi';
import useRouterPath from '@/hooks/share/useRouterPath';



export default function ReceiptButtons({isSelected, selectList, toggleIsSelected,disableDelete} : {
    isSelected: boolean,
    selectList: string[],
    toggleIsSelected: () => void
    disableDelete:boolean
}) {

    const redirect = useRouterPath()

    const registerReceipt =()=>{
        //pc
        if(window.innerWidth>620){
            const url = `${apiUrl}/register-receipt`; // 열고 싶은 링크
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "register-receipt", popupOptions);
        }else{
            redirect('register-receipt')
        }

    }

    const deleteReceipt = ()=>{
        if(disableDelete){
            window.alert('전표화된 견적서가 포함되어 삭제가 불가능합니다.')
            return
        }
        if(selectList.length===0) return
            const submit = async()=>{
            const status =await deleteReceiptApi(selectList)
            if(status===200){
                window.alert('삭제가 완료되었습니다.')
            }else{
                window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
        useConfirm('선택한 전표를 삭제하시겠습니까?',submit)
    }

    const editReceipt =()=>{
        if(selectList.length===0) return
        if(disableDelete){
            window.alert('전표화된 견적서가 포함되어 수정이 불가능합니다.')
            return
        }
        //pc
        if(window.innerWidth>620){
            const params = new URLSearchParams
            params.set("receiptIds", JSON.stringify(selectList))

            const url = `${apiUrl}/receipt?${params.toString()}`; // 열고 싶은 링크
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "receipt", popupOptions);
        }
    }
    
    return(
        <section className='total-buttons-container'>
            <button  onClick={registerReceipt}>
                전표등록
            </button>
             <button onClick={toggleIsSelected}>
                {isSelected ? '선택취소':'전표선택'}
            </button>
            {selectList.length>0 &&
                <>
                    <button onClick={editReceipt}>
                        전표수정
                    </button>
                    <button onClick={deleteReceipt}>
                        전표삭제
                    </button>
                    <button>
                        견적서
                    </button>
                </>
            }
        </section>
    )
}