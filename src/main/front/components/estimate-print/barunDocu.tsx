import React from "react";
import "./barunDocu.scss";
import { printEstimateType } from "@/model/types/print-estimate/type";

import dayjs from "dayjs";
import { changeNumberToKorean } from "@/features/share/numberToKorean";
import Image from "next/image";

const BarunDocu: React.FC<{ printEstimate: printEstimateType}> = ({printEstimate}) => {
    return (
        <div className="wrap barundocu-container" style={{marginTop:'75px'}}>
            <table className="barundocu-wrapTable">
                <tbody>
                <tr>
                    <td height="30"></td>
                </tr>
                <tr>
                    <td className="center">
                    <span id="docuTitle" style={{letterSpacing: printEstimate.title.length>3 ? 10 :25}}>
                        {`[${printEstimate.title}]`}
                    </span>
                    </td>
                </tr>
                <tr>
                    <td height="30"></td>
                </tr>
                <tr>
                    <td>
                        <table className="barun-infoTable2" style={{height: 120, borderCollapse:'collapse'}}>
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
                                <td className="underline">
                                    <span id="estimateDate">
                                        <span style={{ display: 'inline-block', marginRight: "30px", width: '38px',  whiteSpace: 'nowrap', textAlign: 'right' }}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("YYYY")}년</span>
                                        <span style={{ display: 'inline-block', marginRight: "30px", width: '25px',  whiteSpace: 'nowrap', textAlign: 'right' }}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("M")}월</span>
                                        <span style={{ display: 'inline-block', width: '25px',  whiteSpace: 'nowrap', textAlign: 'right' }}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("DD")}일</span>
                                    </span>
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
                                    &nbsp;<span id="busiNum">{printEstimate.company?.businessNumber}</span>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <th colSpan={1} style={{border: "1px dotted"}}>
                                    상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호
                                </th>
                                <td colSpan={2} className="left" style={{border: "1px dotted #000", borderLeft: 0}}>
                                    &nbsp;<span id="companyName" style={{letterSpacing: 0}}>{printEstimate.company?.companyName}</span>
                                </td>
                                <th colSpan={1} style={{border: "1px dotted #000"}}>
                                    성명
                                </th>
                                <td colSpan={2} className="left"
                                    style={{border: "1px dotted #000", borderRight: "2px solid #000", position:'relative'}}>
                                    &nbsp;<span id="ceoName" style={{letterSpacing: 0}}>{printEstimate.company?.ceo}</span>(인)
                                    {printEstimate.isStamp && 
                                        <div style={{position:'absolute', marginLeft:'30px', marginTop:'-40px'}}>
                                            <Image 
                                                src={`/assets/stamp/${printEstimate.company.stamp}`} 
                                                alt="" 
                                                width={80} 
                                                height={80}/>
                                        </div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="underline right" style={{textAlign: "center"}}>
                                    <span id="customerName">{printEstimate.customerName}</span>&nbsp;귀하
                                </td>
                                <td></td>
                                <th colSpan={1} style={{border: "1px dotted #000"}}>
                                    사업장주소
                                </th>
                                <td colSpan={5} className="left" style={{borderRight: "2px solid #000"}}>
                                    &nbsp;<span id="addr">{printEstimate.company?.address}</span>
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
                                    &nbsp;<span id="companyTel">{printEstimate.company?.tel}</span>
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
                                    &nbsp;<span id="companyFax">{printEstimate.company?.fax}</span>
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
                            일금&nbsp;<span id="hangulTotalPrice">{`${changeNumberToKorean(printEstimate.totalPrice)} 원 (￦${printEstimate.totalPrice.toLocaleString('ko-KR')})`}</span>
                            <p style={{fontSize: 11}}>(부가가치세는 포함입니다.)</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={9}>
                        <table className="printEstimateTable">
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
                            {[...printEstimate.items, ...Array(17 - printEstimate.items.length).fill({})].map((stock, index) => (
                                <tr key={index} style={{borderTop: index === 0 ? "1px solid #000" : undefined}}>
                                    <td style={{borderLeft: 0}}>
                                        <span id={`stockName_${index}`}>{stock.productName}</span>
                                    </td>
                                    <td>
                                        <span id={`stockStandard_${index}`}>{stock.modelName}</span>
                                    </td>
                                    <td>
                                        <span id={`stockEa_${index}`}>{stock.quantity ? stock?.quantity.toLocaleString('ko-KR') : "\u00A0"}</span>
                                    </td>
                                    <td>
                                        <span id={`stockUnitPrice_${index}`}>{stock.unitPrice ? stock?.unitPrice.toLocaleString('ko-KR') : "\u00A0"}</span>
                                    </td>
                                    <td>
                                        <span id={`stockTotalPrice_${index}`}>{stock.totalPrice ? stock?.totalPrice.toLocaleString('ko-KR') : "\u00A0"}</span>
                                    </td>
                                    <td style={{borderRight: 0}}>
                                        <span id={`note_${index}`}>{
                                            stock.productName
                                            ? (printEstimate.isMemoToDate ? dayjs(stock.estimateDate).format('YY.M.D') : stock.memo)
                                            : '\u00A0'
                                        }</span>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} style={{textAlign: "center", borderLeft: 0, height:'30px', borderBottom:'unset'}}>
                                    합&nbsp;계&nbsp;금&nbsp;액
                                </td>
                                <td style={{borderRight: 0, borderBottom:'unset'}}>
                                    <span id="totalPrice">{printEstimate.totalPrice.toLocaleString('ko-KR')}</span>
                                </td>
                                <td style={{borderRight: 0, borderBottom:'unset'}}></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style={{borderTop: "1px solid black"}}>
                        <table className="infoTable" style={{borderTop: "none"}}>
                            <tbody>
                            <tr>
                                <td style={{textAlign: "center", fontSize:'12px', height:'30px'}}>
                                    결제계좌 : 우 리 은 행&nbsp;&nbsp;&nbsp;1 0 0 5 - 7 0 4 - 4 7 8 5 1 8 &nbsp; 예금주 : 전경자
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
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "left"}}>
                                    비&nbsp;&nbsp;&nbsp;&nbsp;고 :
                                </td>
                            </tr>
                            <tr>
                                <td></td>
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