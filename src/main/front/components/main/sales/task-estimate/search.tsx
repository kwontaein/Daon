import CustomDateInput from '@/components/share/custom-date-input/custom-date-input';
import '@/styles/table-style/search.scss';

export default function EstimateSearch(){
    return(
        <div className="search-container">
            <table className="search-table">
            <colgroup>
                    <col style={{ width: '8%' }} />
                    <col style={{ width: '72%' }} />
                    <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td colSpan={3} className="table-title">
                            검색 옵션
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="table-label">사업자</td>
                        <td>
                        <label>
                                <select name="kindNumSch" size={1}>
                                    <option>사업자선택</option>
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
                                검 색
                            </button>
                            <button>
                                    전체보기
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">출력일자</td>
                        <td>
                            <span className='dates-container'>
                                <CustomDateInput defaultValue={new Date()} name='searchSDate'/> ~ <CustomDateInput defaultValue={new Date()} name='searchEDate'/>
                            </span>
                        </td>
                        
                    </tr>
                    <tr>
                        <td className="table-label">거래처선택</td>
                        <td>
                            <input placeholder="거래처명을 입력하세요." />
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">품목선택</td>
                        <td>
                            <input placeholder="품명을 입력하세요." />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}