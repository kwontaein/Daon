import { CustomerCate } from '@/model/types/customer/cate/type'
import '@/styles/table-style/search.scss'
export default function TaskSearch({customerCate}:{customerCate:CustomerCate[]}){
    return(
        <section className='search-container'>
            <table className='search-table'>
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '70%' }} />
                    <col style={{ width: '1%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td colSpan={3} className="table-title">
                        검색옵션
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='table-label'>구분/담당자</td>
                        <td className='td-gap'>
                            <select>
                                <option value='none'>구분</option>
                                <option value='AS'>A/S</option>
                                <option value='INCOMING'>입고</option>
                                <option value='DELIVERY'>납품</option>
                                <option value='INVENTORY'>재고</option>
                                <option value='OTHER'>기타</option>
                                <option value='RENTAL'>임대</option>
                                <option value='MAINTENANCE'>유지보수</option>
                                <option value='ATTENDANCE'>근태</option>
                            </select>         
                            <select>
                                <option value='none'>담당자구분</option>
                                <option value='햄부기'>햄부기</option>
                            </select>
                        </td>
                        <td rowSpan={3}>
                            <div  className='grid-table-buttons'>
                                <button>검&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                                <button>엑셀변환</button>
                                <button>업무등록</button>
                                <button>체크삭제</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처분류</td>
                        <td>
                            <label>
                                <select size={1}>
                                        <option value='none'>선택안함</option>
                                        {customerCate.map((cate)=>(
                                            <option key={cate.customerCateId} value={cate.customerCateId}>
                                                    {cate.customerCateName}
                                            </option>
                                        ))}
                                </select>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처명</td>
                        <td><input type='text'/></td>
                    </tr>
                </tbody>
            </table> 
        </section>

    )
}