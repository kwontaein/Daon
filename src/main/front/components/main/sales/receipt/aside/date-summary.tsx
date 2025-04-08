import dayjs from "dayjs";
import './date-summary.scss';
import { ResponseReceiptTotal } from "@/model/types/sales/receipt/type";

export default function DateSummary({receiptTotal}:{receiptTotal:ResponseReceiptTotal}){

    return(
        <table className="summary-container">
            <thead>
                <tr>
                    <td>
                        <b>{dayjs(receiptTotal?.date?? new Date(Date.now())).format('YY.M.DD')} 일자 종합</b>
                    </td>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>
                            <p>[전일잔고]</p>
                            <p>{(receiptTotal?.beforeTotal?? 0).toLocaleString('ko-KR') ?? 0}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[매입]</p>
                            <p>{(receiptTotal?.purchase?? 0).toLocaleString('ko-KR') ?? 0}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[매출]</p>
                            <p>{(receiptTotal?.sales?? 0).toLocaleString('ko-KR') ?? 0}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[입금]</p>
                            <p>{(receiptTotal?.withdrawal?? 0).toLocaleString('ko-KR') ?? 0}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[출금]</p>
                            <p>{(receiptTotal?.deposit?? 0).toLocaleString('ko-KR') ?? 0}</p>
                        </td>
                    </tr>
                    <tr>
                       <td>
                            <p>[경비]</p>
                            <p>{(receiptTotal?.official?? 0).toLocaleString('ko-KR') ?? 0}</p>
                       </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[잔고]</p>
                            <b>{(receiptTotal?.remainTotal?? 0).toLocaleString('ko-KR') ?? 0}</b>
                        </td>
                    </tr>
            </tbody>
        </table>
    )
}