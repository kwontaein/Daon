"use server";

import {v4 as uuidv4} from "uuid";
import { saveCustomerApi, updateCustomerApi } from "../api/server-api";

function isInvalidText(text) {
    return !text || text.trim() === '';
  }

export async function submitBusinessInfo(prevState, formData) {
    const customerData = {
        customerId: formData.get('customerId'),
        customerName: formData.get('customerName'),
        affiliationId: formData.get('affiliationId'),
        billName: formData.get('billName'),
        ceo: formData.get('ceo'),
        ceoNum: formData.get('ceoNum'),
        businessNumber: formData.get('businessNumber'),
        businessType: formData.get('businessType'),
        contents: formData.get('contents'),
        etc: formData.get('etc'),
        customerRp: formData.get('customerRp'),
        customerRpCall: formData.get('customerRpCall'),
        bankName: formData.get('bankName'),
        bankNum: formData.get('bankNum'),
        bankOwner: formData.get('bankOwner'),
        handlingItem: formData.get('handlingItem'),
        memo: formData.get('memo'),
        category: formData.get('category'),
        phoneNumber: formData.get('phoneNumber'),
        fax: formData.get('fax'),
        userId:formData.get('userId'),
        zipCode: formData.get('zipCode'),
        address1: formData.get('address1'),
        address2: formData.get('address2'),
    };

    const action = formData.get('action')
    let status
    
    if(action){
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
        
        const postData = Object.fromEntries(
            Object.entries(customerData).filter(([key,value])=> (value!=='none' && value!==null))
        )
        if(action==='write'){
            status = await saveCustomerApi(postData)
        }else if(action ==='edit'){
            status = await updateCustomerApi(postData)
        }
    }
 
    delete prevState.formErrors
    delete prevState.status
    return {
        ...prevState,
        ...customerData,
        status
    };
  }
  