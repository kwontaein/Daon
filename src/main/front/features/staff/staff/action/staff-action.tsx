"use server";

import {v4 as uuidv4} from "uuid";
import { saveEmployeeApi, updateEmployeeApi } from "../api/staffApi";
import { revalidatePath, revalidateTag } from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === '';
  }

export async function submitStaffInfo(prevState, formData) {
    const staffData= {
        userId: formData.get('userId'),
        password: formData.get('password'),
        married: formData.get('married'),
        joinDate: formData.get('joinDate'),
        birthday: formData.get('birthday'),
        name: formData.get('name'),
        engName: formData.get('engName'),
        chName: formData.get('chName'),
        zipcode: formData.get('zipcode'),
        address: formData.get('address'),
        addressDetail: formData.get('addressDetail'),
        tel1: formData.get('tel1'),
        tel2: formData.get('tel2'),
        tel3: formData.get('tel3'),
        phone1: formData.get('phone1'),
        phone2: formData.get('phone2'),
        phone3: formData.get('phone3'),
        email: formData.get('email'),
        memo: formData.get('memo'),
        userClass: formData.get('userClass'), //직급
        userRole: formData.get('userRole'), //권한등급
        deptId: formData.get('deptId'),
    };

    

    const errors =[]
    if(staffData.userClass==='none'){
        errors.push(['userClass', '직급을 선택해주세요.'])
    }
    if(staffData.deptId==='none'){
        errors.push(['dept', '부서를 선택해주세요.'])
    }
    if(staffData.userClass==='none'){
        errors.push(['userClass', '직급을 입력해주세요.'])
    }
    if(isInvalidText(staffData.name)){
        errors.push(['name', '이름을 입력해주세요.'])
    }
    if(isInvalidText(staffData.userId)){
        errors.push(['userId', '아이디를 입력해주세요.'])
    }
    if(isInvalidText(staffData.password)){
        errors.push(['password', '비밀번호를 입력해주세요.'])
    }
    if(!staffData.joinDate){
        errors.push(['joinDate', '입사일을 입력해주세요.'])
    }
   

    const formKey = uuidv4()

    if(errors.length>0){
        const formErrors = Object.fromEntries(errors)
        const state = {
            ...prevState,
            ...staffData,
            formErrors,
            formKey,
            post_success:false,
        } 
        return state ;
    }

    const {phone1, phone2, phone3, tel1, tel2, tel3} = staffData
    const phone =[phone1,phone2,phone3]
    const tel = [tel1,tel2,tel3]
    const postData ={
        ...staffData,
        phone: phone.join('-'),
        tel: tel.join('-'),
        married: staffData.married ==='married'
    }
    delete postData.phone1
    delete postData.phone2
    delete postData.phone3
    delete postData.tel1
    delete postData.tel2
    delete postData.tel3

    let res;

    console.log(postData)

    // API 요청 
    if(prevState.isUpdate){
        res = await updateEmployeeApi(postData)
    }else{
        res = await saveEmployeeApi(postData)
    }

    if(res && res === 200){
        revalidateTag("staff");
        return {
            post_success: true, 
            ...(prevState.isUpdate? staffData :{}),
            formKey,
        }
    }else{
        return {
            ...prevState,
            ...staffData,
            post_success: false,
            formKey
        }
    }
  }
  