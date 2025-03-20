import { StockCate } from "../cate/type";

export type StockPageProps ={
    searchParams: Promise<{
        page: number| undefined
    }>
}


export interface StockSearchCondition {
    category?: string,
    remain: boolean|string, //true => 재고있는 품목만 검색
    stockUseEa: boolean|string, //재고관리여부 
    productName?:string,
    condition:boolean|string, //조건부 검색여부
} 

export interface ResponseStock {
    stockId: string;
    productName: string;
    quantity: number;
    inPrice: number;
    outPrice: number;
    modelName?: string;
    category?: StockCate;
    taxation?: TaxationCate;
    note?: string;
    stockUseEa: boolean;
    keyWord?: string;
  }
  
  enum TaxationCate {
    EXEMPTION = "비과세",
    TAXATION = "과세",
    ZEROTAX = "영세",
    MC = "관리비",
    ETC = "예비",
  }