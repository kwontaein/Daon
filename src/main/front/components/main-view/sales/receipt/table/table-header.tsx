import './table-header.scss'

export default function ReceiptTableHeader({children}:{children:React.ReactNode}){
    return(
        <table>
            <colgroup>
                <col style={{ width: '4%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '26%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
            </colgroup>
            <thead>
                <tr>
                    <td rowSpan={2}>NO</td>
                    <td rowSpan={2}>날짜</td>
                    <td rowSpan={2}>계정전표</td>
                    <td>거래처</td>
                    <td>비고</td>
                    <td>단가</td>
                    <td>금액</td>
                </tr>
                <tr>
                    <td>품명</td>
                    <td>수량</td>
                    <td colSpan={2}>적요</td>
                </tr>
            </thead>
            {children}
        </table>
    )
}