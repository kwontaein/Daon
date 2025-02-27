
// 인터페이스 정의
export interface ResponseStaff {
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
  userClass: ClassType; //직급
  userRole: RoleType;   //권한등급
  dept: DeptEum;   //부서
}



// 직급
export enum ClassType {
    CEO = "CEO",
    DIRECTOR = "DIRECTOR",
    MANAGER = "MANAGER",
    STAFF = "STAFF",
    ASSISTANT_MANAGER = "ASSISTANT_MANAGER",
    PROFESSIONAL = "PROFESSIONAL",
    TEAM_LEADER = "TEAM_LEADER",
    DEPUTY_GENERAL_MANAGER = "DEPUTY_GENERAL_MANAGER",
  }
  
  // 권한
  export enum RoleType {
    USER = "USER",
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
  }
  
  // 부서
  export enum DeptEum {
    WEB = "WEB",
    BUSINESS = "BUSINESS",
    ELSE = "ELSE",
    MANAGE = "MANAGE",
  }
