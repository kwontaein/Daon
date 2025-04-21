'use client'
import '@/styles/table-style/search-result.scss'

import React, { Fragment } from 'react';
import { ExpenseProof, PurchaseVAT } from '@/model/types/accounting/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import AccountingOptions from '../options';
import dayjs from 'dayjs';
import { useScreenMode } from '@/hooks/share/useScreenMode';

export default function ProofSaerchResult({expenseProofs}:{expenseProofs:ExpenseProof[]}){
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const mode = useScreenMode({tabletSize:846, mobileSize:620})

    return(
        <>
        {mode &&
            <table className={`search-result-table  ${mode!=='pc' ? 'mobile':''}`}>
            <colgroup>
                <col style={{width:'5%', minWidth:'60px'}}/>
                <col style={{width:'10%',minWidth:`${mode==='pc' ? 'unset': '65px'}`}}/>
                <col style={{width:'25%', minWidth:`${mode==='pc' ? '110px': (mode==='tabelt' ? '100px':'110px')}`}}/>
                <col style={{width:'15%', minWidth:`${mode==='pc' ? '80px': '63px'}`}}/>
                <col style={{width:'5%',minWidth:`${mode==='pc' ? '80px': '63px'}`}}/>
                <col style={{width:'5%', minWidth:'63px'}}/>
                {mode==='pc' &&<col style={{width:'5%', minWidth:'63px'}}/>}
                {mode==='pc' && <col style={{width:'15%'}}/>}
                <col style={{width:'1%', minWidth:'37px'}}/>
            </colgroup>
            <thead>
                <tr>
                    <td rowSpan={mode==='pc'? 1:2}>분류</td>
                    <td  rowSpan={mode==='pc'? 1:2}>날짜</td>
                    <td>상호명</td>
                    {mode==='pc' && <td>카드사</td>}
                    <td>금액</td>
                    {mode==='pc' && <td>부가세</td>}
                    <td rowSpan={mode==='pc'? 1:2}>합계</td>
                    <td rowSpan={mode==='pc'? 1:2}>비고</td>
                    <td rowSpan={mode==='pc'? 1:2}>관리</td>
                </tr>
                {mode!=='pc' &&
                    <tr>
                        <td>카드사</td>
                        <td>부가세</td>
                    </tr>
                }
            </thead>
            {mode==='pc' ?
            <tbody>
                {expenseProofs.map((expenseProof)=>(
                    <tr key={expenseProof.expenseProofId} ref={(el)=> {itemsRef.current[expenseProof.expenseProofId] = el}} className={target === expenseProof.expenseProofId ?'is-click' :''}>
                        <td>{expenseProof.categorySelection}</td>
                        <td>{dayjs(expenseProof.date).format('YY.MM.DD')}</td>
                        <td className='left-align'>{expenseProof.customerName}</td>
                        <td>{expenseProof.cardCompany}</td>
                        <td className='right-align'>{expenseProof.amount.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{expenseProof.vat.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{expenseProof.total.toLocaleString('ko-KR')}</td>
                        <td>{expenseProof.note}</td>
                        <td className='icon' onClick={()=> target === expenseProof.expenseProofId ? setTarget(null) :setTarget(expenseProof.expenseProofId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === expenseProof.expenseProofId &&{color:'orange'}}/>
                            {target === expenseProof.expenseProofId && <AccountingOptions id={expenseProof.expenseProofId} division='svat'/>}
                        </td>
                    </tr>
                ))}
            </tbody>
            :
            expenseProofs.map((expenseProof)=>(
                <tbody key={expenseProof.expenseProofId} ref={(el)=> {itemsRef.current[expenseProof.expenseProofId] = el}} className={target === expenseProof.expenseProofId ? 'is-click' :''}>
                     <tr>
                        <td rowSpan={2}>{expenseProof.categorySelection}</td>
                        <td rowSpan={2}>{dayjs(expenseProof.date).format('YY.MM.DD')}</td>
                        <td>{expenseProof.customerName}</td>
                        <td className='right-align'>{expenseProof.amount.toLocaleString('ko-KR')}</td>
                        <td rowSpan={2} className='right-align'>{expenseProof.total.toLocaleString('ko-KR')}</td>
                        <td rowSpan={2}>{expenseProof.note}</td>
                        <td rowSpan={2} className='icon' onClick={()=> target === expenseProof.expenseProofId ? setTarget(null) :setTarget(expenseProof.expenseProofId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === expenseProof.expenseProofId &&{color:'orange'}}/>
                            {target === expenseProof.expenseProofId && <AccountingOptions id={expenseProof.expenseProofId} division='pvat'/>}
                        </td>
                    </tr>
                    <tr>
                        <td>{expenseProof.cardCompany}</td>
                        <td className='right-align'>{expenseProof.vat.toLocaleString('ko-KR')}</td>
                    </tr>
                </tbody>
            ))}
            {expenseProofs.length===0 &&
                <tbody className='none-hover'>
                    <tr className='none-hover'>
                        <td colSpan={mode==='pc' ? 9 : 7}>검색항목이 존재하지 않습니다.</td>
                    </tr>
                </tbody>
            }
        </table>    
        }
        </>
    )
}