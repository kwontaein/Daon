import React from "react";
import "./jaccDocu.scss";
import { printEstimateType } from "@/model/types/print-estimate/type";
import dayjs from "dayjs";
import { changeNumberToKorean } from "@/features/share/numberToKorean";
import Image from "next/image";

const JaccDocu: React.FC<{ printEstimate: printEstimateType}> = ({printEstimate}) => {

    return (
        <div className="estimate-container" style={{marginTop:'30px'}}>
            <div id="stampLayer" className="stamp-layer"/>
            <div className="estimate-table">
                <div className="title" style={{letterSpacing: printEstimate.title.length>3 ? 15 :60}}>{printEstimate.title}</div>
                <table className="estimate-header-table">
                    <colgroup>
                        <col width='45%'/>
                        <col width='5%'/>
                        <col width='50%'/>
                    </colgroup>
                    <tbody>
                    <tr style={{height: '14.67px'}}>
                        <td colSpan={4}></td>
                    </tr>
                    <tr>
                        <td>
                            <table style={{width: '100%'}}>
                                <colgroup>
                                </colgroup>
                                <tbody>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan={2} 
                                        style={{
                                            borderBottom: '1px solid black',
                                            textAlign: 'right',
                                            fontSize:'20px'
                                        }}>
                                        <span style={{display:'flex', justifyContent:'space-between', height:'30px'}}>
                                            <span style={{ display: 'inline-block', marginRight: "30px", width: '65px',  whiteSpace: 'nowrap' }}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("YYYY")}년</span>
                                            <span style={{ display: 'inline-block', marginRight: "30px", width: '50px',  whiteSpace: 'nowrap' }}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("M")}월</span>
                                            <span style={{ display: 'inline-block', width: '50px', textAlign: 'right',  whiteSpace: 'nowrap' }}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("DD")}일</span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td style={{borderBottom: '1px solid black', textAlign: 'right'}}>
                                        {printEstimate.customerName}
                                    </td>
                                    <td style={{borderBottom: '1px solid black', textAlign: 'right'}}>
                                    &nbsp;&nbsp;&nbsp;貴&nbsp;下
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td></td>
                        <td>
                            <table>
                                <colgroup>
                                    <col width="40%"/>
                                    <col width="2%"/>
                                    <col width="58%"/>
                                    <col/>
                                </colgroup>
                                <tbody>
                                <tr>
                                    <td style={{borderBottom: '1px solid black'}}>
                                        <b>등&nbsp;&nbsp;록&nbsp;&nbsp;번&nbsp;호</b></td>
                                    <td style={{borderBottom: '1px solid black'}}><b>:</b></td>
                                    <td style={{
                                        borderBottom: '1px solid black',
                                        paddingLeft: '10px',
                                    }}><b>{printEstimate.company.businessNumber}</b></td>
                                </tr>
                                <tr>
                                    <td style={{borderBottom: '1px solid black'}}>
                                        <b>상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호</b></td>
                                    <td style={{borderBottom: '1px solid black'}}><b>:</b></td>
                                    <td style={{
                                        borderBottom: '1px solid black',
                                        paddingLeft: '10px',
                                        letterSpacing:'5px'
                                    }}><b>{printEstimate.company.printName}</b></td>
                                </tr>
                                <tr>
                                    <td style={{borderBottom: '1px solid black'}}>
                                        <b>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표</b></td>
                                    <td style={{borderBottom: '1px solid black'}}><b>:</b></td>
                                    <td style={{
                                        borderBottom: '1px solid black',
                                        paddingLeft: '10px',
                                        letterSpacing:'15px',
                                        position:'relative'
                                    }}>
                                        <b>{printEstimate.company.ceo}</b>
                                        {printEstimate.isStamp && 
                                            <div style={{position:'absolute', marginLeft:'100px', marginTop:'-30px'}}>
                                                <Image 
                                                    src={`/assets/stamp/${printEstimate.company.stamp}`} 
                                                    alt="" 
                                                    width={50} 
                                                    height={50}/>
                                            </div>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{borderBottom: '1px solid black'}}>
                                        <b>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</b></td>
                                    <td style={{borderBottom: '1px solid black'}}><b>:</b></td>
                                    <td style={{
                                        borderBottom: '1px solid black',
                                        paddingLeft: '10px',
                                        fontSize: '15px'
                                    }}><b>{printEstimate.company.address} {printEstimate.company.addressDetail}</b></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style={{height: '14.67px'}}>
                        <td colSpan={4}></td>
                    </tr>
                    <tr>
                        <td colSpan={4} style={{fontSize:'16px'}}>
                            <b>{`합계금액 : ${changeNumberToKorean(printEstimate.totalPrice)} 원 (￦${printEstimate.totalPrice.toLocaleString('ko-KR')})`}</b>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className="stock-table">
                    <thead>
                    <tr>
                        <th>품&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명</th>
                        <th>규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
                        <th>수&nbsp;&nbsp;&nbsp;&nbsp;량</th>
                        <th>단&nbsp;&nbsp;&nbsp;&nbsp;가</th>
                        <th>공&nbsp;급&nbsp;가&nbsp;액</th>
                        <th>비&nbsp;&nbsp;&nbsp;고</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...printEstimate.items, ...Array(17 - printEstimate.items.length).fill({})].map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.productName || '\u00A0'}</td>
                            <td>{item.modelName || '\u00A0'}</td>
                            <td>{item.quantity ? item.quantity.toLocaleString('ko-KR') : '\u00A0'}</td>
                            <td>{item.unitPrice ? item.unitPrice.toLocaleString('ko-KR') : '\u00A0'}</td>
                            <td>{item.totalPrice ? item.totalPrice.toLocaleString('ko-KR') : '\u00A0'}</td>
                            <td>{
                                item.productName
                                ? (printEstimate.isMemoToDate ? dayjs(item.estimateDate).format('YY.M.D') : item.memo)
                                : '\u00A0'
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3}></td>
                        <td>합계</td>
                        <td>{printEstimate.totalPrice.toLocaleString('ko-KR')} </td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table className="estimate-footer-table">
                    <colgroup>
                        <col width='9.2%'/>
                        <col width='3.5%'/>
                        <col width='50%'/>
                        <col width='10%'/>
                        <col width='0.8%'/>
                        <col width='26.5%'/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <td>계좌번호</td>
                        <td>:</td>
                        <td>우리은행 1005-180-690520 예금주 홍 문선</td>
                        <td rowSpan={2} style={{border: '1px solid black'}}>인수자</td>
                        <td rowSpan={2} style={{border: '1px solid black'}}></td>
                        <td rowSpan={2} style={{border: '1px solid black'}}></td>
                    </tr>
                    <tr>
                        <td>취급품목</td>
                        <td>:</td>
                        <td>삼성 HP Epson , 프린터 , 스캐너 , 팩시밀리</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>디지탈카메라 , 각종 전산소모품 및 주변기기</td>
                        <td rowSpan={2} style={{border: '1px solid black'}}>담당자</td>
                        <td rowSpan={2} style={{border: '1px solid black'}}></td>
                        <td rowSpan={2} style={{border: '1px solid black'}}></td>
                    </tr>
                    <tr>
                        <td>T&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;L</td>
                        <td>:</td>
                        <td>{printEstimate.company.tel}, FAX : {printEstimate.company.fax}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JaccDocu;