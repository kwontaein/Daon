import dayjs from "dayjs";
import './date-summary.scss';

export default function DateSummary(){
    const date = new Date(Date.now());
    return(
        <table className="summary-container">
            <thead>
                <tr>
                    <td>
                        <b>{dayjs(date).format('YY.M.DD')} 일자 종합</b>
                    </td>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>
                            <p>[전일잔고]</p>
                            <p>2,232,442,111</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[매입]</p>
                            <p>0</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[매출]</p>
                            <p>0</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[입금]</p>
                            <p>0</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[출금]</p>
                            <p>0</p>
                        </td>
                    </tr>
                    <tr>
                       <td>
                            <p>[경비]</p>
                            <p>0</p>
                       </td>
                    </tr>
                    <tr>
                        <td>
                            <p>[잔고]</p>
                            <b>0</b>
                        </td>
                    </tr>
            </tbody>
        </table>
    )
}