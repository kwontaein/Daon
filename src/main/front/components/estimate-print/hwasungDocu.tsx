import React from "react";
import "./admin_global.scss";
import { printEstimateType } from "@/model/types/print-estimate/type";
import dayjs from "dayjs";
import { changeNumberToKorean } from "@/features/share/numberToKorean";
import Image from "next/image";

const HwasungDocu: React.FC<{ printEstimate: printEstimateType}> = ({printEstimate}) => {
    return (
        <div style={{margin: "0 auto", width: 700, marginTop:'30px'}}>
            <div style={{position: "absolute", left: 610, top: 140, zIndex: 1}} id="stampLayer"></div>
            <form name="form1">
                <table width="700" cellSpacing="0" cellPadding="0" border={0} align="center">
                    <tbody>
                    <tr>
                        <td colSpan={3}>
                            <span style={{fontSize: 35, fontWeight: "bold"}}>HWASUNG INFORMATION</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <b>
                            <span id="docuTitle" style={{fontSize: 30,letterSpacing: printEstimate.title.length>3 ? 10 :25}}>
                                {printEstimate.title}
                            </span>
                            </b>
                        </td>
                    </tr>

                    <tr>
                        <td valign="top">
                            <table width="100%" border={0} cellSpacing="0" cellPadding="0">
                                <colgroup>
                                    <col style={{width:"75%"}}/>
                                    <col style={{width:"25%", minWidth:'100px'}}/>
                                </colgroup>
                                <tbody>
                                <tr>
                                    <td  align="left" style={{fontSize: 18}}>
                                        <span style={{display:'flex', justifyContent:'space-between', height:'30px'}}>
                                            <span style={{ display: 'inline-block', marginRight: "30px", width: '60px',  whiteSpace: 'nowrap' ,textAlign: 'right'}}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("YYYY")}년</span>
                                            <span style={{ marginRight: "30px", width: '40px',  whiteSpace: 'nowrap' ,textAlign: 'right'}}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("M")}월</span>
                                            <span style={{ width: '40px', whiteSpace: 'nowrap', textAlign: 'right' }}>{printEstimate.isDatePrint  && dayjs(printEstimate.printDate).format("DD")}일</span>
                                        </span>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td align="center" style={{fontSize: printEstimate.customerName.length>14 ? 17:18, lineHeight: "20px"}}>
                                        {printEstimate.customerName}
                                    </td>
                                    <td align="left" style={{lineHeight: "20px", fontSize: printEstimate.customerName.length>14 ? 17:18}}>
                                    &nbsp;귀&nbsp;&nbsp;하
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>&nbsp;</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>

                        <td>&nbsp;</td>

                        <td width="50%" valign="top">
                            <table width="100%" border={0} cellSpacing="0" cellPadding="0"
                                   style={{fontWeight: "bold"}}>
                                <tbody>
                                <tr>
                                    <td height="30" style={{fontSize: "18px"}}>등&nbsp;록&nbsp;번&nbsp;호</td>
                                    <td>:</td>
                                    <td style={{paddingLeft: 10, letterSpacing: 3}}>
                                        <b style={{fontSize: "18px"}}>{printEstimate.company.businessNumber}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"
                                        style={{fontSize: "18px"}}>상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호
                                    </td>
                                    <td>:</td>
                                    <td style={{paddingLeft: 10, letterSpacing: 10}}>
                                        <b style={{fontSize: "18px"}}>{printEstimate.company.companyName}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"
                                        style={{fontSize: "18px"}}>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표
                                    </td>
                                    <td>:</td>
                                    <td style={{paddingLeft: 10, letterSpacing: 30, position:'relative'}}>
                                        <b style={{fontSize: "18px"}}>{printEstimate.company.ceo}</b>
                                        {printEstimate.isStamp && 
                                        <div style={{position:'absolute', marginLeft:'120px', marginTop:'-30px'}}>
                                            <Image 
                                                src={`/assets/stamp/${printEstimate.company.stamp}`} 
                                                alt="" 
                                                width={43} 
                                                height={43}/>
                                        </div>
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"
                                        style={{fontSize: "18px"}}>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소
                                    </td>
                                    <td>:</td>
                                    <td style={{paddingLeft: 10, fontSize: 16, letterSpacing: 4}}>
                                        <b style={{fontSize: "16px"}}>{printEstimate.company.address}</b>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={3}>&nbsp;</td>
                    </tr>

                    <tr style={{lineHeight: "40px"}}>
                        <td colSpan={3} style={{fontSize: 18, fontWeight: "bold"}}>
                            1. 품&nbsp;목&nbsp;&nbsp;&nbsp;및&nbsp;&nbsp;&nbsp;금&nbsp;액
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={3}>
                            <table width="100%" border={0} cellSpacing="0" cellPadding="0">
                                <thead>
                                <tr style={{
                                    fontSize: "16px",
                                    alignItems: "center",
                                    backgroundColor: "unset",
                                    height: "35px"
                                }}>
                                    <th style={{width: "25%", backgroundColor: "transparent", fontSize: '16px'}}
                                        className="blackLeft">품&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명
                                    </th>
                                    <th style={{width: "25%", backgroundColor: "transparent", fontSize: '16px'}}
                                        className="blackCenter">규&nbsp;&nbsp;&nbsp;&nbsp;격
                                    </th>
                                    <th style={{width: "10%", backgroundColor: "transparent", fontSize: '16px'}}
                                        className="blackCenter">수&nbsp;&nbsp;&nbsp;&nbsp;량
                                    </th>
                                    <th style={{width: "15%", backgroundColor: "transparent", fontSize: '16px'}}
                                        className="blackCenter">단&nbsp;&nbsp;&nbsp;&nbsp;가
                                    </th>
                                    <th style={{width: "15%", backgroundColor: "transparent", fontSize: '16px'}}
                                        className="blackCenter">공&nbsp;급&nbsp;가&nbsp;액
                                    </th>
                                    <th style={{width: "10%", backgroundColor: "transparent", fontSize: '16px'}}
                                        className="blackRight">비&nbsp;&nbsp;&nbsp;&nbsp;고
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {[...printEstimate.items, ...Array(17 - printEstimate.items.length).fill({})].map((item, idx) => (
                                    <tr key={idx} style={{alignItems: "center"}}>
                                        <td className="blackLeft" style={{height: 30}}>{item.productName || '\u00A0'}</td>
                                        <td className="blackCenter">{item.modelName || '\u00A0'}</td>
                                        <td className="blackCenter">{item.quantity ? item.quantity.toLocaleString('ko-KR') : '\u00A0'}</td>
                                        <td className="blackCenter">{item.unitPrice ? item.unitPrice.toLocaleString('ko-KR') : '\u00A0'}</td>
                                        <td className="blackCenter">{item.totalPrice ? item.totalPrice.toLocaleString('ko-KR') : '\u00A0'}</td>
                                        <td className="blackRight">{
                                            item.productName
                                            ? (printEstimate.isMemoToDate ? dayjs(item.estimateDate).format('YY.M.D') : item.memo)
                                            : '\u00A0'
                                        }</td>
                                    </tr>
                                ))}

                                <tr style={{fontWeight: "bold", alignItems: "center"}}>
                                    <td className="blackLeftBottom" style={{height: 30}}>&nbsp;</td>
                                    <td className="blackCenterBottom">&nbsp;</td>
                                    <td className="blackCenterBottom">&nbsp;</td>
                                    <td className="blackCenterBottom">합계</td>
                                    <td className="blackCenterBottom">{printEstimate.totalPrice.toLocaleString('ko-KR')} </td>
                                    <td className="blackRightBottom">&nbsp;</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td height="10" colSpan={3}></td>
                    </tr>

                    <tr>
                        <td height="25" colSpan={3} style={{fontSize: 16}}>
                            <b>{`2. 합계금액 (부가세포함) : ${changeNumberToKorean(printEstimate.totalPrice)} 원 (￦${printEstimate.totalPrice.toLocaleString('ko-KR')})`}</b>
                        </td>
                    </tr>
                    <tr>
                        <td height="25" colSpan={3} style={{fontSize: 16}}>
                            <b>3. 대표전화 : {printEstimate.company.tel} , FAX : {printEstimate.company.fax}</b>
                        </td>
                    </tr>
                    <tr>
                        <td height="25" colSpan={3} style={{fontSize: 16}}>
                            <b>4. 계좌번호 : 농협중앙회 1076 - 02 - 039044 예금주 : 홍문선</b>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default HwasungDocu;
