'use client'

import './total-buttons.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import { useDispatch } from 'react-redux';
import { clearReceiptIds, toggleSelect } from '@/store/slice/receipt-select';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect } from 'react';



export default function ReceiptButtons(){
    const dispatch = useDispatch()
    const {isSelected, selectList} = useSelector((state:RootState)=>state.receiptSelector)

    useEffect(()=>{
        if(!isSelected){
            dispatch(clearReceiptIds())
        }
    },[isSelected])
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
             <button onClick={dispatch.bind(null,toggleSelect())}>
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