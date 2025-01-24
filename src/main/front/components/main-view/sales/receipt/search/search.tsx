'use client'

import { useDispatch } from 'react-redux';
import './search.scss';
import '@/styles/_global.scss';
import dayjs from 'dayjs';
import { updateDateId, updateSearchDate } from '@/hooks/redux/slice/calendar-slice';
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function ReceiptSearch() {
    const dispatch = useDispatch()
    const today =dayjs(new Date(Date.now())).format('YYYY-MM-DD')
    const pathname = usePathname()
    //오늘일자
    const todayReceipt= () => {
        dispatch(updateDateId())
        dispatch(updateSearchDate(today))
    }



    return (
        <div className="search-container">
            <table className="search-table">
            <colgroup>
                    <col style={{ width: '8%' }} />
                    <col style={{ width: '72%' }} />
                    <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td colSpan={3} className="table-title center">
                            검색 옵션
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="table-label">전표종류</td>
                        <td className="table-input">
                        <label>
                                    <select name="kindNumSch" size={1}>
                                        <option>전표선택</option>
                                        <option value="sales">매출</option>
                                        <option value="purchase">매입</option>
                                        <option value="deposit">입금</option>
                                        <option value="withdrawal">출금</option>
                                        <option value="sale-discount">매출할인</option>
                                        <option value="purchase-discount">매입할인</option>
                                        <option value="cost">관리비</option>
                                        <option value="return-delivery">반품출고</option>
                                        <option value="sales-replacement">매출대체</option>
                                        <option value="returned-received">반품입고</option>
                                    </select>
                                </label>
                        </td>
                        <td rowSpan={4} className="table-buttons">
                            <button>
                                전 표 검 색
                            </button>
                            <button>
                                <Link href={`${pathname}/daily-summary`}>
                                    일일종합검색
                                </Link>
                            </button>
                            <button onClick={todayReceipt}>
                                오늘일자보기
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">출력일자</td>
                        <td className="table-input">
                            <div className="flex-row">
                                <input className='date-input' type="date" /> ~ <input className='date-input' type="date" />
                               
                            </div>
                        </td>
                        
                    </tr>
                    <tr>
                        <td className="table-label">거래처선택</td>
                        <td className="table-input">
                            <input placeholder="거래처명을 입력하세요." />
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">품목선택</td>
                        <td className="table-input">
                            <input placeholder="품명을 입력하세요." />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}
