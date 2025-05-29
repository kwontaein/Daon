'use client'
import '@/styles/table-style/search-result.scss';
import '@/styles/form-style/form.scss';
import '@/styles/_global.scss'
import asideArrow from '@/public/assets/aside-arrow.gif';

import Pagination from '../pagination';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ResponseStock } from '@/model/types/stock/stock/types';
import { useModalState } from '@/store/zustand/modal';
import { useRouter } from 'next/navigation';

export default function StockSearchItems({
  stocks,
  page,
  pageLength
}: {
  stocks: ResponseStock[],
  page: number,
  pageLength: number
}) {
  const [idx, setIdx] = useState<number>(0);
  const { searchKeyword, setModalState } = useModalState();
  const router = useRouter();

  const selectValue = useCallback((stock: ResponseStock) => {
    if (searchKeyword) {
      setModalState({ stock });
      router.back();
    } else {
      const message = { ...stock };
      if (window.opener) {
        window.opener.postMessage(message, "*");
        window.close();
      }
    }
  }, [searchKeyword, setModalState, router]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      setIdx(prev => (prev <= 0 ? 19 : prev - 1));
    } else if (event.key === "ArrowDown") {
      setIdx(prev => (prev >= stocks.length - 1 ? 0 : prev + 1));
    } else if (event.key === "Enter") {
      selectValue(stocks[idx]);
    }
  }, [stocks, idx, selectValue]);

  useEffect(() => {
    setIdx(0);
  }, [stocks]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <section style={{ padding: '5px' }}>
      <header className="register-header">
        <Image src={asideArrow} alt=">" width={15} />
        <h4>물품 조회결과</h4>
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
          {stocks.map((stock, index) => (
            <tr
              key={stock.stockId}
              onClick={() => setIdx(index)}
              onDoubleClick={() => selectValue(stock)}
              className={idx === index ? 'is-click' : ''}
              style={{ cursor: 'pointer' }}
            >
              <td className='left-align'>{stock.productName}</td>
              <td>{stock.modelName}</td>
              <td>{stock.quantity.toLocaleString('ko-KR')}</td>
              <td>{stock.outPrice.toLocaleString('ko-KR')}</td>
            </tr>
          ))}
          {stocks.length === 0 &&
            <tr className='none-hover'>
              <td colSpan={4}>
                <p style={{ fontSize: '14px' }}>조회된 결과가 없습니다.</p>
              </td>
            </tr>
          }
        </tbody>
      </table>
      <Pagination
        totalItems={pageLength}
        itemCountPerPage={20}
        pageCount={5}
        currentPage={Number(page)}
        isModal={!!searchKeyword}
      />
    </section>
  );
}
