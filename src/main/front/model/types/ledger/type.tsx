import { CustomerCateEnum } from "../customer/customer/type";

export type LedgerSearchCondition ={
    searchSDate: Date;  //검색 날짜 시작일
    searchEDate: Date;  //검색 날짜 종료일
    customerCate?: CustomerCateEnum;//구분
    affiliation?:string;//소속
    customerId?: string; //거래처아이디
    stockId?: string;//품명
    customerIds?:string[];
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