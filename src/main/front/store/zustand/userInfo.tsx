import { EmployeeClassEnum, UserRoleEnum } from '@/model/types/staff/employee/type'
import {create} from 'zustand'


export type UserInfo ={
    userId: string,
    joinDate: Date,
    birthday: Date,
    name: string,
    tel: string,
    phone: string,
    email: string,
    memo: string,
    userClass: EmployeeClassEnum,
    userRole: UserRoleEnum,
    dept: { deptId: string, deptName: string }
}

export type UserState ={
    user:Partial<UserInfo>,
    setUser:(user:UserInfo)=>void
    deleteUser:()=>void,
}

export const useUserInformation = create<UserState>(set=>({
    user:{},
    setUser:(user:UserInfo)=>set({user}),
    deleteUser:()=>set({user:{}}),
}))