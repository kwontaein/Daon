'use client'
import '@/styles/options/options.scss';
import { deleteEstimate, transEstimateToReceiptApi } from '@/features/sales/estimate/api/estimateApi';
import { useConfirm } from '@/hooks/share/useConfirm';
import useRouterPath from '@/hooks/share/useRouterPath';

export default function EstimateOptions({estimateId, receipted}:{estimateId:string, receipted:boolean}){
    const redirect = useRouterPath()

    const viewEstimateHandler = (estimateId:string)=>{
        if(receipted){
            useConfirm('정말로 전표전환을 취소하시겠습니까?', ()=>{transEstimateToReceiptApi({estimateId})})
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
            await deleteEstimate(estimateId).then((status)=>{
                if(status===200){
                    window.alert('삭제가 완료되었습니다.')
                }else{
                    window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
                }
            })
        }
        useConfirm('정말로 해당 견적서를 삭제하시겠습니까?', onDelete)
    }
    
    const printEstimatehandler = ()=>{
        
        const params = new URLSearchParams({
            estimateId:estimateId,
         });

        if(window.innerWidth>620){
            const url = `/estimate-print?${params.toString()}`;
            const popupOptions = "width=780,height=980,scrollbars=yes,resizable=yes"; 
            window.open(url, "printEstimate", popupOptions);
        }else[
            redirect(`estimate-print?${params.toString()}`)
        ]
    }

    return(
        <menu className='options-container'>
            <li onClick={printEstimatehandler}>인쇄하기</li>
            <li onClick={viewEstimateHandler.bind(null,estimateId)}>{receipted ? '전환취소' :'상세보기'}</li>
            <li onClick={deleteEstiamteHandler} className='delete-option'>삭제하기</li>
        </menu>    
    )
}