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
  
