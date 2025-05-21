export interface EstimateItem {
    name: string;
    standard: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    note?: string;
}

export interface EstimateData {
    estimateDate: string;
    busiNum: string;
    companyName: string;
    ceoName: string;
    customerName: string;
    addr: string;
    companyTel: string;
    companyFax: string;

    totalPrice: number | string;
    hangulTotalPrice?: string;
    numberTotalPrice?: string;

    // 여러 이름으로 불리는 항목 배열들을 단일화
    items: EstimateItem[];
}
