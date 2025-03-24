
export type RequestReceipt={
  receiptId: string; // 전표 아이디
  estimateId?:string; // 견적서 아이디
  timeStamp:Date; // 전표 등록일
  category:ReceiptCategory | 'disabled'; // 전표 분류 =ENUM 사용
  customerId?:string; // 고객 아이디
  customerName?:string;
  stockId?:string; // 품목 아이디
  productName?:string; //품목 이름
  modelName?:string;
  quantity?:number; // 사용 품목 수량
  unitPrice?:number;
  totalPrice?:number; // 품목 총 가격
  description?:string; // 전표 설명 =적요
  memo?:string; //비고
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


export type ReceiptCondition = {
  category?:ReceiptCategory
  searchSDate? :Date;  //검색 날짜 시작일
  searchEDate?:Date,  //검색 날짜 종료일
  ids?:string[], //여러개 한번에 생성 시 보내는 아이디
  customerName?:string; //고객명
  productName?:string; //품명
}

export type Official ={
  officialName:string;
  officialId: string;
}