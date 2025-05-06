"use server";

import {v4 as uuidv4} from "uuid";
import { saveEmployeeApi, updateEmployeeApi, userIdDuplicationChecked } from "../api/employeeApi";
import { revalidateTag } from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === '';
  }

export async function submitEmployeeInfo(prevState, formData) {
    const employeeData= {
        userId: formData.get('userId'),
        password: formData.get('password'),
        married: formData.get('married') ==='married',
        joinDate: formData.get('joinDate'),
        birthday: formData.get('birthday'),
        name: formData.get('name'),
        engName: formData.get('engName'),
        chName: formData.get('chName'),
        zipcode: formData.get('zipcode'),
        address: formData.get('address'),
        addressDetail: formData.get('addressDetail'),
        tel: formData.get('tel'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        memo: formData.get('memo'),
        userClass: formData.get('userClass'), //직급
        userRole: formData.get('userRole'), //권한등급
        deptId: formData.get('deptId'),
    };
    console.log(employeeData)

    const action = formData.get('action')
    const errors =[]
    let status;

   if(action ==='submit'){
        if(employeeData.userClass==='none'){
            errors.push(['userClass', '직급을 선택해주세요.'])
        }
        if(employeeData.deptId==='none'){
            errors.push(['dept', '부서를 선택해주세요.'])
        }
        if(employeeData.userClass==='none'){
            errors.push(['userClass', '직급을 입력해주세요.'])
        }
        if(isInvalidText(employeeData.name)){
            errors.push(['name', '이름을 입력해주세요.'])
        }
        if(isInvalidText(employeeData.userId)){
            errors.push(['userId', '아이디를 입력해주세요.'])
        }
        if(isInvalidText(employeeData.password)){
            errors.push(['password', '비밀번호를 입력해주세요.'])
        }
        if(!employeeData.joinDate){
            errors.push(['joinDate', '입사일을 입력해주세요.'])
        }
        if(isInvalidText(employeeData.birthday)){
            errors.push(['birthday','생년월일을 입력해주세요.'])
        }

        const formKey = uuidv4()

        if(errors.length>0){
            const formErrors = Object.fromEntries(errors)
            const state = {
                ...prevState,
                ...employeeData,
                formErrors,
                formKey,
                post_success:false,
            } 
            return state ;
        }


        // API 요청 
        if(prevState.isUpdate){
            status = await updateEmployeeApi(employeeData)
        }else{
            status = await saveEmployeeApi(employeeData)
        }
   }

   delete prevState.status
   return {
        ...prevState,
        ...employeeData,
        status,
    }
   
    
  }
  