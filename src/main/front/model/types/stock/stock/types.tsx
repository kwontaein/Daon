import { StockCate } from "../cate/type";

export type StockPageProps ={
    searchParams: Promise<{
        page: number| undefined
    }>
}


export type RequestSearchStock ={
    category: string,
    remain: boolean,
    stockUseEa: boolean,
    name: string
    condition:boolean
    receiptCategory:string
}

export interface ResponseStock {
    stockId: string;
    name: string;
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