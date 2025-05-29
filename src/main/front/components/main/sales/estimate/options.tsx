'use client'
import '@/styles/options/options.scss';
import { transEstimateToReceiptApi } from '@/features/sales/estimate/api/server-api';
import useRouterPath from '@/hooks/share/useRouterPath';
import { deleteEstimate } from '@/features/sales/estimate/api/client-api';
import { selectConfrim } from '@/hooks/share/selectConfrim';

export default function EstimateOptions({estimateId, receipted}:{estimateId:string, receipted:boolean}){
    const redirect = useRouterPath()

    const viewEstimateHandler = (estimateId:string)=>{
        if(receipted){
            selectConfrim('정말로 전표전환을 취소하시겠습니까?', ()=>{transEstimateToReceiptApi({estimateId})})
            return
        }

        const params = new URLSearchParams
        params.set("mode", "detail")
        params.set("target",estimateId)

        if(window.innerWidth>620){
            const url = `/estimate?${params.toString()}`;
            const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes"; 
            window.open(url, "PopupWindow", popupOptions);
        }else{
            redirect(`estimate?${params.toString()}`)
        }
    }


    const deleteEstiamteHandler = ()=>{
        const onDelete =async()=>{
            await deleteEstimate(estimateId)
        }
        selectConfrim('정말로 해당 견적서를 삭제하시겠습니까?', onDelete)
    }
    
    const printEstimatehandler = ()=>{
        
        const params = new URLSearchParams({
            estimateId:estimateId,
         });

        if(window.innerWidth>620){
            const url = `/estimate-print?${params.toString()}`;
            const popupOptions = "width=780,height=980,scrollbars=yes,resizable=yes"; 
            window.open(url, "printEstimate", popupOptions);
        }else{
            redirect(`estimate-print?${params.toString()}`)
        }
    }

    return(
        <menu className='options-container'>
            <li onClick={printEstimatehandler}>인쇄하기</li>
            <li onClick={viewEstimateHandler.bind(null,estimateId)}>{receipted ? '전환취소' :'상세보기'}</li>
            <li onClick={deleteEstiamteHandler} className='delete-option'>삭제하기</li>
        </menu>    
    )
}