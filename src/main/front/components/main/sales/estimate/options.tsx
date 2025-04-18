'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';

export default function EstimateOptions({estimateId}:{estimateId:string}){

    //TODO: add mobile version
    const viewEstimateHandler = (estimateId:string)=>{
        
        if(window.innerWidth>620){
            const params = new URLSearchParams
            params.set("mode", "detail")
            params.set("target",estimateId)
            const url = `${apiUrl}/estimate?${params.toString()}`;
            const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes"; 
            window.open(url, "PopupWindow", popupOptions);
        }
    }

    return(
        <menu className='options-container'>
            <li>인쇄하기</li>
            <li onClick={viewEstimateHandler.bind(null,estimateId)}>상세보기</li>
            <li className='delete-option'>삭제하기</li>
        </menu>    
    )
}