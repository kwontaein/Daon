import { ResponseCustomer } from "../customer/customer/type";
import { ResponseEstimate } from "../task/estimate/type";

export type AccountType =
  | 'disabled'
  | 'sales'
  | 'purchase'
  | 'deposit'
  | 'withdrawal'
  | 'sale_discount'
  | 'purchase_discount'
  | 'sales_replacement'
  | 'cost'
  | 'return_delivery'
  | 'returned_received';

export type Receipt = {
  any,
    date?: Date,
    account?: AccountType,
    customerName?: string,
    customerId?:string
    note?: string,
    unit_price?: string,
    amount?: string,
    product?: string,
    quantity?: string,
    briefs?: string,
};

export type RequestReceipt={
  receiptId: string; // 전표 아이디
  estimateId?:string; // 견적서 아이디
  timeStamp:Date; // 전표 등록일
  category:ReceiptCategory | 'disabled'; // 전표 분류 =ENUM 사용
  customerId?:string; // 고객 아이디
  itemNumber?:string; // 품목 번호
  quantity?:number; // 사용 품목 수량
  totalPrice?:number; // 품목 총 가격
  description?:string; // 전표 설명 =적요
  memo?:string; //비고
  estimate?:ResponseEstimate;
  customer?:ResponseCustomer;
}


export enum ReceiptCategory {
  SALES="매출",              // 매출
  SALES_DISCOUNT="매출할인",     // 매출할인
  PURCHASE="매입",           // 매입
  PURCHASE_DISCOUNT="매입할인", // 매입할인
  DEPOSIT="입금",            // 입금 (수금)
  WITHDRAWAL="출금",         // 출금 (지급)
  MAINTENANCE_FEE="관리비",    // 관리비
  OPERATING_PROFIT="경상손익",   // 경상손익
  SALES_ALTERNATIVE="매출대체",  // 매출대체
  RETURN_OUT="반품출고",         // 반품출고
  RETURN_IN="반품입고"  // 반품입고
}