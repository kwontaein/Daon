import React from "react";
import "/styles/test/jaccDocu.scss";

const JaccDocu = ({
                      estimateDate,
                      customerName,
                      busiNum,
                      companyName,
                      ceoName,
                      addr,
                      hangulTotalPrice,
                      items,
                      totalPrice,
                      companyTel,
                      companyFax,
                  }) => {
    return (
        <div className="estimate-template">
            <div id="stampLayer" className="stamp-layer"></div>

            <table className="container">
                <tbody>
                <tr>
                    <td colSpan={3} className="title">견&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;서</td>
                </tr>
                <tr>
                    <td colSpan={3} className="spacer"></td>
                </tr>

                <tr>
                    <td className="customer-info">
                        <table className="inner-table">
                            <tbody>
                            <tr>
                                <td colSpan={2} className="spacer"></td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="bottom-line date">{estimateDate}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="spacer"></td>
                            </tr>
                            <tr>
                                <td className="bottom-line right-align customer">{customerName}</td>
                                <td className="bottom-line right-align">&nbsp;&nbsp;&nbsp;貴&nbsp;下&nbsp;</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>

                    <td className="gap"></td>

                    <td className="company-info">
                        <table className="inner-table">
                            <tbody>
                            <tr>
                                <td className="bottom-line">등록번호</td>
                                <td className="bottom-line">:</td>
                                <td className="bottom-line data">{busiNum}</td>
                            </tr>
                            <tr>
                                <td className="bottom-line">상호</td>
                                <td className="bottom-line">:</td>
                                <td className="bottom-line data">{companyName}</td>
                            </tr>
                            <tr>
                                <td className="bottom-line">대표</td>
                                <td className="bottom-line">:</td>
                                <td className="bottom-line data">{ceoName}</td>
                            </tr>
                            <tr>
                                <td className="bottom-line">주소</td>
                                <td className="bottom-line">:</td>
                                <td className="bottom-line data">{addr}</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td colSpan={3} className="spacer"></td>
                </tr>
                <tr>
                    <td colSpan={3} className="total">합계금액 : {hangulTotalPrice}</td>
                </tr>

                <tr>
                    <td colSpan={3}>
                        <table className="item-table">
                            <thead>
                            <tr>
                                <th>품명</th>
                                <th>규격</th>
                                <th>수량</th>
                                <th>단가</th>
                                <th>공급가액</th>
                                <th>비고</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.name}</td>
                                    <td>{item.standard}</td>
                                    <td>{item.ea}</td>
                                    <td className="right-align">{item.unitPrice}</td>
                                    <td className="right-align">{item.totalPrice}</td>
                                    <td>{item.note}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3}></td>
                                <td>합계</td>
                                <td className="right-align">{totalPrice}</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td colSpan={3} className="spacer-small"></td>
                </tr>

                <tr>
                    <td colSpan={3}>
                        <table className="footer-table">
                            <tbody>
                            <tr>
                                <td className="label">계좌번호</td>
                                <td className="colon">:</td>
                                <td className="value">우리은행 1005-180-690520 예금주 홍 문선</td>
                                <td className="footer-box">인수자</td>
                                <td className="footer-box"></td>
                                <td className="footer-box"></td>
                            </tr>
                            <tr>
                                <td className="label">취급품목</td>
                                <td className="colon">:</td>
                                <td className="value">삼성 HP Epson , 프린터 , 스캐너 , 팩시밀리</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td className="value">디지탈카메라 , 각종 전산소모품 및 주변기기</td>
                                <td className="footer-box">담당자</td>
                                <td className="footer-box"></td>
                                <td className="footer-box"></td>
                            </tr>
                            <tr>
                                <td className="label">TEL</td>
                                <td className="colon">:</td>
                                <td className="value">{companyTel} , FAX : {companyFax}</td>
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

export default JaccDocu;
