import { ResponseCustomer } from "../../customer/customer/type";
import { ResponseEmployee } from "../../staff/employee/type";

export enum TaskType {
    AS = "A/S", // A/S
    INCOMING = "입고", // 입고
    DELIVERY = "납품", // 납품
    INVENTORY = "재고", // 재고
    OTHER = "기타", // 기타
    RENTAL = "임대", // 임대
    MAINTENANCE = "유지보수", // 유지보수
    ATTENDANCE = "근태", // 근태
  }

export interface ResponseTask {
    taskId: string; // 업무 아이디
    taskType: TaskType; // 구분 (ENUM 사용)
    customer: ResponseCustomer; // 거래처
    requesterName: string; // 의뢰자명
    requesterContact: string; // 의뢰자 연락처
    requesterContact2?: string; // 의뢰자 연락처2 (선택적)
    model: string; // 모델
    isCompleted: boolean; // 처리 여부
    assignedUser: ResponseEmployee; // 담당 기사 (유저)
    details?: string; // 내용 (선택적)
    remarks?: string; // 비고 (선택적)
    createdAt: string; // 생성일 (ISO 문자열)
    updatedAt: string; // 수정일 (ISO 문자열)
    estimateId?:string;
  }
  export interface TaskSearchCondition {
    customer:string,
    taskType: TaskType|'none'|null, //구분
    affiliation:string|null, //거래처구분
    assignedUser:string|null, //담당자
} 

export type SaveTask = Omit<ResponseTask,'taskId'|'updatedAt'|'createdAt'|'isCompleted'>
