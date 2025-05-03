'use client'
import '@/styles/options/options.scss';
import { apiUrl } from '@/model/constants/apiUrl';
import { deleteStockApi } from '@/features/stock/stock/api/stockFormApi';
import { useConfirm } from '@/hooks/share/useConfirm';
import useRouterPath from '@/hooks/share/useRouterPath';

export default function StockOptions({stockId}:{stockId:string}){
    const redirect = useRouterPath()

    const viewStockHandler = ()=>{
        
        const params = new URLSearchParams({
            mode: "detail",
            target: stockId,
            });

        if(window.innerWidth>620){
            const url = `${apiUrl}/stock?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
            window.open(url, "PopupWindow", popupOptions);
        }else{
            redirect(`stock?${params.toString()}`)
        }
    }

    const deleteStockHandler =()=>{
        const onDelete = ()=>{
            deleteStockApi(stockId).then((status)=>{
                if(status ===200){
                    window.alert('삭제가 완료되었습니다.')
                }else{
                    window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
                }
            })
        }
        useConfirm('정말로 해당 물품을 삭제하시겠습니까?', onDelete)
    }

    return(
        <menu className='options-container'>
            <li>원장조회</li>
            <li onClick={viewStockHandler}>상세보기</li>
            <li className='delete-option' onClick={deleteStockHandler}>삭제하기</li>
        </menu>    
    )
}