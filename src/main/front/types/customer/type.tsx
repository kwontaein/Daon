export interface RequestCustomer {
    customerId: string; // UUID는 문자열로 처리
    customerName: string;
    contactInfo: string;
    category: string;
    phoneNumber: string;
    fax: string;
    userId: string;
    cateId: string; // UUID는 문자열로 처리
}

export interface ResponseCustomer {
    customerId: string;
    customerName: string;
    contactInfo?: string;
    billName?: string;
    ceo?: string;
    ceoNum?: string;
    companyNum?: string;
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
    customerCateId: CustomerCate; 
    estimates: Estimate[]; // 견적서 목록 (배열)
    zipCode?: string;
    address1?: string;
    address2?: string;
    etc?: string;
}

export interface SelectRegisterCate{
    customerCateId: string;
    category: string;
    etc: string;
}
  
export interface Estimate {
    estimateId: string;
    estimateName: string;
    amount: number;
}

export interface CustomerCate{
    customerCateId:string;
    customerCateKey:string;
    customerCateName:string;
}
  


