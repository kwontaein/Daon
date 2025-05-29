'use client'
import './total-buttons.scss';

import useRouterPath from '@/hooks/share/useRouterPath';
import { ReceiptCategoryEnum, ResponseReceipt } from '@/model/types/sales/receipt/type';
import { useMemo, useReducer } from 'react';

import ModalReceiptList from './modal-receipt-list';
import { deleteReceiptApi } from '@/features/sales/receipt/api/client-api';
import { selectConfrim } from '@/hooks/share/selectConfrim';



export default function ReceiptButtons({isSelected, selectList, toggleIsSelected,allReceiptList, updateCheck} : {
    isSelected: boolean
    selectList: string[]
    toggleIsSelected: () => void
    allReceiptList:ResponseReceipt[]
    updateCheck : (id:string) =>void,
}) {
    const [showSelectedRecipt, setShowSelectedReceipt] = useReducer((prev)=>!prev,false)    
    const redirect = useRouterPath()

    
    const selectedReceips = useMemo(
        () => allReceiptList.filter(({receiptId}) => selectList.includes(receiptId)),
        [allReceiptList, selectList])
    
    //체크목록 중 전표화된 견적서 포함되면 삭제불가능
    const disableDelete = useMemo(
        () => !!selectedReceips.find(({estimateId}) => estimateId ),
        [selectedReceips])

    //체크목록이 전부 매출, 매출대체인지 확인
    const disableEstimate = useMemo(() => !selectedReceips.every(
        ({category}) => (ReceiptCategoryEnum[category] === '매출' || ReceiptCategoryEnum[category] === '매출대체')
    ), [selectedReceips])

    //체크한 목록중 서로다른 거래처가 있는지 확인
    const incluesOtherCustomer = useMemo(() => {
        return  !selectedReceips.every(({customerId})=> customerId === selectedReceips.at(-1).customerId)   
    },[selectedReceips]) 

    //전표등록
    const registerReceipt =()=>{
        if(window.innerWidth>620){
            const url = `/register-receipt`; // 열고 싶은 링크
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "register-receipt", popupOptions);
        }else{
            redirect('register-receipt')
        }
    }

    //전표삭제
    const deleteReceipt = ()=>{
        if(disableDelete){
            window.alert('전표화된 견적서가 포함되어 삭제가 불가능합니다.')
            return
        }
        if(selectList.length===0){
            window.alert('한 개 이상의 전표를 선택해주세요.')
            return
        }
        const submit = async()=>{
            await deleteReceiptApi(selectList)
        }
        selectConfrim('선택한 전표를 삭제하시겠습니까?',submit)
    }
    
    //전표수정
    const editReceipt =()=>{
        if(selectList.length===0){
            window.alert('한 개 이상의 전표를 선택해주세요.')
            return
        }
        if(disableDelete){
            window.alert('전표화된 견적서가 포함되어 수정이 불가능합니다.')
            return
        }
        const params = new URLSearchParams
        params.set("receiptIds", JSON.stringify(selectList))

        if(window.innerWidth>620){

            const url = `/receipt?${params.toString()}`; // 열고 싶은 링크
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "receipt", popupOptions);
        }else{
            redirect(`receipt?${params.toString()}`)
        }
    }

    const printEstimatehandler = ()=>{
        const showAlert = (message:string)=>{
            window.alert(message)
            return
        }
        if(selectList.length===0){
            return showAlert('한 개 이상의 전표를 선택해주세요.')
        }
        if(disableEstimate){
            return showAlert('매출, 매출대체건을 제외한 전표는 입금처리를 할 수 없습니다.')
        }
        if(incluesOtherCustomer){
            return showAlert('선택하신 전표중에 서로 다른 거래처 전표가 있습니다. 동일한 거래처 전표를 선택해 주세요.')
        }
        if(selectList.length>17){
            return showAlert('17개 이상은 출력할수 없습니다.')
        }
        const params = new URLSearchParams({
            receiptIds:JSON.stringify(selectList),
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
        <section className='total-buttons-container'>
            <button  onClick={registerReceipt}>
                전표등록
            </button>
             <button onClick={toggleIsSelected}>
                {isSelected ? '선택취소':'전표선택'}
            </button>
            {selectList.length>0 &&
                <>
                    <button onClick={setShowSelectedReceipt}>
                        {selectedReceips.length}개 선택됨
                    </button>
                    <button onClick={editReceipt}>
                        전표수정
                    </button>
                    <button onClick={deleteReceipt}>
                        전표삭제
                    </button>
                    <button onClick={printEstimatehandler}>
                        견적서
                    </button>
                </>
            }
            {showSelectedRecipt && 
                <ModalReceiptList 
                    selectedReceips={selectedReceips} 
                    close={setShowSelectedReceipt} 
                    updateCheck={updateCheck}/>
            }
        </section>
    )
}
