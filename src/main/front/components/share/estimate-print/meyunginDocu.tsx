import React from "react";
import "/styles/test/meyunginDocu.scss";
import {EstimateData} from "@/components/share/estimate-print/estimatePrintInterface";


const EstimateDocument: React.FC<{ data: EstimateData }> = ({data}) => {
    return (
        <div className="estimate-document">
            <div
                className="title">견&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;서
            </div>

            <div className="info-section">
                <div className="left">
                    <div className="customer-name">{data.customerName} 귀하</div>
                    <div className="date">{data.estimateDate}</div>
                    <div className="note">아래와 같이 견적합니다.</div>
                </div>

                <div className="right">
                    <div>등록번호: {data.busiNum}</div>
                    <div>상호: {data.companyName} 성명: {data.ceoName}</div>
                    <div>주소: {data.addr}</div>
                    <div>TEL: {data.companyTel} / FAX: {data.companyFax}</div>
                </div>
            </div>

            <div className="total-price">
                <span className="label">금 액:</span>
                <span className="value">₩ {data.numberTotalPrice}</span>
                <span className="tax-note">(부가세포함)</span>
            </div>

            <table className="estimate-table">
                <colgroup>
                    <col width="25%"/>
                    <col width="25%"/>
                    <col width="10%"/>
                    <col width="15%"/>
                    <col width="15%"/>
                    <col width="10%"/>
                </colgroup>
                <thead>
                <tr style={{height: '35px'}}>
                    <th>품목</th>
                    <th>규격</th>
                    <th>수량</th>
                    <th>단가</th>
                    <th>공급가액</th>
                    <th style={{borderRight: 'unset'}}>비고</th>
                </tr>
                </thead>
                <tbody>
                {[data.items, ...Array(17 - data.items.length).fill({})].map((item, idx) => (
                    <tr key={idx} className="content-border">
                        <td>{item.productName || '\u00A0'}</td>
                        <td>{item.modelName || '\u00A0'}</td>
                        <td>{item.quantity || '\u00A0'}</td>
                        <td>{item?.unitPrice ? item.totalPrice.toLocaleString() : '\u00A0'}</td>
                        <td>{item?.totalPrice ? item.totalPrice.toLocaleString() : '\u00A0'}</td>
                        <td style={{borderRight: 'unset'}}>{item.note || '\u00A0'}</td>
                    </tr>
                ))}
                <tr style={{textAlign: "center", height: '30px'}}>
                    <td className="blackLeft2 borderTopBottom" height="30">&nbsp;</td>
                    <td className="blackCenter2 borderTopBottom">&nbsp;</td>
                    <td className="blackCenter2 borderTopBottom">&nbsp;</td>
                    <td className="blackCenter2 borderTopBottom" style={{backgroundColor: "#efefef"}}>
                        <span style={{fontFamily: "돋움"}}>합계</span>
                    </td>
                    <td className="blackCenter2 borderTopBottom" style={{textAlign: "right"}}>
                    <span style={{fontFamily: "돋움", fontSize: "14px"}}>
                    {data.numberTotalPrice?.toLocaleString()}&nbsp;
                    </span>
                    </td>
                    <td className="blackRight2 borderTopBottom" style={{borderRight: 'unset'}}>&nbsp;</td>
                </tr>

                <tr>
                    <td colSpan={6} className="bottomLine"
                        style={{
                            height: "60px",
                            fontSize: "14px",
                            paddingLeft: "5px",
                            textAlign: 'left',
                            borderRight: 'unset',
                            fontWeight: '550'
                        }}>
                        비고
                    </td>
                </tr>

                <tr>
                    <td colSpan={6}
                        style={{
                            height: "40px",
                            fontSize: "14px",
                            paddingLeft: "5px",
                            textAlign: 'left',
                            letterSpacing: "3px",
                            borderRight: 'unset',
                            fontWeight: '550'
                        }}>
                        결재계좌 : 우리은행 1005-201-383854&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;예금주 ㈜명인정보
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EstimateDocument;
