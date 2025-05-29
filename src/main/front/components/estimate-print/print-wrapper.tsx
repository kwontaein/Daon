'use client'
import {ResponseEstimate, ResponseEstimateItem} from "@/model/types/sales/estimate/type";
import {ResponseReceipt} from "@/model/types/sales/receipt/type";
import {ResponseCompany} from "@/model/types/staff/company/type";
import {ChangeEvent, useEffect, useReducer} from "react";
import {printEstimateType} from "@/model/types/print-estimate/type";
import './print-wrapper.scss';
import DaonDocu from "./daonDocu";
import JaccDocu from "./jaccDocu";
import HwasungDocu from "./hwasungDocu";
import BarunDocu from "./barunDocu";

const initialEstimate: printEstimateType = {
    totalPrice: null,
    customerName: null,
    company: null,
    items: [],
    printDate: new Date(),
    title: "견적서",
    isDatePrint: true,
    isStamp: true,
    isMemoToDate: false,
}

export default function EstimatePrintWrapper({receipts, estimate, companyList}: {
    receipts?: ResponseReceipt[],
    estimate?: ResponseEstimate,
    companyList: ResponseCompany[]
}) {
    const [estimateData, setEstimateData] = useReducer((prev, data) => {
        return {...prev, ...data}
    }, initialEstimate)

    useEffect(() => {
        let itemsTotalPrice = 0;
        let items = []
        if (receipts) {
            //전표가 존재 시
            items = receipts.map((receipt: ResponseReceipt) => {
                const {productName, modelName, quantity, unitPrice, totalPrice, memo, timeStamp} = receipt
                itemsTotalPrice += totalPrice;

                return {productName, modelName, quantity, unitPrice, memo, totalPrice, estimateDate: timeStamp}
            })
            setEstimateData({
                items,
                company: companyList[0],
                customerName: receipts.at(-1).customerName,
                totalPrice: itemsTotalPrice,
            })
        } else if (estimate) {
            itemsTotalPrice += estimate.totalAmount;
            items = estimate.items.map((item: ResponseEstimateItem) => {
                const {productName, modelName, quantity, unitPrice, memo} = item
                const totalPrice = quantity * unitPrice
                return {
                    productName,
                    modelName,
                    quantity,
                    unitPrice,
                    totalPrice,
                    memo,
                    estimateDate: estimate.estimateDate
                }
            })
            setEstimateData({
                items,
                company: estimate.company,
                customerName: estimate.customerName,
                totalPrice: itemsTotalPrice,
            })
        }
    }, [receipts,estimate, companyList])


    return (
        <section className="print-estimate-container">
            <div className="print-estimate-header">
                <div className="print-estimate-wrapper">
                    <div className="print-estimate-left">
                        {receipts &&
                            <select
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setEstimateData({company: JSON.parse(e.target.value)})}>
                                {companyList.map((company) => (
                                    <option key={company.companyId}
                                            value={JSON.stringify(company)}>{company.companyName}</option>
                                ))}
                            </select>
                        }
                        <select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setEstimateData({title: e.target.value})}>
                            <option value='견적서'>견적서</option>
                            <option value='인수서'>인수서</option>
                            <option value='거래명세서'>거래명세서</option>
                            <option value='납품서'>납품서</option>
                        </select>
                        <div className="checkbox-container">
                            <label>
                                <input type="checkbox" checked={estimateData.isDatePrint}
                                       onChange={() => setEstimateData({isDatePrint: !estimateData.isDatePrint})}/>
                                일자인쇄
                            </label>
                        </div>
                        <div className="checkbox-container">
                            <label>
                                <input type="checkbox" checked={estimateData.isStamp}
                                       onChange={() => setEstimateData({isStamp: !estimateData.isStamp})}/>
                                도장인쇄
                            </label>
                        </div>
                        <div className="checkbox-container">
                            <label>
                                <input type="checkbox" checked={estimateData.isMemoToDate}
                                       onChange={() => setEstimateData({isMemoToDate: !estimateData.isMemoToDate})}/>
                                비고란 날짜인쇄
                            </label>
                        </div>
                    </div>
                    <div className="print-estimate-right">
                        <button onClick={() => window.print()}>인쇄</button>
                        <button>취소</button>
                    </div>
                </div>
                <hr/>
            </div>
            {(estimateData.items.length > 0 && estimateData.company) &&
                <article className="estimate-content-wrapper">
                    {estimateData.company.businessNumber === "245 - 23 - 01692" &&
                        <BarunDocu printEstimate={estimateData}/>
                    }
                    {estimateData.company.businessNumber === "715 - 88 - 01360" &&
                        <DaonDocu printEstimate={estimateData}/>
                    }
                    {estimateData.company.businessNumber === "135 - 24 - 14280" &&
                        <JaccDocu printEstimate={estimateData}/>
                    }
                    {estimateData.company.businessNumber === "124 - 34 - 40545" &&
                        <HwasungDocu printEstimate={estimateData}/>
                    }

                </article>
            }
        </section>
    )
}