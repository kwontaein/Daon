import { ResponseEstimateItem } from "../sales/estimate/type";
import { ResponseCompany } from "../staff/company/type";

export type printEstimateType ={
    totalPrice?:number,
    customerName?:string,
    company?:ResponseCompany,
    items?:(Partial<Pick<ResponseEstimateItem,'productName'|'modelName'|'quantity'|'unitPrice'|'memo'>&{totalPrice?:number, estimateDate?:Date}>)[],
    printDate?:Date,
    title?:string,
    isDatePrint:boolean,
    isStamp:boolean,
    isMemoToDate:boolean
}