"use client";
import '@/styles/table-style/search-result.scss';

import React from 'react';

import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useItemSelection } from '@/hooks/share/useItemSelection';
import useCheckBoxState from '@/hooks/share/useCheckboxState';


import { ResponseStock } from '@/model/types/stock/stock/types';
import StockOptions from './options';



const StockSearchResult = React.memo(({pageByStocks}:{pageByStocks:ResponseStock[]})=>{
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);

    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);

    const stockIdList = pageByStocks.map(({stockId})=> stockId)
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(stockIdList)

    return(
       <>
         <table className="search-result-table">
                <colgroup>
                        <col style={{ width: '1%' }} />
                        <col style={{ width: '15%', minWidth:'40px'}} />
                        <col style={{ width: '28%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '11%' }} />
                        <col style={{ width: '11%' }} />
                        <col style={{ width: '3%', minWidth: '34px'}} />
                </colgroup>
                <thead>
                    <tr>
                        <td><input type="checkbox" onChange={toggleAllChecked} checked={isAllChecked}/></td>
                        <td>분류</td>
                        <td>품명</td>
                        <td>규격</td>
                        <td>재고</td>
                        <td>출고가</td>
                        <td>옵션</td>
                    </tr>
                </thead>
                <tbody>
                    {pageByStocks.map((stock:ResponseStock, index) => (
                        <tr key={index} ref={(el)=> {itemsRef.current[stock.stockId] = el}} className={target === stock.stockId ?'is-click' :''}>
                            <td><input type="checkbox" 
                                       checked={checkedState[stock.stockId]|| false} 
                                       onChange={update_checked.bind(null,stock.stockId)}/>
                            </td>
                            <td>{stock.category?.stockCateName || ''}</td>
                            <td className='left-align'>{stock.productName}</td>
                            <td>{stock.modelName}</td>
                            <td>{stock.quantity}</td>
                            <td>{stock.outPrice.toLocaleString('ko-KR')}</td>
                            <td className='icon' onClick={()=> target === stock.stockId ? setTarget(null) :setTarget(stock.stockId)}>
                                <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === stock.stockId &&{color:'orange'}}/>
                                {target === stock.stockId && <StockOptions stockId={stock.stockId} productName={stock.productName} modelName={stock.modelName}/>}
                            </td>
                        </tr>
                    ))}
                    {pageByStocks.length===0 && 
                        <tr  className={'none-hover'}>
                            <td colSpan={9}>
                                <p>조회된 결과가 없습니다.</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
       </>
    )
})

export default StockSearchResult;
