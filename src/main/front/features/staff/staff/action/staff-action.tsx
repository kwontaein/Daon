"use server";

import {v4 as uuidv4} from "uuid";

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
        dept: formData.get('dept'),
    };

    const errors =[]
    if(staffData.userClass==='none'){
        errors.push(['userClass', '직급을 선택해주세요.'])
    }
    if(staffData.dept==='none'){
        errors.push(['dept', '부서를 선택해주세요.'])
    }
    if(staffData.userClass==='none'){
        errors.push(['userClass', '직급을 입력해주세요.'])
    }
    if(isInvalidText(staffData.name)){
        errors.push(['name', '이름을 입력해주세요.'])
    }
    if(isInvalidText(staffData.userId) && !prevState.duplicationChecked){
        errors.push(['userId', '아이디를 입력해주세요.'])
    }
    if(isInvalidText(staffData.password)){
        errors.push(['password', '비밀번호를 입력해주세요.'])
    }
    if(!staffData.joinDate){
        errors.push(['joinDate', '입사일을 입력해주세요.'])
    }
    if(!isInvalidText(staffData.userId) && !prevState.duplicationChecked){
        errors.push(['duplication', '아이디 중복체크를 해주세요.'])
    }

    if(errors.length>0){
      
        const formErrors = Object.fromEntries(errors)
        formErrors.errorKey = uuidv4()
        const state = {
            ...prevState,
            ...staffData,
            formErrors,
        } 
        return state ;
    }

    return {};
  }
  