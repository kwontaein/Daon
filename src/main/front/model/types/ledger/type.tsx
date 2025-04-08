import { CustomerCateEnum, ResponseCustomer } from "../customer/customer/type";
import { ResponseEstimate } from "../sales/estimate/type";
import { ReceiptCategoryEnum } from "../sales/receipt/type";
import { ResponseStock } from "../stock/stock/types";

export type LedgerSearchCondition ={
    searchSDate: Date;  //검색 날짜 시작일
    searchEDate: Date;  //검색 날짜 종료일
    customerCate?: CustomerCateEnum;//구분
    affiliationId?:string;//소속
    customerId?: string; //거래처아이디
    stockId?: string;//품명
    customerIds?:string[];
    officialId?:string//관리비분류

    //-----------------
    sales?: boolean;//매출
    purchase?: boolean;// 매입
    deposit?: boolean;// 입금
    withdrawal?: boolean;// 출금
    salesDiscount?: boolean;// 매출할인
    purchaseDiscount?: boolean;// 매입할인
    returnOut?: boolean;// 반품출고
    returnIn?: boolean;// 반품입고
}

export enum FormCategory{
    EX ="그외",//전체
    ESTIMATE ="견적서",//전체
    SALES="매출부가세",              // 매출
    CARD="카드지출",     // 매출할인
    EXPENSE="지출증빙";  // 반품입고
}

export type ResponseLedger ={
    category?:ReceiptCategoryEnum
    comeFrom?: FormCategory
    customer?:ResponseCustomer
    description?:string
    estimate?:ResponseEstimate
    memo?:string
    officialId?:string,
    quantity?:number,
    receiptId?:string,
    stock?:ResponseStock
    timeStamp:Date
    totalPrice:number
}