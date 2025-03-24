import { ResponseCompany } from "../../staff/company/type"

export type EstimateRegisterProps ={
    searchParams: Promise<{
        mode:'edit' | 'detail' | 'write'
        taskId: string
        target?: string
    }>
}


interface User{
  userId:string,
  name:string,
}

  export interface ResponseEstimate {
    taskId?:string
    estimateId: string;       // UUID -> string
    companyId: string;
    customerId: string;       // UUID -> string
    customerName:string,
    user: User;
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
  