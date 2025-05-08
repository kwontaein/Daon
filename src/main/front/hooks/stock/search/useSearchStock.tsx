import { useConfirm } from "@/hooks/share/useConfirm";
import useRouterPath from "@/hooks/share/useRouterPath";
import { ResponseStock } from "@/model/types/stock/stock/types";
import { useModalState } from "@/store/zustand/modal";
import { useEffect, useId, useRef, useState } from "react";

export default function useSearchStock(checkStockName : (id? : string) => boolean, changeHandler : (
    stockInfo : Partial<Pick<ResponseStock,'stockId'| 'productName'| 'modelName'| 'outPrice'>>,
    uuid?: string
) => void) {
    const [target, setTarget] = useState('') 
    const redirect = useRouterPath()
    const {stock, setModalState, modalKey} = useModalState()
    const searchKey = useId()

    useEffect(()=>{
        const {stockId, productName} = stock
        if(stockId && productName && modalKey===searchKey){
            changeHandler({...stock} , target)
            setModalState({searchKeyword:'',stock:{},modalPage:1})
        }
    },[stock])


    //검색을 위한 이벤트등록
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data) {
                const { stockId, productName, modelName, outPrice } = event.data;
                if(stockId && productName){
                    changeHandler({stockId, productName, modelName, outPrice}, target)
                }
            }
        };
        window.removeEventListener("message", handleMessage);
        window.addEventListener("message", handleMessage);  

        return () => window.removeEventListener("message", handleMessage);
    }, [target]);




    const searchStockHandler = (e, id?:string)=>{
        //거래처를 찾고나서 수정 시도 시
        if(checkStockName(id) && (e.key ==='Backspace' || e.key==='Delete' || e.key==='Process')){
            e.preventDefault();
            const deleteStock = ()=>{
                changeHandler({stockId:'', productName:'', modelName:'', outPrice:0}, id)
            }
            useConfirm('물품을 다시 선택하시겠습니까?',deleteStock)
        }
        setTimeout(()=>{
            const value =e.target.value

            //Enter 외의 다른 키 입력 시
            if(!value || e.key !=='Enter') return
            if(id) setTarget(id)
            e.preventDefault();
            //pc
            if(window.innerWidth>620){
                const url = `${process.env.NEXT_PUBLIC_API_URL}/search-stock-items?searchName=${value}`; // 열고 싶은 링크
                const popupOptions = "width=500,height=700,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
                window.open(url, "searchStock", popupOptions);
            }else{
                setModalState({searchKeyword:value, modalPage:1,modalKey:searchKey})
                redirect('search-stock')
            }
        },100)

    }

    return searchStockHandler
    
}