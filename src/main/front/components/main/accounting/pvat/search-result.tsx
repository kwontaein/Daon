'use client'
import '@/styles/table-style/search-result.scss'

import React, { Fragment } from 'react';
import { PurchaseVAT } from '@/model/types/accounting/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import AccountingOptions from '../options';
import dayjs from 'dayjs';
import { useScreenMode } from '@/hooks/share/useScreenMode';

export default function PVATSaerchResult({purchaseVATList}:{purchaseVATList:PurchaseVAT[]}){
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
                    {mode==='pc' && <td>사업자번호</td>}
                    <td>금액</td>
                    {mode==='pc' && <td>부가세</td>}
                    <td rowSpan={mode==='pc'? 1:2}>합계</td>
                    <td rowSpan={mode==='pc'? 1:2}>비고</td>
                    <td rowSpan={mode==='pc'? 1:2}>관리</td>
                </tr>
                {mode!=='pc' &&
                    <tr>
                        <td>사업자번호</td>
                        <td>부가세</td>
                    </tr>
                }
            </thead>
            {mode==='pc' ?
            <tbody>
                {purchaseVATList.map((purchaseVAT)=>(
                    <tr key={purchaseVAT.purchaseVATId} ref={(el)=> {itemsRef.current[purchaseVAT.purchaseVATId] = el}} className={target === purchaseVAT.purchaseVATId ?'is-click' :''}>
                        <td>{purchaseVAT.categorySelection}</td>
                        <td>{dayjs(purchaseVAT.date).format('YY.MM.DD')}</td>
                        <td className='left-align'>{purchaseVAT.customerName}</td>
                        <td>{purchaseVAT.businessNumber}</td>
                        <td className='right-align'>{purchaseVAT.amount.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{purchaseVAT.vat.toLocaleString('ko-KR')}</td>
                        <td className='right-align'>{purchaseVAT.total.toLocaleString('ko-KR')}</td>
                        <td>{purchaseVAT.note}</td>
                        <td className='icon' onClick={()=> target === purchaseVAT.purchaseVATId ? setTarget(null) :setTarget(purchaseVAT.purchaseVATId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === purchaseVAT.purchaseVATId &&{color:'orange'}}/>
                            {target === purchaseVAT.purchaseVATId && <AccountingOptions id={purchaseVAT.purchaseVATId} division='svat'/>}
                        </td>
                    </tr>
                ))}
            </tbody>
            :
            purchaseVATList.map((purchaseVAT)=>(
                <tbody key={purchaseVAT.purchaseVATId} ref={(el)=> {itemsRef.current[purchaseVAT.purchaseVATId] = el}} className={target === purchaseVAT.purchaseVATId ? 'is-click' :''}>
                     <tr>
                        <td rowSpan={2}>{purchaseVAT.categorySelection}</td>
                        <td rowSpan={2}>{dayjs(purchaseVAT.date).format('YY.MM.DD')}</td>
                        <td>{purchaseVAT.customerName}</td>
                        <td className='right-align'>{purchaseVAT.amount.toLocaleString('ko-KR')}</td>
                        <td rowSpan={2} className='right-align'>{purchaseVAT.total.toLocaleString('ko-KR')}</td>
                        <td rowSpan={2}>{purchaseVAT.note}</td>
                        <td rowSpan={2} className='icon' onClick={()=> target === purchaseVAT.purchaseVATId ? setTarget(null) :setTarget(purchaseVAT.purchaseVATId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === purchaseVAT.purchaseVATId &&{color:'orange'}}/>
                            {target === purchaseVAT.purchaseVATId && <AccountingOptions id={purchaseVAT.purchaseVATId} division='pvat'/>}
                        </td>
                    </tr>
                    <tr>
                        <td>{purchaseVAT.businessNumber}</td>
                        <td className='right-align'>{purchaseVAT.vat.toLocaleString('ko-KR')}</td>
                    </tr>
                </tbody>
            ))}
            {purchaseVATList.length===0 &&
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