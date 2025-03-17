export type EstimateRegisterProps ={
    searchParams: Promise<{
        taskId:string
    }>
}

export type StringifiedEstimateType = {
    [K in keyof Omit<EstimateItemRequest, "hand"|"estimateId">]: string;
  } & Pick<EstimateItemRequest, "hand">;





  export interface ResponseEstimate {
    estimateId: string;       // UUID -> string
    companyId: string;
    customerId: string;       // UUID -> string
    userId: string;
    estimateDate: string;     // 견적서 날짜
    totalAmount: number;      //종합
    items: EstimateItemRequest[];
  }
  
  export interface EstimateItemRequest {
    itemId: string;        // UUID -> string
    estimateId: string;    // String -> string
    productName: string;
    quantity: number;      // Integer -> number
    unitPrice: number;     // BigDecimal -> number
    stockId: string;       // UUID -> string
    hand: boolean;
    modelName:string;
  }
  