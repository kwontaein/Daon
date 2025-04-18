"use server";

import {v4 as uuidv4} from "uuid";

function isInvalidText(text) {
    return !text || text.trim() === '';
  }

export async function submitBusinessInfo(prevState, formData) {
    const customerData = {
      category: formData.get('category'),
      affiliationId: formData.get('affiliationId'),
      customerName: formData.get('customerName'),
      billName: formData.get('billName'),
      ceo: formData.get('ceo'),
      ceoNum: formData.get('ceoNum'),
      businessNumber: formData.get('businessNumber'),
      businessType: formData.get('businessType'),
      contents: formData.get('contents'),
      etc: formData.get('etc'),
      customerRp: formData.get('customerRp'),
      phoneNumber: formData.get('phoneNumber'),
      fax: formData.get('fax'),
      zipCode: formData.get('zipCode'),
      address1: formData.get('address1'),
      address2: formData.get('address2'),
      customerRpCall: formData.get('customerRpCall'),
      bankName: formData.get('bankName'),
      bankNum: formData.get('bankNum'),
      bankOwner: formData.get('bankOwner'),
      handlingItem: formData.get('handlingItem'),
      memo: formData.get('memo'),
    };

    const errors =[]
    if(customerData.category==='none'){
        errors.push(['category', '거래처구분을 선택해주세요.'])
    }
    if(customerData.affiliationId==='none'){
        errors.push(['affiliationId', '소속을 선택해주세요.'])
    }
    if(isInvalidText(customerData.customerName)){
        errors.push(['customerName', '상호명을 입력해주세요.'])
    }
    if(customerData.etc==='none'){
        errors.push(['etc', '담당자를 입력해주세요.'])
    }

    if(errors.length>0){
      
        const formErrors = Object.fromEntries(errors)
        formErrors.errorKey = uuidv4()
        const state = {
            ...customerData,
            formErrors
        } 
        return state ;
    }

    return {};
  }
  