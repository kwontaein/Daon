import { AsideOptions } from "@/model/constants/routes/asideOptions";
import { Dept } from "../dept/type";


// 인터페이스 정의
export interface ResponseEmployee {
  userId: string;
  password: string;
  married: boolean;
  joinDate: Date;
  birthday: Date;
  name: string;
  engName: string; //영어이름
  chName: string; //한자이름
  zipcode: string;
  address: string;
  addressDetail: string;
  tel: string;
  phone: string;
  email: string;
  memo: string;
  userClass: EmployeeClassEnum; //직급
  userRole: UserRoleEnum;   //권한등급
  dept: Dept;   //부서
}



// 직급
export enum EmployeeClassEnum {
    CEO = "대표",
    DIRECTOR = "이사",
    MANAGER = "과장",
    STAFF = "사원",
    ASSISTANT_MANAGER = "대리",
    PROFESSIONAL = "주임",
    TEAM_LEADER = "팀장",
    DEPUTY_GENERAL_MANAGER = "차장",
  }

  // 권한
  export enum UserRoleEnum {
    USER = "일반사용자",
    ADMIN = "관리자",
    MANAGER = "매니저",
  }
  
export type EmployeePermission ={
    receipt: boolean; // 전표입력
    task: boolean; // 업무관리
    admin: boolean; // 관리자데이터조회
    estimate: boolean; // 견적서관리
    taskEstimate: boolean; // 견적서관리 [업무]
    remain: boolean; // 미수/미지급현황
    official: boolean; // 관리비관리
    customer: boolean; // 거래처관리
    affiliation: boolean; // 소속관리
    stock: boolean; // 품목/재고 관리
    stockCate: boolean; // 분류관리
    point: boolean; // 구매적립금설정
    ledgerCustomer: boolean; // 거래처별원장출력
    ledgerCustomers: boolean; // 복수거래처원장출력
    ledgerStock: boolean; // 품목별원장출력
    ledgerSales: boolean; // 매출장 출력
    ledgerPurchase: boolean; // 매입장 출력
    ledgerOfficial: boolean; // 관리비 원장출력
    ledgerStockCount: boolean; // 재고조사서
    ledgerEtc: boolean; // 기타원장
    company: boolean; // 회사정보
    employee: boolean; // 사원관리
    dept: boolean; // 부서관리
    pvat: boolean; // 매입부가세
    svat: boolean; // 매출부가세
    pset: boolean; // 조달및수익계약정산
    card: boolean; // 카드결제내역
    proof: boolean; // 지출증빙
    board: boolean; // 사내게시판
    schedule: boolean; // 내일정관리
}


