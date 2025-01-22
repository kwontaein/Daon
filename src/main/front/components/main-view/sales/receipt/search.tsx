import './search.scss';
import '@/styles/_global.scss';

export default function ReceiptSearch() {

    return (
        <div className="search-container">
            <table className="search-table">
                <tbody>
                    <tr>
                        <td rowSpan={3} className="table-title center">
                            검색<br />
                            옵션
                        </td>
                        <td className="table-label">출력일자</td>
                        <td className="table-input">
                            <div className="flex-row">
                                <input type="date" /> ~ <input type="date" />
                                <label>
                                    <select name="kindNumSch" size={1}>
                                        <option>전표종류</option>
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
                            </div>
                        </td>
                        <td rowSpan={3} className="table-buttons pc">
                            <button>전 표 검 색</button>
                            <button>오늘일자보기</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">거래처 선택</td>
                        <td className="table-input">
                            <input placeholder="'거래처명'을 넣어주세요." />
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">품목 선택</td>
                        <td className="table-input">
                            <input placeholder="'품명'을 넣어주세요." />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="table-buttons mobile">
                            <button>오늘일자</button>
                            <button>전표검색</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}
