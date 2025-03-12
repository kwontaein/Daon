export type EstimateRegisterProps ={
    searchParams: Promise<{
        taskId:string
    }>
}

export type EstimateType={
    estimateId:string
    itemId?:string
    productName?:string
    modelName?:string,
    quantity?: number
    unitPrice?:number
    isHand:boolean,
}
export type StringifiedEstimateType = {
    [K in keyof Omit<EstimateType, "isHand">]: string;
  } & Pick<EstimateType, "isHand">;