'use client';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useItemSelection } from '@/hooks/share/useItemSelection';
import { ResponseEstimate } from '@/model/types/sales/estimate/type';
import '@/styles/table-style/search-result.scss';
import dayjs from 'dayjs';
import React from 'react';
import EstimateOptions from '../options';
import { apiUrl } from '@/model/constants/apiUrl';

export default function EstimateSearchResult({pageByEstimate, isTask} : {
    pageByEstimate: ResponseEstimate[],
    isTask: boolean
}) {
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);

      //TODO: add mobile version
    const viewTransEstimateHandler = (estimateId:string)=>{
        if(window.innerWidth>620){
            const params = new URLSearchParams
            params.set("target",estimateId)
            const url = `${apiUrl}/trans-estimate?${params.toString()}`;
            const popupOptions = "width=800,height=400,scrollbars=yes,resizable=yes"; 
            window.open(url, "PopupWindow", popupOptions);
        }
    }

    return(
        <table className="search-result-table">
              <colgroup>
                <col style={{ width: '5%', minWidth:'60px'}} />
                <col style={{ width: '15%', minWidth:'80px' }} />
                <col style={{ width: '55%' }} />
                <col style={{ width: '10%', minWidth:'100px'}} />
                <col style={{ width: '5%', minWidth:'60px'}} />
                {isTask && <col style={{ width: '5%', minWidth:'80px'}}/>}
                <col style={{ width: '1%', minWidth:'40px' }} />
            </colgroup>
            <thead>
                <tr>
                    <td>일자</td>
                    <td>사업자</td>
                    <td>거래처명 </td>
                    <td>합계금액</td>
                    <td>담당자</td>
                    {isTask && <td>상태</td>}
                    <td>관리</td>
                </tr>
            </thead>
            <tbody>
                {pageByEstimate.map((estimate)=>(
                    <tr key={estimate.estimateId} ref={(el)=>{itemsRef.current[estimate.estimateId] = el}}  className={target === estimate.estimateId ?'is-click' :''}>
                        <td>{dayjs(estimate.estimateDate).format('YY.M.DD')}</td>
                        <td>{estimate.company.companyName}</td>
                        <td className='left-align'>{estimate.customerName}</td>
                        <td className='right-align'>{estimate.totalAmount.toLocaleString('ko-KR')}</td>
                        <td>{estimate.userName}</td>
                        {isTask &&
                        <td>
                            {estimate.receipted ? 
                                <>{estimate.receiptDate}</>
                                :
                                <button onClick={viewTransEstimateHandler.bind(null,estimate.estimateId)}>전표전환</button>
                            }
                        </td> 
                        }
                        <td className='icon' onClick={()=> target === estimate.estimateId ? setTarget(null) :setTarget(estimate.estimateId)}>
                            <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === estimate.estimateId &&{color:'orange'}}/>
                            {target === estimate.estimateId && <EstimateOptions estimateId={estimate.estimateId} receipted={estimate.receipted}/>}
                        </td>
                    </tr>
                ))}
                {pageByEstimate.length===0 &&
                    <tr className='none-hover'>
                        <td colSpan={6}>
                            조회된 견적서가 존재하지 않습니다.
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    )
}