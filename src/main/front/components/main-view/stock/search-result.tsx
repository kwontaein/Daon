"use client";
import './search-result.scss';

import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '@/hooks/redux/store';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import useCheckBoxState from '@/hooks/share/useCheckboxState';

import Pagination from '@/components/pagination';

import { RequestSearchStock, ResponseStock } from '@/types/stock/types';
import StockOptions from './options';



export default function StockSearchResult({initialStocks, page}:{initialStocks:ResponseStock[], page:number}){
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const [stocks, setStocks] = useState<ResponseStock[]>(initialStocks)
    const [pageByStock, setPageByStock] = useState<ResponseStock[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);

    
    //router control
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
  
    const stockIdList = pageByStock.map((({stockId})=> stockId))
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(stockIdList)
    const {postSearchInfo, isSearch, allView} = useSelector((state:RootState)=> state.stockSearch);

    const fetchSearchStocks = useCallback(async (searchCondition: RequestSearchStock) => {
        try {
            const response = await fetch("http://localhost:8080/api/getStockList", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchCondition),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const text = await response.text();
            setStocks(text ? JSON.parse(text) : []);
        } catch (error) {
            console.error('Error:', error);
        }
    }, []);
    
    //if start search then retry settings stock data
    useEffect(() => {
        if (isSearch || allView) {
            if (isSearch) {
                const { category, isRemain, isStockUseEa, isConditionSearch, searchInput } = postSearchInfo;
                fetchSearchStocks({
                    condition: isConditionSearch,
                    category: category === 'none' ? null : category,
                    remain: isRemain,
                    stockUseEa: isStockUseEa,
                    name: searchInput,
                    receiptCategory: 'DEPOSIT',
                });
            } else if (allView) {
                setStocks(initialStocks);
            }

            const params = new URLSearchParams(searchParams.toString());
            params.delete("page");
            router.push(`${pathname}?${params.toString()}`);
        }
    }, [isSearch, allView, fetchSearchStocks]);

    useEffect(()=>{
        setPageByStock(stocks.slice((page-1)*20, ((page-1)*20)+20))
        setLoading(false)
    },[stocks, page])

    
    const tableRender = useMemo(()=>{
        return(
            <>
            <table className="stock-result-table">
                <colgroup>
                        <col style={{ width: '1%' }} />
                        <col style={{ width: '15%', minWidth:'40px'}} />
                        <col style={{ width: '28%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '11%' }} />
                        <col style={{ width: '11%' }} />
                        <col style={{ width: '3%', minWidth: '32px' }} />
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
                    {pageByStock.map((stock:ResponseStock, index) => (
                        <tr key={index} ref={(el)=> {itemsRef.current[stock.stockId] = el}} className={target === stock.stockId ?'is-click' :''}>
                            <td><input type="checkbox" 
                                       checked={checkedState[stock.stockId]|| false} 
                                       onChange={update_checked.bind(null,stock.stockId)}/>
                            </td>
                            <td>{stock.category?.stockCateName || ''}</td>
                            <td className='left-align'>{stock.name}</td>
                            <td>{stock.modelName}</td>
                            <td>{stock.quantity}</td>
                            <td>{stock.outPrice}</td>
                            <td className='icon' onClick={()=> target === stock.stockId ? setTarget(null) :setTarget(stock.stockId)}>
                                <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === stock.stockId &&{color:'orange'}}/>
                                {target === stock.stockId && <StockOptions stockId={stock.stockId}/>}
                            </td>
                        </tr>
                    ))}
                    {!loading && pageByStock.length===0 && 
                        <tr  className={'none-hover'}>
                            <td colSpan={9}>
                                <p>조회된 결과가 없습니다.</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {!loading  &&
                <Pagination
                    totalItems={stocks.length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}
                />
            }
        </>
        )
    },[pageByStock,target,loading])


    return(
       <>
        {tableRender}
       </>
    )
}

