'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import './button.scss';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/constants/apiUrl';

export default function RegisterButton(){
    const size = useWindowSize()

    const registerReceipt =()=>{
        //pc
        if(size.width>620){
            const url = `${apiUrl}/register-receipt`; // 열고 싶은 링크
            const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }
    return(
        <div className='register_button' onClick={registerReceipt}>
            <FontAwesomeIcon icon={faCirclePlus}/>
            &nbsp;
            전표등록
        </div>
    )
}