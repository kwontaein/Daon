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
    category?: string;
    taxation?: TaxationCate;
    note?: string;
    stockUseEa: boolean;//재고관리여부
    compatibleModel?: string;
  }
  
 export enum TaxationCate {
    TAXATION = "과세",
    EXEMPTION = "면세",
    ETC = "예비",
    ZEROTAX = "영세",
  }