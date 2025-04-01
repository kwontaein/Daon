'use client'

import { useConfirm } from '@/hooks/share/useConfirm';
import './total-buttons.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import { deleteReceiptApi } from '@/features/sales/receipt/api/receiptApi';



export default function ReceiptButtons({isSelected, selectList, toggleIsSelected} : {
    isSelected: boolean,
    selectList: string[],
    toggleIsSelected: () => void
}) {


    const registerReceipt =()=>{
        //pc
        if(window.innerWidth>620){
            const url = `${apiUrl}/register-receipt`; // 열고 싶은 링크
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "register-receipt", popupOptions);
        }
    }

    const deleteReceipt = ()=>{
        const submit = async()=>{
            const status =await deleteReceiptApi(selectList)
            if(status===200){
                window.alert('삭제가 완료되었습니다.')
            }else{
                window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
        useConfirm('선택한 전표를 삭제하시겠습니까?',submit,()=>{})
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
                    <button>
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