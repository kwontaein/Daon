'use client'

import './total-buttons.scss';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/constants/apiUrl';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { useDispatch } from 'react-redux';
import { toggleSelect } from '@/hooks/redux/slice/receipt-select-slice';
import { useEffect } from 'react';

export default function ReceiptButtons(){
    const size = useWindowSize()
    const receiptSelector = useSelector((state:RootState) => state.receiptSelector);
    const dispatch = useDispatch()

    const registerReceipt =()=>{
        //pc
        if(size.width>620){
            const url = `${apiUrl}/register-receipt`; // 열고 싶은 링크
            const popupOptions = "width=700,height=700,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }

    //off selector
    useEffect(()=>{
        return ()=>{
            if(receiptSelector.isSelected){
                dispatch(toggleSelect())
            }
        }
    })
    const selectHandler = ()=>{
        dispatch(toggleSelect())
    }

    return(
        <section className='total-buttons-container'>
             <button onClick={selectHandler}>
                전표선택
            </button>
            <button  onClick={registerReceipt}>
                전표등록
            </button>
        </section>
    )
}