'use client'

import './total-buttons.scss';
import { apiUrl } from '@/model/constants/apiUrl';



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
                    <button>
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