import '@/styles/table-style/search-result.scss';

export default function EstimateSearchResult({pageByEstimateItems}){
    return(
        <table className="search-result-table">
              <colgroup>
                <col style={{ width: '5%', minWidth:'60px'}} />
                <col style={{ width: '5%', minWidth:'60px' }} />
                <col style={{ width: '60%' }} />
                <col style={{ width: '10%', minWidth:'100px'}} />
                <col style={{ width: '5%', minWidth:'60px'}} />
                <col style={{ width: '10%' }} />
            </colgroup>
            <thead>
                <tr>
                    <td>일자</td>
                    <td>사업자</td>
                    <td>거래처명 </td>
                    <td>합계금액</td>
                    <td>담당자</td>
                    <td>관리</td>
                </tr>
            </thead>
            <tbody>
                {pageByEstimateItems.length===0 &&
                    <tr>
                        <td colSpan={6}>조회된 견적서가 존재하지 않습니다.</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}