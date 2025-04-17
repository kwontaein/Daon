
export enum AccountingDivision {
     card ='카드증빙',
     proof ='지출증빙',
     pset ='조달및수의',
     pvat ='매입부가세',
     svat ='매출부가세'
};
export interface VAT {
    categorySelection: string;    // 분류선택
    date: string; // ISO 날짜 문자열 형식 (예: "2025-04-16")    // 날짜
    customerId: string; // UUID
    businessNumber?: string;    // 사업자번호
    amount?: number;    // 금액
    vat?: number;    // 부가세
    total?: number;    // 합계
    note?: string;    // 비고
    memo?: string;    // 메모
    cardCompany?: string;    // 카드사
    paymentDetails?: string;   // 결제내역
    paidDate?:Date;
}

  //매입부가세
  export type PurchaseVAT= Omit<VAT,'paidDate'|'cardCompany'|'paymentDetails'>& {
      purchaseVATId: string;
  } 
  //매출부가세
  export type SalesVAT= Omit<VAT,'cardCompany'|'paymentDetails'> & {
      salesVATId: string;
  }
  
  //카드증빙
  export type CardTransaction= VAT & {
      cardTransactionId: string;         // UUID
  }
  

  //지출증빙
  export type ExpenseProof= VAT & {
      expenseProofId: string; // UUID
  }


  //조달및수의
  export type ProcurementSettlement= Omit<VAT,'paidDate'> & {
      procurementSettlementId: string; // UUID
      modelName: string;    // 모델명
      vendor: string;    // 매입처
      quantity: number;    // 수량
      acceptance: number;    // 인수
      installation: string;    // 설치
      payment: string;    // 결재
  }
  
type PartialUnion<T> = T extends any ? Partial<T> : never;

export type UnionAccountingType = PartialUnion<PurchaseVAT | SalesVAT | CardTransaction | ExpenseProof | ProcurementSettlement>

