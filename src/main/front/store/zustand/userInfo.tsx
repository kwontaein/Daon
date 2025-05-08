import { EmployeeClassEnum, UserRoleEnum } from '@/model/types/staff/employee/type'
import {create} from 'zustand'


export type UserInfo ={
    userId:string
    userName:string
    class: EmployeeClassEnum,
    role: UserRoleEnum,
    last_login:Date,
    dept_Id:string,
    deptName:string,
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