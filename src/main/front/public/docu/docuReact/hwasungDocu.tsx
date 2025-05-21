import React from "react";
import "/styles/test/admin_global.scss";
import {EstimateData} from "@/public/docu/docuReact/estimatePrintInterface";

const HwasungDocu: React.FC<{ data: EstimateData }> = ({data}) => {
    return (
        <div style={{margin: "0 auto", width: 700}}>
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
                            <span id="docuTitle" style={{fontSize: 30}}>
                                견&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;서
                            </span>
                            </b>
                        </td>
                    </tr>

                    <tr>
                        <td valign="top">
                            <table width="100%" border={0} cellSpacing="0" cellPadding="0">
                                <tbody>
                                <tr>
                                    <td align="left" colSpan={2} style={{fontSize: 18}}>
                                        {data.estimateDate}&nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td width="70%" align="center" style={{fontSize: 18, lineHeight: "40px"}}>
                                        {data.customerName}
                                    </td>
                                    <td align="left" style={{lineHeight: "40px", fontSize: 18}}>
                                        귀&nbsp;&nbsp;하
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>&nbsp;</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>

                        <td>&nbsp;</td>

                        <td width="60%" valign="top">
                            <table width="100%" border={0} cellSpacing="0" cellPadding="0"
                                   style={{fontWeight: "bold"}}>
                                <tbody>
                                <tr>
                                    <td height="30" style={{fontSize: "18px"}}>등&nbsp;록&nbsp;번&nbsp;호</td>
                                    <td>:</td>
                                    <td style={{paddingLeft: 10, letterSpacing: 3}}>
                                        <b style={{fontSize: "18px"}}>{data.busiNum}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"
                                        style={{fontSize: "18px"}}>상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호
                                    </td>
                                    <td>:</td>
                                    <td style={{paddingLeft: 10, letterSpacing: 10}}>
                                        <b style={{fontSize: "18px"}}>{data.companyName}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"
                                        style={{fontSize: "18px"}}>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표
                                    </td>
                                    <td>:</td>
                                    <td style={{paddingLeft: 10, letterSpacing: 30}}>
                                        <b style={{fontSize: "18px"}}>{data.ceoName}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"
                                        style={{fontSize: "18px"}}>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소
                                    </td>
                                    <td>:</td>
                                    <td style={{paddingLeft: 10, fontSize: 16, letterSpacing: 4}}>
                                        <b style={{fontSize: "18px"}}>{data.addr}</b>
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
                                {[...data.items, ...Array(17 - data.items.length).fill({})].map((item, idx) => (
                                    <tr key={idx} style={{alignItems: "center"}}>
                                        <td className="blackLeft" style={{height: 30}}>{item.stockName || '\u00A0'}</td>
                                        <td className="blackCenter">{item.stockStandard || '\u00A0'}</td>
                                        <td className="blackCenter">{item.stockEa || '\u00A0'}</td>
                                        <td className="blackCenter">{item.stockUnitPrice || '\u00A0'}</td>
                                        <td className="blackCenter">{item.stockTotalPrice || '\u00A0'}</td>
                                        <td className="blackRight">{item.note || '\u00A0'}</td>
                                    </tr>
                                ))}

                                <tr style={{fontWeight: "bold", alignItems: "center"}}>
                                    <td className="blackLeftBottom" style={{height: 30}}>&nbsp;</td>
                                    <td className="blackCenterBottom">&nbsp;</td>
                                    <td className="blackCenterBottom">&nbsp;</td>
                                    <td className="blackCenterBottom">합계</td>
                                    <td className="blackCenterBottom">{data.totalPrice}</td>
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
                            <b>2. 합계금액 (부가세포함) : {data.hangulTotalPrice}</b>
                        </td>
                    </tr>
                    <tr>
                        <td height="25" colSpan={3} style={{fontSize: 16}}>
                            <b>3. 대표전화 : {data.companyTel} , FAX : {data.companyFax}</b>
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
