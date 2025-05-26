'use client'
import './search-result.scss'
import dayjs from "dayjs";
import { ReceiptCategoryEnum, ResponseReceipt } from '@/model/types/sales/receipt/type';
import useCheckBoxState from '@/hooks/share/useCheckboxState';
import { useEffect, useMemo, useReducer, useState } from 'react';
import ReceiptButtons from '../total-buttons';
import ReceiptTableContainer from '../table/table-header';
import { useSearchParams } from 'next/navigation';


interface ReceiptItemProps{
    allReceiptList:ResponseReceipt[]
}

export default function ReceiptSearchResult({allReceiptList}:{allReceiptList:ResponseReceipt[]}){
    const [isSelected, toggleIsSelected] = useReducer((prev)=>!prev, false);
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')||1)
    const basicIndex = (page-1) * 10
    
    const pageByReceipt = useMemo(()=> allReceiptList.slice((page - 1) * 10, ((page - 1) * 10) + 10),[allReceiptList, page])

    const receiptIds:string[] = useMemo(()=> allReceiptList.map(({receiptId})=>receiptId),[allReceiptList])
    const {checkedState, update_checked, resetChecked} = useCheckBoxState(receiptIds)
    const selectList = useMemo(()=>Object.keys(checkedState), [checkedState])

    useEffect(()=>{
        if(!isSelected){
            resetChecked()
        }
    },[isSelected])

    return (
        <>
            <ReceiptButtons
                isSelected={isSelected}
                toggleIsSelected={toggleIsSelected}
                selectList={selectList}
                allReceiptList={allReceiptList}
                updateCheck={update_checked}
                />            
           <ReceiptTableContainer>
           {pageByReceipt.map((receipt: ResponseReceipt, index: number) => (
                <tbody key={receipt.receiptId} className={`search-result-container ${(receipt.estimateId) ? 'estimate-receipt' : ''}`}>
                    <tr>
                        <td rowSpan={2}>
                            {basicIndex + index + 1}
                        </td>
                        <td rowSpan={2}>
                            <div className="date-container">
                                {isSelected && 
                                    <input type="checkbox"
                                           style={{width:'14px', height:'14px'}} 
                                           onChange={update_checked.bind(null, receipt.receiptId)}
                                           checked={checkedState[receipt.receiptId]||false}/>
                                }
                                <div>{dayjs(receipt.timeStamp).format('YY.M.DD')}</div>
                            </div>
                        </td>
                        <td rowSpan={2}>
                            {ReceiptCategoryEnum[receipt.category]}
                        </td>
                        <td className="left-align">{receipt.customerName}</td>
                        <td className="left-align">{receipt.memo}</td>
                        <td className="left-align" colSpan={2}>
                            {receipt.description}
                        </td>
                    </tr>
                    <tr>
                        <td className="left-align">{receipt.officialName}{receipt.productName}{receipt.modelName && <b className='division_line'>|</b>} {receipt.modelName}</td>
                        <td>{receipt.quantity && Number(receipt.quantity).toLocaleString('ko-KR')}</td>
                        <td className="right-align">{receipt.unitPrice.toLocaleString('ko-KR')}</td>
                        <td className="right-align">{receipt.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                </tbody>
            ))}
            {
                pageByReceipt.length===0 && 
                <tbody>
                    <tr>
                        <td colSpan={9}>
                            <p>조회된 전표가 존재하지 않습니다.</p>
                        </td>
                    </tr>
                </tbody>
            }
           </ReceiptTableContainer>
        </>
    )
    
}