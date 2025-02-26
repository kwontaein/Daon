'use client'
import '@/styles/options/options.scss';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/constants/apiUrl';

export default function StockOptions({stockId}:{stockId:string}){
    const size = useWindowSize()

        //TODO: add mobile version
        const viewCustomerHandler = (stockId:string)=>{
           
            if(size.width>620){
                const params = new URLSearchParams({
                    mode: "detail",
                    target: stockId,
                  });
                const url = `${apiUrl}/stock?${params.toString()}`;
                const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
                window.open(url, "PopupWindow", popupOptions);
            }
        }
    return(
        <menu className='options-container'>
            <li>원장조회</li>
            <li onClick={viewCustomerHandler.bind(null,stockId)}>상세보기</li>
            <li className='delete-option'>삭제하기</li>
        </menu>    
    )
}