'use client'
import './total-buttons.scss';

import asideArrow from '@/public/assets/aside-arrow.gif';
import { ReceiptCategoryEnum, ResponseReceipt } from '@/model/types/sales/receipt/type';
import { ActionDispatch, useMemo } from 'react';
import useCheckBoxState from '@/hooks/share/useCheckboxState';
import dayjs from 'dayjs';
import Image from 'next/image';



export default function ModalReceiptList ({selectedReceips, close, updateCheck} : {
    selectedReceips: ResponseReceipt[],
    close:ActionDispatch<[]>
    updateCheck : (id:string)=>void
})  {
    const chckedIds = useMemo(()=>selectedReceips.map(({receiptId})=>receiptId),[selectedReceips])
    const {checkedState,update_checked} = useCheckBoxState(chckedIds)

    const updateParentCheck =()=>{
        Object.keys(checkedState).forEach((id)=>{
            updateCheck(id)
            update_checked(id)
        })
    }
    return(
        <section className='modal-background' style={{tableLayout:'fixed'}}>
            <main>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>
                    선택된 전표
                </h4>
                </header>
                <article>
                    <table className='receipt-table-container' style={{marginTop:'unset'}}>
                    <colgroup>
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '10%'}} />
                        <col style={{ width: '15%'}} />
                        <col style={{ width:'30%' }} />
                        <col style={{ width: '10%', minWidth:'45px' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '15%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <td rowSpan={2}>NO</td>
                            <td rowSpan={2}>날짜</td>
                            <td rowSpan={2}>계정전표</td>
                            <td>거래처</td>
                            <td>비고</td>
                            <td colSpan={2}>적요</td>
                        </tr>
                        <tr>
                            <td>품명</td>
                            <td>수량</td>
                            <td>단가</td>
                            <td>금액</td>
                        </tr>
                    </thead>
                    {selectedReceips.map((receipt: ResponseReceipt, index: number) => (
                    <tbody key={receipt.receiptId} className={`search-result-container ${(receipt.estimateId) ? 'estimate-receipt' : ''}`}>
                        <tr>
                            <td rowSpan={2}>
                                {index + 1}
                            </td>
                            <td rowSpan={2}>
                                <div className="date-container">
                                    
                                        <input type="checkbox"
                                            style={{width:'14px', height:'14px'}} 
                                            onChange={update_checked.bind(null, receipt.receiptId)}
                                            checked={checkedState[receipt.receiptId]||false}/>
                                    
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
                {selectedReceips.length===0 &&
                <tbody>
                    <tr>
                        <td colSpan={9}>
                            <p>선택된 전표가 존재하지 않습니다.</p>
                        </td>
                    </tr>
                </tbody>
                }
                </table>
                </article>
            <div className='total-buttons-container' style={{justifyContent:'center'}}>
                <button onClick={updateParentCheck}>체크해제</button>
                <button onClick={close}>취소</button>
            </div>
            </main>
        </section>
    )
}