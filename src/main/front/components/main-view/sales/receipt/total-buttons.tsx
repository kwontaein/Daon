'use client'

import './total-buttons.scss';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/constants/apiUrl';

export default function RegisterButton(){
    const size = useWindowSize()

    const registerReceipt =()=>{
        //pc
        if(size.width>620){
            const url = `${apiUrl}/register-receipt`; // 열고 싶은 링크
            const popupOptions = "width=900,height=600,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }
    return(
        <section className='total-buttons-container'>
             <button>
                전표선택
            </button>
            <button  onClick={registerReceipt}>
                전표등록
            </button>
        </section>
    )
}