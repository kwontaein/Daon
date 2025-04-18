'use client'
import '@/styles/table-style/search-result.scss'

import React, { Fragment } from 'react';
import { SalesVAT } from '@/model/types/accounting/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import AccountingOptions from '../options';
import dayjs from 'dayjs';
import { useScreenMode } from '@/hooks/share/useScreenMode';

export default function SVATSaerchResult({salesVATList}:{salesVATList:SalesVAT[]}){
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const mode = useScreenMode({tabletSize:876, mobileSize:620})

    console.log(salesVATList)
    return(
        <>
        {mode &&
            <table className={`search-result-table  ${mode!=='pc' ? 'mobile':''}`}>
            <colgroup>
                <col style={{width:'5%', minWidth:'60px'}}/>
                <col style={{width:'5%',minWidth:`${mode==='pc' ? 'unset': '65px'}`}}/>
                <col style={{width:'5%', minWidth:`${mode==='pc' ? '63px': (mode==='tabelt' ? '100px':'110px')}`}}/>
                <col style={{width:'25%', minWidth:`${mode==='pc' ? '110px': '63px'}`}}/>
                <col style={{width:'10%',minWidth:`${mode==='pc' ? '105px': '63px'}`}}/>
                <col style={{width:'20%', minWidth:'63px'}}/>
                {mode==='pc' &&<col style={{width:'5%', minWidth:'63px'}}/>}
                {mode==='pc' &&<col style={{width:'5%', minWidth:'63px'}}/>}
                {mode==='pc' && <col style={{width:'5%', minWidth:'70px'}}/>}
                <col style={{width:'1%', minWidth:'37px'}}/>
            </colgroup>
            <thead>
                <tr>
                    <td rowSpan={mode==='pc'? 1:2}>분류</td>
                    <td>날짜</td>
                    {mode==='pc' && <td>입금날짜</td>}
                    <td>상호명</td>
                    {mode==='pc' && <td>사업자등록번호</td>}
                    <td rowSpan={mode==='pc'? 1:2}>결제내역</td>
                    <td>금액</td>
                    {mode==='pc' && <td>부가세</td>}
                    <td rowSpan={mode==='pc'? 1:2}>합계</td>
                    <td rowSpan={mode==='pc'? 1:2}>관리</td>
                </tr>
                {mode!=='pc' &&
                    <tr>
                        <td>입금날짜</td>
                        <td>사업자등록번호</td>
                        <td>부가세</td>
                    </tr>
                }
            </thead>
            {mode==='pc' ?
            <tbody>
                {salesVATList.map((salesVat)=>(
                        <tr key={salesVat.salesVATId} ref={(el)=> {itemsRef.current[salesVat.salesVATId] = el}} className={target === salesVat.salesVATId ?'is-click' :''}>
                        <td>{salesVat.categorySelection}</td>
                        <td style={{color:`${salesVat.paidDate ? 'red':'blue'}`}}>{dayjs(salesVat.date).format('YY.MM.DD')}</td>
                        <td>{salesVat.paidDate? dayjs(salesVat.paidDate).format('YY.MM.DD'):'-'}</td>
                        <td className='left-align'>{salesVat.customerName}</td>
                        <td>{salesVat.businessNumber}</td>
                        <td>{salesVat.paymentDetails}</td>
                        <td className='right-align'>{salesVat.amount.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{salesVat.vat.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{salesVat.total.toLocaleString('ko-KR')}</td>
                        <td className='icon' onClick={()=> target === salesVat.salesVATId ? setTarget(null) :setTarget(salesVat.salesVATId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === salesVat.salesVATId &&{color:'orange'}}/>
                            {target === salesVat.salesVATId && <AccountingOptions id={salesVat.salesVATId} division='svat' paidDate={salesVat.paidDate}/>}
                        </td>
                    </tr>
                ))}
            </tbody>
            :
            salesVATList.map((salesVat)=>(
                <tbody key={salesVat.salesVATId} ref={(el)=> {itemsRef.current[salesVat.salesVATId] = el}} className={target === salesVat.salesVATId ? 'is-click' :''}>
                     <tr>
                        <td rowSpan={2}>{salesVat.categorySelection}</td>
                        <td style={{color:`${salesVat.paidDate ? 'red':'blue'}`}}>{dayjs(salesVat.date).format('YY.MM.DD')}</td>
                        <td>{salesVat.customerName}</td>
                        <td rowSpan={2}>{salesVat.paymentDetails}</td>
                        <td className='right-align'>{salesVat.amount.toLocaleString('ko-KR')}</td>
                        <td rowSpan={2} className='right-align'>{salesVat.total.toLocaleString('ko-KR')}</td>
                        <td rowSpan={2} className='icon' onClick={()=> target === salesVat.salesVATId ? setTarget(null) :setTarget(salesVat.salesVATId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === salesVat.salesVATId &&{color:'orange'}}/>
                            {target === salesVat.salesVATId && <AccountingOptions id={salesVat.salesVATId} division='svat' paidDate={salesVat.paidDate}/>}
                        </td>
                    </tr>
                    <tr>
                        <td>{salesVat.paidDate? dayjs(salesVat.paidDate).format('YY.MM.DD'):'-'}</td>
                        <td>{salesVat.businessNumber}</td>
                        <td className='right-align'>{salesVat.vat.toLocaleString('ko-KR')}</td>
                    </tr>
                </tbody>
            ))}
        </table>    
        }
        </>
    )
}