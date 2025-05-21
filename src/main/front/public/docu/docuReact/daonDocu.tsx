import React from 'react';
import '../../../styles/test/daonDocu.scss';

const DaonDocu = ({data}) => {
    const {
        estimateDate,
        busiNum,
        companyName,
        customerName,
        ceoName,
        addr,
        numberTotalPrice,
        hangulTotalPrice,
        stockList,
        totalPrice,
        companyTel,
        companyFax,
    } = data;

    return (
        <div className="wrap">
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
                                <td className="center">
                                    <span id="docuTitle">견&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;서</span>
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
                                    <span id="estimateDate">{estimateDate}</span>
                                </td>
                                <td></td>
                                <td>등록번호 :</td>
                                <td className="left"><span id="busiNum">{busiNum}</span></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호 :</td>
                                <td className="left"><span id="companyName">{companyName}</span></td>
                            </tr>
                            <tr>
                                <td className="right">
                                    <span id="customerName">{customerName} 귀하</span>
                                </td>
                                <td></td>
                                <td>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표 :</td>
                                <td className="left"><span id="ceoName">{ceoName}</span></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소 :</td>
                                <td className="left"><span id="addr">{addr}</span></td>
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
                        <div className="priceRight">￦ {numberTotalPrice} {hangulTotalPrice}</div>
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
                            <tr style={{padding:'1px', height:'21px'}}>
                                <td style={{borderLeft:'unset'}}>품 목</td>
                                <td>규 격</td>
                                <td>수 량</td>
                                <td>단 가</td>
                                <td>공급가액</td>
                                <td style={{borderRight:'unset'}}>비 고</td>
                            </tr>
                            </thead>
                            <tbody>
                            {[...stockList, ...Array(17 - stockList.length).fill({})].map((item, idx) => (
                                <tr key={idx}>
                                    <td style={{borderLeft:'unset'}}>{item.name || '\u00A0'}</td>
                                    <td>{item.standard || '\u00A0'}</td>
                                    <td>{item.ea || '\u00A0'}</td>
                                    <td>{item.unitPrice || '\u00A0'}</td>
                                    <td>{item.totalPrice || '\u00A0'}</td>
                                    <td style={{borderRight:'unset'}}>{item.note || '\u00A0'}</td>
                                </tr>
                            ))}
                            <tr style={{height:'33px'}}>
                                <td style={{borderBottom: '1px solid #000', borderLeft:'unset'}}>합 계</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{totalPrice}</td>
                                <td style={{borderRight:'unset'}}></td>
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
                                    3. 연락처 : 전화 {companyTel} / 팩스 {companyFax}
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
