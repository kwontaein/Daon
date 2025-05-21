import React from "react";
import "/styles/test/daonDocu.scss";
import {EstimateData} from "@/public/docu/docuReact/estimatePrintInterface";

const BarunDocu: React.FC<{ data: EstimateData }> = ({data}) => {
    return (
        <div className="wrap" style={{marginTop: 75}}>
            <table className="wrapTable">
                <tbody>
                <tr>
                    <td height="30"></td>
                </tr>
                <tr>
                    <td className="center">
              <span id="docuTitle" style={{fontSize: 30}}>
                [ 견&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;서 ]
              </span>
                    </td>
                </tr>
                <tr>
                    <td height="30"></td>
                </tr>
                <tr>
                    <td>
                        <table className="infoTable2" style={{height: 120}}>
                            <colgroup>
                                <col width="47%"/>
                                <col width="2%"/>
                                <col width="4%"/>
                                <col width="10%"/>
                                <col width="7%"/>
                                <col width="6%"/>
                                <col width="5%"/>
                                <col width="8%"/>
                                <col width="8%"/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <td className="underline right" style={{textAlign: "center"}}>
                                    <span id="estimateDate">{data.estimateDate}</span>
                                </td>
                                <td></td>
                                <th
                                    rowSpan={6}
                                    style={{border: "2px solid #000", borderRight: "1px dotted"}}>
                                    <p>공</p>
                                    <p>급</p>
                                    <p>자</p>
                                </th>
                                <th
                                    colSpan={1}
                                    style={{borderTop: "2px solid #000", borderRight: "1px dotted"}}
                                >
                                    등록번호
                                </th>
                                <td
                                    colSpan={5}
                                    style={{
                                        border: "2px solid #000",
                                        borderBottom: 0,
                                        borderLeft: 0,
                                    }}
                                >
                                    &nbsp;<span id="busiNum">{data.busiNum}</span>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <th colSpan={1} style={{border: "1px dotted"}}>
                                    상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호
                                </th>
                                <td colSpan={2} className="left" style={{border: "1px dotted #000", borderLeft: 0}}>
                                    &nbsp;<a id="companyName" style={{letterSpacing: 0}}>{data.companyName}</a>
                                </td>
                                <th colSpan={1} style={{border: "1px dotted #000"}}>
                                    성명
                                </th>
                                <td colSpan={2} className="left"
                                    style={{border: "1px dotted #000", borderRight: "2px solid #000"}}>
                                    &nbsp;<a id="ceoName" style={{letterSpacing: 0}}>{data.ceoName}</a>(인)
                                </td>
                            </tr>
                            <tr>
                                <td className="underline right" style={{textAlign: "center"}}>
                                    <a id="customerName">{data.customerName}</a>&nbsp;귀하
                                </td>
                                <td></td>
                                <th colSpan={1} style={{border: "1px dotted #000"}}>
                                    사업장주소
                                </th>
                                <td colSpan={5} className="left" style={{borderRight: "2px solid #000"}}>
                                    &nbsp;<a id="addr">{data.addr}</a>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <th colSpan={1} style={{border: "1px dotted #000", borderLeft: 0}}>
                                    업&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;태
                                </th>
                                <td colSpan={2} className="left" style={{border: "1px dotted #000", borderLeft: 0}}>
                                    &nbsp;도매및소매업
                                </td>
                                <th colSpan={1} style={{border: "1px dotted #000", borderLeft: 0, borderRight: 0}}>
                                    종목
                                </th>
                                <td colSpan={2} className="left"
                                    style={{border: "1px dotted #000", borderRight: "2px solid #000"}}>
                                    &nbsp;컴퓨터및주변기기
                                </td>
                            </tr>
                            <tr>
                                <td className="left">아래와 같이 견적합니다.</td>
                                <td></td>
                                <th colSpan={1}
                                    style={{borderBottom: "2px solid #000", borderRight: "1px dotted #000"}}>
                                    전화번호
                                </th>
                                <td colSpan={2} className="left" style={{borderBottom: "2px solid #000"}}>
                                    &nbsp;<a id="companyTel">{data.companyTel}</a>
                                </td>
                                <th
                                    colSpan={1}
                                    style={{
                                        borderBottom: "2px solid #000",
                                        borderLeft: "1px dotted #000",
                                        borderRight: "1px dotted #000",
                                    }}
                                >
                                    팩스
                                </th>
                                <td colSpan={2} className="left"
                                    style={{borderBottom: "2px solid #000", borderRight: "2px solid #000"}}>
                                    &nbsp;<a id="companyFax">{data.companyFax}</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="20"></td>
                </tr>
                <tr>
                    <td>
                        <div className="priceLeft2">&nbsp;합계금액</div>
                        <div className="priceRight">
                            일금&nbsp;<span id="hangulTotalPrice">{data.hangulTotalPrice}</span>
                            <p style={{fontSize: 11}}>(부가가치세는 포함입니다.)</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table className="dataTable">
                            <colgroup>
                                <col width="30%"/>
                                <col width="20%"/>
                                <col width="10%"/>
                                <col width="15%"/>
                                <col width="15%"/>
                                <col width="10%"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th style={{borderBottom: "1px double #000", borderLeft: 0}}>품 목</th>
                                <th style={{borderBottom: "1px double #000"}}>규 격</th>
                                <th style={{borderBottom: "1px double #000"}}>수 량</th>
                                <th style={{borderBottom: "1px double #000"}}>단 가</th>
                                <th style={{borderBottom: "1px double #000"}}>공급금액</th>
                                <th style={{borderBottom: "1px double #000", borderRight: 0}}>비 고</th>
                            </tr>
                            </thead>
                            <tbody>
                            {[...data.items, ...Array(17 - data.items.length).fill({})].map((stock, index) => (
                                <tr key={index} style={{borderTop: index === 0 ? "1px solid #000" : undefined}}>
                                    <td style={{borderLeft: 0}}>
                                        <span id={`stockName_${index}`}>{stock.stockName}</span>
                                    </td>
                                    <td>
                                        <span id={`stockStandard_${index}`}>{stock.stockStandard}</span>
                                    </td>
                                    <td>
                                        <span id={`stockEa_${index}`}>{stock.stockEa}</span>
                                    </td>
                                    <td>
                                        <span id={`stockUnitPrice_${index}`}>{stock.stockUnitPrice}</span>
                                    </td>
                                    <td>
                                        <span id={`stockTotalPrice_${index}`}>{stock.stockTotalPrice}</span>
                                    </td>
                                    <td style={{borderRight: 0}}>
                                        <span id={`note_${index}`}>{stock.note || "\u00A0"}</span>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} style={{textAlign: "center", borderLeft: 0}}>
                                    합계금액
                                </td>
                                <td style={{borderRight: 0}}>
                                    <span id="totalPrice">{data.totalPrice}</span>
                                </td>
                                <td style={{borderRight: 0}}></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table className="infoTable" style={{borderTop: "none"}}>
                            <tbody>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    결제계좌 : 우리은행 1005-704-478518 &nbsp; 예금주 : 전경자
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style={{borderTop: "1px solid black", height: "100px"}}>
                    <td>
                        <table className="infoTable">
                            <tbody>
                            <tr>
                                <td style={{textAlign: "left"}}>
                                    비&nbsp;&nbsp;&nbsp;고 :
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BarunDocu;