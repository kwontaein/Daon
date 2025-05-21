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
                <table className="estimate-header-table">
                    <colgroup>
                        <col width='45%'/>
                        <col width='5%'/>
                        <col width='50%'/>
                    </colgroup>
                    <tbody>
                        <tr style={{height:'14.67px'}}>
                            <td colSpan={4}></td>
                        </tr>
                        <tr>
                           <td>
                           <table style={{width:'100%'}}>
                                <tbody>
                                    <tr><td></td></tr>
                                    <tr><td style={{borderBottom:'1px solid black', textAlign:'right'}}>{estimateDate}</td></tr>
                                    <tr><td></td></tr>
                                    <tr><td style={{borderBottom:'1px solid black', textAlign:'right'}}><span className="customer-honorific">{customerName}&nbsp;&nbsp;&nbsp;貴&nbsp;下&nbsp;</span></td></tr>
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
                                        <td style={{borderBottom:'1px solid black'}}><b>등&nbsp;&nbsp;록&nbsp;&nbsp;번&nbsp;호</b></td>
                                        <td style={{borderBottom:'1px solid black'}}><b>:</b></td>
                                        <td style={{borderBottom:'1px solid black',paddingLeft:'10px', fontSize:'15px'}}><b>{busiNum}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:'1px solid black'}}><b>상&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호</b></td>
                                        <td style={{borderBottom:'1px solid black'}}><b>:</b></td>
                                        <td style={{borderBottom:'1px solid black', paddingLeft:'10px', fontSize:'15px'}}><b>{companyName}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:'1px solid black'}}><b>대&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;표</b></td>
                                        <td style={{borderBottom:'1px solid black'}}><b>:</b></td>
                                        <td style={{borderBottom:'1px solid black', paddingLeft:'10px', fontSize:'15px'}}><b>{ceoName}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:'1px solid black'}}><b>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</b></td>
                                        <td style={{borderBottom:'1px solid black'}}><b>:</b></td>
                                        <td style={{borderBottom:'1px solid black', paddingLeft:'10px', fontSize:'15px'}}><b>{addr}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                           </td>
                        </tr>
                        <tr style={{height:'14.67px'}}>
                            <td colSpan={4}></td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                합계금액 : {hangulTotalPrice}
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
                    {[...stockItems, ...Array(17 - stockItems.length).fill({})].map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.name || '\u00A0'}</td>
                            <td>{item.standard || '\u00A0'}</td>
                            <td>{item.ea || '\u00A0'}</td>
                            <td>{item.unitPrice || '\u00A0'}</td>
                            <td>{item.totalPrice || '\u00A0'}</td>
                            <td>{item.note || '\u00A0'}</td>
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
                            <td rowSpan={2} style={{border:'1px solid black'}}>인수자</td>
                            <td rowSpan={2} style={{border:'1px solid black'}}></td>
                            <td rowSpan={2} style={{border:'1px solid black'}}></td>
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
                            <td rowSpan={2} style={{border:'1px solid black'}}>담당자</td>
                            <td rowSpan={2} style={{border:'1px solid black'}}></td>
                            <td rowSpan={2} style={{border:'1px solid black'}}></td>
                        </tr>
                        <tr>
                            <td>T&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;L</td>
                            <td>:</td>
                            <td>{companyTel}, FAX : {companyFax}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JaccDocu;