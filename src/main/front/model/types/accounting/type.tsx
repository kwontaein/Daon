
export type AccountingDivision = 'bills'|'card'|'proof'|'pset'|'pvat'|'svat';
export interface VAT {
    categorySelection: string;    // 분류선택
    date: string; // ISO 날짜 문자열 형식 (예: "2025-04-16")    // 날짜
    companyName: string;    // 업체명
    customerId: string; // UUID
    businessNumber: string;    // 사업자번호
    amount: number;    // 금액
    vat: number;    // 부가세
    total: number;    // 합계
    note: string;    // 비고
    memo: string;    // 메모
}

//매입부가세
export type PurchaseVAT= VAT & {
    purchaseVATId: string;
} 
//매출부가세
export type SalesVAT= VAT & {
    salesVATId: string;
    paidDate:Date;
}
  
  //카드증빙
  export type CardTransaction= VAT & {
    cardTransactionId: string;         // UUID
    paymentDetails: string;           // 결제내역
    cardCompany: string;              // 카드사
    paidDate:Date;
  }
  

//지출증빙
export type ExpenseProof =VAT & {
    expenseProofId: string; // UUID
    paymentDetails: string;    // 결제내역
    cardCompany: string;    // 카드사
    paidDate:Date;
  }


//조달및수의
export type ProcurementSettlement=VAT & {
    procurementSettlementId: string; // UUID
    paymentDetails: string;    // 결제내역
    modelName: string;    // 모델명
    vendor: string;    // 매입처
    quantity: number;    // 수량
    acceptance: number;    // 인수
    installation: string;    // 설치
    payment: string;    // 결재
    cardCompany: string;    // 카드사
}
  
