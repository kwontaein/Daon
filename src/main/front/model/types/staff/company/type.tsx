
export interface ResponseCompany {
    companyId:string;
    companyName: string;      // 회사이름
    printName: string;        // 인쇄명
    ceo: string;              // CEO 이름
    ceoCert: string;          // CEO 주민번호
    businessNumber: string;      // 사업자등록번호
    tel: string;              // 전화번호1
    tel2: string;             // 전화번호2
    fax: string;              // FAX 번호
    businessStatus: string;   // 업태
    businessKind: string;     // 종목
    zipcode: string;          // 우편번호
    address: string;          // 주소
    addressDetail: string;    // 상세주소
    bank: string;             // 은행이름
    account: string;          // 은행계좌
    bankName: string;         // 은행계좌이름
    memo: string;             // 메모
    estimate: string;         // 견적서 파일
    stamp: string;            // 도장 파일
}

