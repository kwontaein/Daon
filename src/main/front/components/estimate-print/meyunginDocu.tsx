import React from "react";
import "./meyunginDocu.scss";
import { printEstimateType } from "@/model/types/print-estimate/type";
import dayjs from "dayjs";


const EstimateDocument: React.FC<{ printEstimate: printEstimateType}> = ({printEstimate}) => {
    return (
        <div className="estimate-document">
            <div className="title" style={{letterSpacing: printEstimate.title.length>3 ? 10 :25}}>
                {printEstimate.title}
            </div>

            <div className="info-section">
                <div className="left">
                    <div className="customer-name">{printEstimate.customerName} 귀하</div>
                    <div className="date">{dayjs(printEstimate.printDate).format(" YYYY년   M월   DD일")}</div>
                    <div className="note">아래와 같이 견적합니다.</div>
                </div>

                <div className="right">
                    <div>등록번호: {printEstimate.company.businessNumber}</div>
                    <div>상호: {printEstimate.company.companyName} 성명: {printEstimate.company.ceo}</div>
                    <div>주소: {printEstimate.company.addressDetail}</div>
                    <div>TEL: {printEstimate.company.tel} / FAX: {printEstimate.company.fax}</div>
                </div>
            </div>

            <div className="total-price">
                <span className="label">금 액:</span>
                <span className="value">₩ {printEstimate.totalPrice.toLocaleString('ko-KR')}</span>
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
                {[printEstimate.items, ...Array(17 - printEstimate.items.length).fill({})].map((item, idx) => (
                    <tr key={idx} className="content-border">
                        <td>{item.productName || '\u00A0'}</td>
                        <td>{item.modelName || '\u00A0'}</td>
                        <td>{item.quantity || '\u00A0'}</td>
                        <td>{item?.unitPrice ? item.totalPrice.toLocaleString() : '\u00A0'}</td>
                        <td>{item?.totalPrice ? item.totalPrice.toLocaleString() : '\u00A0'}</td>
                        <td style={{borderRight: 'unset'}}> {
                            item.productName
                            ? (printEstimate.isMemoToDate ? dayjs(item.estimateDate).format('YY.M.D') : item.memo)
                            : '\u00A0'
                        }</td>
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
                    {printEstimate.totalPrice?.toLocaleString()}&nbsp;
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
