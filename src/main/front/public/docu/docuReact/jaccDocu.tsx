import React from "react";
import "/styles/test/JaccDocu.scss";

const JaccDocu = ({data}) => {
    const {
        estimateDate,
        customerName,
        busiNum,
        companyName,
        ceoName,
        addr,
        hangulTotalPrice,
        stockItems,
        totalPrice,
        companyTel,
        companyFax,
    } = data;

    return (
        <div className="estimate-container">
            <div id="stampLayer" className="stamp-layer"/>
            <div className="estimate-table">

                <div className="title">견&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;서</div>

                <div className="row">
                    <div className="left">
                        <div className="info-space"/>
                        <div className="bottom-line">{estimateDate}</div>
                        <div className="info-space"/>
                        <div className="bottom-line">
                            <span className="customer-name">{customerName}</span>
                            <span className="customer-honorific"> &nbsp;&nbsp;&nbsp;貴&nbsp;下&nbsp;</span>
                        </div>
                    </div>

                    <div className="right">
                        <div className="bottom-line"><b>등&nbsp;록&nbsp;번&nbsp;호 :</b> <span>{busiNum}</span></div>
                        <div className="bottom-line"><b>상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호 :</b>
                            <span>{companyName}</span></div>
                        <div className="bottom-line"><b>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표 :</b>
                            <span>{ceoName}</span></div>
                        <div className="bottom-line"><b>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소 :</b>
                            <span>{addr}</span></div>
                    </div>
                </div>

                <div className="total-hangul">합계금액 : {hangulTotalPrice}</div>

                <table className="stock-table">
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
                    {stockItems.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.name}</td>
                            <td>{item.standard}</td>
                            <td>{item.ea}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.note}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3}></td>
                        <td>합계</td>
                        <td>{totalPrice}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>

                <div className="footer">
                    <div className="bank-info">
                        <div>계좌번호 : 우리은행 1005-180-690520 예금주 홍 문선</div>
                        <div>취급품목 : 삼성 HP Epson , 프린터 , 스캐너 , 팩시밀리</div>
                        <div>디지탈카메라 , 각종 전산소모품 및 주변기기</div>
                        <div>T&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;L : {companyTel}, FAX : {companyFax}</div>
                    </div>
                    <div className="signatures">
                        <div className="signatures_sub">
                            <div className="sign-box">인수자</div>
                            <div className="sign-box-middle"></div>
                            <div className="sign-box-bottom"></div>
                        </div>
                        <div className="signatures_sub">
                            <div className="sign-box">담당자</div>
                            <div className="sign-box-middle"></div>
                            <div className="sign-box-bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JaccDocu;