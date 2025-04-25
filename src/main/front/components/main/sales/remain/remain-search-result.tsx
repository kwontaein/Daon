import '@/styles/table-style/search-result.scss'
import { ResponseRemain } from "@/model/types/sales/remain/type";
import { useScreenMode } from '@/hooks/share/useScreenMode';
import dayjs from 'dayjs';

export default function ReaminSearchResult({remainList}:{remainList:ResponseRemain[]}){
    const mode = useScreenMode({tabletSize:820, mobileSize:620})
    
    return(
        <>
            <h3 className='search-title'>거래처별 잔액 명세서</h3>
            <div className='search-date-container'>{`Date : ${dayjs(new Date()).format('YYYY.MM.DD HH:mm:ss')}`}</div>
            <table className={`search-result-table ${mode!=='pc' ? 'mobile': undefined}`}>
                <thead>
                    <tr>
                        <td rowSpan={mode==='pc' ? 1 : 2}>상호명</td>
                        <td rowSpan={mode==='pc' ? 1 : 2}>전기이월</td>
                        <td>매출</td>
                        <td>수금</td>
                        {mode==='pc' && <td>매입</td>}
                        {mode==='pc' && <td>지급</td>}
                        <td>매출할인</td>
                        {mode==='pc' && <td>매입할인</td>}
                        <td rowSpan={mode==='pc' ? 1 : 2}>잔액</td>
                    </tr>
                    {mode!=='pc' &&
                        <tr>
                            <td>매입</td>
                            <td>지급</td>
                            <td>매입할인</td>
                        </tr>    
                    }
                </thead>
                {mode==='pc' ?
                    <tbody>
                        {remainList.map((remain,idx)=>(
                            <tr key={idx}>
                                <td>{remain.customerName}</td>
                                <td className='right-align'>{(remain.previousBalance??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.sales??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.deposit??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.purchase??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.withdrawal??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.salesDC??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.purchaseDC??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.currentBalance??0).toLocaleString('ko-KR')}</td>
                            </tr>
                        ))}
                    </tbody>
                    :
                    remainList.map((remain,idx)=>(
                        <tbody key={idx}>
                        <tr>
                                <td rowSpan={2}>{remain.customerName}</td>
                                <td rowSpan={2} className='right-align'>{(remain.previousBalance??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.sales??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.deposit??0).toLocaleString('ko-KR')}</td>
                                <td className='right-align'>{(remain.salesDC??0).toLocaleString('ko-KR')}</td>
                                <td rowSpan={2} className='right-align'>{(remain.currentBalance??0).toLocaleString('ko-KR')}</td>
                        </tr>
                        <tr>
                            <td className='right-align'>{(remain.purchase??0).toLocaleString('ko-KR')}</td>
                            <td className='right-align'>{(remain.withdrawal??0).toLocaleString('ko-KR')}</td>
                            <td className='right-align'>{(remain.purchaseDC??0).toLocaleString('ko-KR')}</td>
                        </tr>
                        </tbody>))}
            </table>
        </>
    )
}