import { ResponseCompany } from "../../staff/company/type"
import { ResponseTask } from "../task/type"


export enum EstimateCategory {
  ALL='전체',
  NORMAL="일반",            
  HAND="수기",           
}

interface User{
  userId:string,
  name:string,
}

  export interface ResponseEstimate {
    taskResponse? : ResponseTask;
    estimateId: string;       // UUID -> string
    company: ResponseCompany;
    customerId: string;       // UUID -> string
    customerName:string,
    userId:string,
    userName:string,
    receipted?:boolean
    estimateDate: string;     // 견적서 날짜
    totalAmount: number;      //종합
    items: ResponseEstimateItem[];
  }
  export interface RequestEstimate {
    taskId?:string
    estimateId: string;       // UUID -> string
    companyId: string;
    customerId: string;       // UUID -> string
    customerName:string,
    userId:string;
    receipted?:boolean
    estimateDate: string;     // 견적서 날짜
    totalAmount: number;      //종합
    items: ResponseEstimateItem[];
  }
  
  export interface ResponseEstimateItem {
    itemId: string;        // UUID -> string
    estimateId: string;    // String -> string
    productName: string;
    quantity: number;      // Integer -> number
    unitPrice: number;     // BigDecimal -> number
    stockId: string;       // UUID -> string
    hand: boolean;
    modelName:string;
  }
  

  export type EstimateCondition = {
    condition:EstimateCategory
    companyId?:string;
    searchSDate? :Date;  //검색 날짜 시작일
    searchEDate?:Date,  //검색 날짜 종료일
    customerId?:string; //고객명
    stockId?:string; //품명
    task:boolean
  }

  export interface EstimateRegisterProps{
    searchParams:Promise<{
      taskId?:string,
    }>
  }