import React from 'react';
import './daonDocu.scss';
import { printEstimateType } from '@/model/types/print-estimate/type';
import dayjs from 'dayjs';
import { changeNumberToKorean } from '@/features/share/numberToKorean';
import Image from 'next/image';

const DaonDocu: React.FC<{ printEstimate: printEstimateType}> = ({printEstimate}) => {
    return (
        <div className="wrap" style={{marginTop:'75px'}}>
            <table className="wrapTable" id="estimateTable">
                <tbody>
                <tr>
                    <td height="30"></td>
                </tr>
                <tr>
                    <td>
                        <table className="infoTable" id="titleTable">
                            <tbody>
                            <tr>
                                <td></td>
                                <td className="center" style={{letterSpacing: printEstimate.title.length>3 ? 10 : 25}}>
                                    <span id="docuTitle">{printEstimate.title}</span>
                                </td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td height="30"></td>
                </tr>

                <tr>
                    <td>
                        <table className="infoTable">
                            <colgroup>
                                <col width="40%"/>
                                <col width="10%"/>
                                <col width="15%"/>
                                <col width="35%"/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <td className="underline right">
                                    <span id="estimateDate">
                                        <span style={{ display: 'inline-block', marginRight: "30px", width: '50px',  whiteSpace: 'nowrap' , textAlign: 'right'}}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("YYYY")}년</span>
                                        <span style={{ display: 'inline-block', marginRight: "30px", width: '32.5px',  whiteSpace: 'nowrap' ,textAlign: 'right'}}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("M")}월</span>
                                        <span style={{ display: 'inline-block', width: '32.5px', textAlign: 'right',  whiteSpace: 'nowrap' }}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("DD")}일</span>
                                    </span>
                                </td>
                                <td></td>
                                <td>등록번호 :</td>
                                <td className="left"><span id="busiNum">{printEstimate.company.businessNumber}</span></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호 :</td>
                                <td className="left">
                                    <span id="companyName" style={{position:'relative'}}>
                                        {printEstimate.company.companyName}
                                        {printEstimate.isStamp && 
                                            <div style={{position:'absolute', marginLeft:'100px'}}>
                                                <Image 
                                                    src={`/assets/stamp/${printEstimate.company.stamp}`} 
                                                    alt="" 
                                                    width={70} 
                                                    height={70}/>
                                            </div>
                                        }
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="right">
                                    <span id="customerName" style={{letterSpacing:printEstimate.customerName.length>14 ? 'unset' : '2px'}}>{printEstimate.customerName} 귀하</span>
                                </td>
                                <td></td>
                                <td>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표 :</td>
                                <td className="left">
                                    <span id="ceoName">
                                        {printEstimate.company.ceo}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소 :</td>
                                <td className="left"><span id="addr">{printEstimate.company.address}</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td height="40"></td>
                </tr>

                <tr>
                    <td>
                        <div className="priceLeft">1. 합계금액(부가세포함)</div>
                        <div className="priceRight"> {`${changeNumberToKorean(printEstimate.totalPrice)} 원 (￦${printEstimate.totalPrice.toLocaleString('ko-KR')})`}</div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <table className="dataTable">
                            <colgroup>
                                <col width="29%"/>
                                <col width="20%"/>
                                <col width="11%"/>
                                <col width="14%"/>
                                <col width="15%"/>
                                <col width="11%"/>
                            </colgroup>
                            <thead>
                            <tr style={{padding: '1px', height: '21px'}}>
                                <td style={{borderLeft: 'unset'}}>품 목</td>
                                <td>규 격</td>
                                <td>수 량</td>
                                <td>단 가</td>
                                <td>공급가액</td>
                                <td style={{borderRight: 'unset'}}>비 고</td>
                            </tr>
                            </thead>
                            <tbody>
                            {[...printEstimate.items, ...Array(17 - printEstimate.items.length).fill({})].map((item, idx) => (
                                <tr key={idx}>
                                    <td style={{borderLeft: 'unset'}}>{item.productName || '\u00A0'}</td>
                                    <td>{item.modelName || '\u00A0'}</td>
                                    <td>{item.quantity ? item.quantity.toLocaleString('ko-KR') : '\u00A0'}</td>
                                    <td>{item.unitPrice ? item.unitPrice.toLocaleString('ko-KR') : '\u00A0'}</td>
                                    <td>{item.totalPrice ? item.totalPrice.toLocaleString('ko-KR') : '\u00A0'}</td>
                                    <td style={{borderRight: 'unset'}}>{
                                        item.productName
                                        ? (printEstimate.isMemoToDate ? dayjs(item.estimateDate).format('YY.M.D') : item.memo)
                                        : '\u00A0'
                                    }</td>
                                </tr>
                            ))}
                            <tr style={{height: '33px'}}>
                                <td style={{borderBottom: '1px solid #000', borderLeft: 'unset'}}>합 계</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{printEstimate.totalPrice.toLocaleString('ko-KR')} </td>
                                <td style={{borderRight: 'unset'}}></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td>
                        <table className="infoTable" id="bottomTable">
                            <colgroup>
                                <col width="58%"/>
                                <col width="2%"/>
                                <col width="12%"/>
                                <col width="16%"/>
                                <col width="12%"/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <td className="bankInfo">
                                    2. 결제계좌 : <span className="bankAccount">우리은행 1005-103-731139</span>
                                </td>
                                <td rowSpan={3}></td>
                                <td style={{borderLeft: '1px solid #000', borderRight: '1px solid #000'}} rowSpan={3}>인
                                    수 자
                                </td>
                                <td rowSpan={3}></td>
                                <td style={{borderLeft: '1px solid #000'}} rowSpan={3}>확인(인)</td>
                            </tr>
                            <tr>
                                <td className="bankInfo">
                                    3. 연락처 : 전화 {printEstimate.company.tel} / 팩스 {printEstimate.company.fax}
                                </td>
                            </tr>
                            <tr>
                                <td className="bankInfo">4. 비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고 :</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>

            <div id="stampLayer" style={{position: 'absolute', left: '570px', top: '250px', zIndex: 1}}></div>
        </div>
    );
};

export default DaonDocu;
