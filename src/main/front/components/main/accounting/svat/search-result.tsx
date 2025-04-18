'use client'
import '@/styles/table-style/search-result.scss'

import React from 'react';
import { SalesVAT } from '@/model/types/accounting/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import AccountingOptions from '../options';
import dayjs from 'dayjs';

export default function SVATSaerchResult({salesVatList}:{salesVatList:SalesVAT[]}){
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);

    return(
        <table className='search-result-table'>
            <thead>
                <tr>
                    <td>분류</td>
                    <td>일자</td>
                    <td>상호명</td>
                    <td>사업자번호</td>
                    <td>결제내역</td>
                    <td>금액</td>
                    <td>부가세</td>
                    <td>합계</td>
                    <td>입금일자</td>
                    <td>전환상태</td>
                    <td>관리</td>
                </tr>
            </thead>
            <tbody>
                {salesVatList.map((salesVat)=>(
                    <tr key={salesVat.salesVATId} ref={(el)=> {itemsRef.current[salesVat.salesVATId] = el}}>
                        <td>{salesVat.categorySelection}</td>
                        <td>{dayjs(salesVat.date).format('YY.MM.DD')}</td>
                        <td className='left-align'>{}</td>
                        <td>{salesVat.businessNumber}</td>
                        <td>{salesVat.paymentDetails}</td>
                        <td className='right-align'>{salesVat.amount.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{salesVat.vat.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{salesVat.total.toLocaleString('ko-KR')}</td>
                        <td>{salesVat.paidDate? dayjs(salesVat.paidDate).format('YY.MM.DD'):''}</td>
                        <td>
                            <button style={{color: `${salesVat.paidDate ?'red':'blue'}`}}>
                                {salesVat.paidDate? '전환취소' :'입금전환'}
                            </button>
                        </td>
                        <td className='icon' onClick={()=> target === salesVat.salesVATId ? setTarget(null) :setTarget(salesVat.salesVATId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === salesVat.salesVATId &&{color:'orange'}}/>
                            {target === salesVat.salesVATId && <AccountingOptions id={salesVat.salesVATId} division='svat'/>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}