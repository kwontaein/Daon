import { CustomerCateEnum } from "../../customer/customer/type";

export interface ResponseRemain {
    customerName: string;/** 상호명 */
    previousBalance: number;  /** 전기이월 */
    sales: number;/** 매출액 */
    deposit: number;    /** 수금액 */
    purchase: number;    /** 매입액 */
    withdrawal: number;    /** 지급액 */
    salesDC: number;    /** 매출할인액 */
    purchaseDC: number;    /** 매입할인액 */
    official: number;    /** 관리비 */
    currentBalance: number;    /** 잔액 */
  }

 export enum RemianSearchCondition {
    ALL = "전체",         // 전체
    UNPAID = "미수금",   // 미수금
    PAYABLE = "미지급"  // 미지급
  }
  

  export interface RequestRemain {
    customerCate:CustomerCateEnum
    customerName: string;/** 상호명 */
    customerId:string;
    searchSDate: string; 
    searchEDate: string;
    condition: RemianSearchCondition;    /** 포함조건 */
  }