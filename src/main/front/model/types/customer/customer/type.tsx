import { ResponseEstimate } from "../../sales/estimate/type";
import { Affiliation } from "../affiliation/type";

export enum CustomerCateEnum {
    SALE = '판매처', 
    PURCHASE = '구매처',
    CONSUMER = '소비자',
    SUBCONTRACTOR = '하청업체',
    ETC = '기타'
}



export type CategoryType = 'none' |'sale' | 'purchase' | 'consumer' | 'subcontractor' | 'etc';
export type CustomerSearchTarget = 'all' | 'payment'
export type CustomerSearchInputTarget = 'customerName' | 'ceo';


export interface CustomerSearchCondition {
    category?: CategoryType,
    cateId?:string,
    searchTarget :CustomerSearchTarget,
    customerName?: string,
    ceo?:string,
} 

export interface CustomerSearch{
    postSearchInfo: CustomerSearchCondition,
    searchInputTarget:string,
    searchInput:string
}

export interface ResponseCustomer {
    customerId: string;
    customerName: string;
    contactInfo?: string;
    billName?: string;
    ceo?: string;
    ceoNum?: string;
    businessNumber?: string; //사업자등록번호
    businessType?: string;
    contents?: string;
    customerRp?: string;
    customerRpCall?: string;
    bankName?: string;
    bankNum?: string;
    bankOwner?: string;
    handlingItem?: string;
    memo?: string;
    category: string; 
    phoneNumber?: string;
    fax?: string;
    userId: string; 
    affiliationId?:string,
    affiliationName?:string,
    estimates: ResponseEstimate[]; // 견적서 목록 (배열)
    zipCode?: string;
    address1?: string;
    address2?: string;
    etc?: string;
}

export interface RequestCustomer {
    customerId: string,
    customerName: string,
    affiliationId: string,
    billName?: string,
    ceo?: string,
    ceoNum?: string,
    businessNumber?: string,
    businessType?: string,
    contents?: string,
    etc: string,
    customerRp?: string,
    customerRpCall?: string,
    bankName?: string,
    bankNum?:string,
    bankOwner?: string,
    handlingItem?: string,
    memo?: string,
    category?: string,
    phoneNumber?: string,
    fax?: string,
    userId:string,
    zipCode?: string,
    address1?: string,
    address2?: string,
}




