'use client'
import '@/styles/table-style/search-result.scss'

import React, { Fragment } from 'react';
import { ProcurementSettlement, PurchaseVAT } from '@/model/types/accounting/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import AccountingOptions from '../options';
import dayjs from 'dayjs';
import { useScreenMode } from '@/hooks/share/useScreenMode';

export default function PsetSaerchResult({procurements}:{procurements:ProcurementSettlement[]}){
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const mode = useScreenMode({tabletSize:846, mobileSize:620})

    return(
        <>
        {mode &&
            <table className={`search-result-table  ${mode!=='pc' ? 'mobile':''}`}>
            <colgroup>
                <col style={{width:'9%'}}></col>
                <col style={{width:'5%' , minWidth:'40px'}}></col>
                <col style={{width:'21%'}}></col>
                <col style={{width:'15%'}}></col>
                <col style={{width: `${mode==='pc' ? '13%':'5%'}`, minWidth:'40px'}}></col>
                {mode==='pc' && <col style={{width:'5%', minWidth:'40px'}}></col>}
                {mode==='pc' && <col style={{width:'9%', minWidth:'40px'}}></col>}
                {mode==='pc' && <col style={{width:'5%', minWidth:'40px'}}></col>}
                {mode==='pc' && <col style={{width:'8%', minWidth:'40px'}}></col>}
                <col style={{width:'8%', minWidth:'40px'}}></col>
                <col style={{width:'1%', minWidth:'35px'}}></col>
            </colgroup>
            <thead>
                <tr>
                    <td rowSpan={mode==='pc'? 1:2}>분류</td>
                    <td rowSpan={mode==='pc'? 1:2}>날짜</td>
                    <td>상호명</td>
                    {mode==='pc' && <td>모델명</td>}
                    <td>매입처</td>
                    {mode==='pc' && <td >인수</td>}
                    <td>수량</td>
                    {mode==='pc' && <td>설치</td>}
                    <td>결제</td>
                    {mode==='pc' && <td>메모</td>}
                    <td rowSpan={mode==='pc'? 1:2}>관리</td>
                </tr>
                {mode!=='pc' &&
                    <tr>
                        <td>모델명</td>
                        <td>인수</td>
                        <td>설치</td>
                        <td>메모</td>
                    </tr>
                }
            </thead>
            {mode==='pc' ?
            <tbody>
                {procurements.map((pset)=>(
                    <tr key={pset.procurementSettlementId} ref={(el)=> {itemsRef.current[pset.procurementSettlementId] = el}} className={target === pset.procurementSettlementId ?'is-click' :''}>
                        <td>{pset.categorySelection}</td>
                        <td>{dayjs(pset.date).format('YY.MM.DD')}</td>
                        <td className='left-align'>{pset.customerName}</td>
                        <td>{pset.modelName}</td>
                        <td className='right-align'>{pset.vendor}</td>
                        <td>{pset.acceptance}</td>
                        <td className='right-align'>{pset.quantity.toLocaleString('ko-KR')}</td>
                        <td>{pset.installation}</td>
                        <td>{pset.payment}</td>
                        <td>{pset.memo}</td>
                        <td className='icon' onClick={()=> target === pset.procurementSettlementId ? setTarget(null) :setTarget(pset.procurementSettlementId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === pset.procurementSettlementId &&{color:'orange'}}/>
                            {target === pset.procurementSettlementId && <AccountingOptions id={pset.procurementSettlementId} division='svat'/>}
                        </td>
                    </tr>
                ))}
            </tbody>
            :
            procurements.map((pset)=>(
                <tbody key={pset.procurementSettlementId} ref={(el)=> {itemsRef.current[pset.procurementSettlementId] = el}} className={target === pset.procurementSettlementId ? 'is-click' :''}>
                    <tr>
                    <td>{pset.categorySelection}</td>
                        <td rowSpan={2}>{dayjs(pset.date).format('YY.MM.DD')}</td>
                        <td rowSpan={2}className='left-align'>{pset.customerName}</td>
                        <td rowSpan={2}className='right-align'>{pset.vendor}</td>
                        <td rowSpan={2} className='right-align'>{pset.quantity.toLocaleString('ko-KR')}</td>
                        <td>{pset.payment}</td>
                        <td className='icon' onClick={()=> target === pset.procurementSettlementId ? setTarget(null) :setTarget(pset.procurementSettlementId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === pset.procurementSettlementId &&{color:'orange'}}/>
                            {target === pset.procurementSettlementId && <AccountingOptions id={pset.procurementSettlementId} division='pset'/>}
                        </td>
                    </tr>
                    <tr>
                        <td>{pset.modelName}</td>
                        <td>{pset.acceptance}</td>
                        <td>{pset.installation}</td>
                        <td>{pset.memo}</td>
                    </tr>
                </tbody>
            ))}
            {procurements.length===0 &&
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