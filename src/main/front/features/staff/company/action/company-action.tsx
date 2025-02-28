"use server";

import {v4 as uuidv4} from "uuid";

function isInvalidText(text) {
    return !text || text.trim() === '';
  }


export async function submitCompanyInfo(prevState, formData) {
    const companyData = {
        companyName: formData.get('companyName'),
        printName: formData.get('printName'),
        ceo: formData.get('ceo'),
        ceoCert: formData.get('ceoCert'), //ceo 주민등록번호
        businessNum: formData.get('businessNum'),
        tel: formData.get('tel'),
        tel2: formData.get('tel2'),
        fax: formData.get('fax'),
        businessStatus: formData.get('businessStatus'),
        businessKind: formData.get('businessKind'),
        zipcode: formData.get('zipcode'),
        zipcode2: formData.get('zipcode2'),
        address: formData.get('address'),
        addressDetail: formData.get('addressDetail'),
        bank: formData.get('bank'),
        account: formData.get('account'),
        bankName: formData.get('bankName'),
        memo: formData.get('memo'),
        estimate: formData.get('estimate'),
        stamp: formData.get('stamp'),
    };

    const errors =[]
    if(isInvalidText(companyData.companyName)){
        errors.push(['companyName', '상호명을 입력해주세요.'])
    }
    if(isInvalidText(companyData.printName)){
        errors.push(['printName', '인쇄명을 입력해주세요.'])
    }
    if(isInvalidText(companyData.businessNum)){
        errors.push(['companyName', '사업자등록번호를 입력해주세요.'])
    }
    if(isInvalidText(companyData.ceo)){
        errors.push(['etc', '대표자명을 입력해주세요.'])
    }

    if(errors.length>0){
      
        const formErrors = Object.fromEntries(errors)
        formErrors.errorKey = uuidv4()
        const state = {
            ...companyData,
            formErrors
        } 
        return state ;
    }

    return {};
  }
  