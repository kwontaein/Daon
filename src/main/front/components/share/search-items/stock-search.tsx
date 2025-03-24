'use client'
import '@/styles/table-style/search-result.scss';
import '@/styles/form-style/form.scss';
import '@/styles/_global.scss'
import asideArrow from '@/assets/aside-arrow.gif';

import Pagination from '../pagination';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ResponseStock } from '@/model/types/stock/stock/types';
export default function StockSearchItems({stocks, page, pageLength} : {
    stocks: ResponseStock[],
    page: number,
    pageLength: number
}) {
    const [idx, setIdx] = useState<number>(0)
    const selectValue = (stock: ResponseStock) => {
        const message ={
            ...stock,
        }
        if (window.opener) {
          window.opener.postMessage(message, "*");
          window.close();
        }
    };
      
    const handleKeyDown = (event: KeyboardEvent) => {
        // 방향키를 눌렀을 때 반응
        if (event.key === "ArrowUp") {
          setIdx((prev)=>{
             return idx <= 0 ? 19 : prev-1
          })
        } else if (event.key === "ArrowDown") {
            setIdx((prev)=>{
                return idx >= stocks.length -1 ? 0 : prev+1
             })
        } else if (event.key === "Enter"){
            selectValue(stocks[idx])
        }
      };

      useEffect(()=>{
        setIdx(0)
      },[stocks])
    
      useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [idx]);

    return(
        <section style={{padding:'5px'}}>
            <header className="register-header">
                    <Image src={asideArrow} alt=">" width={15}/>
                    <h4>거래처 조회결과</h4>
            </header>
            <table className='search-result-table'>
                <colgroup>
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td>품명</td>
                        <td>규격</td>
                        <td>재고</td>
                        <td>소비가</td>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock,index) => (
                        <tr
                            key={stock.stockId}
                            onClick={()=>setIdx(index)}
                            onDoubleClick={()=>selectValue(stock)}
                            className={idx === index ? 'is-click' :''}
                            style={{cursor:'pointer'}}> 
                            <td className='left-align'>{stock.productName}</td>
                            <td>{stock.modelName}</td>
                            <td>{stock.quantity.toLocaleString('ko-KR')}</td>
                            <td>{stock.outPrice.toLocaleString('ko-KR')}</td>
                        </tr>
                    ))}
                    {stocks.length ===0 &&
                        <tr className='none-hover'>
                        <td colSpan={4}>
                            <p style={{fontSize:'14px'}}>조회된 결과가 없습니다.</p>
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
            <Pagination
                        totalItems={pageLength}
                        itemCountPerPage={20} 
                        pageCount={5} 
                        currentPage={Number(page)}/>
        </section>
    )
}