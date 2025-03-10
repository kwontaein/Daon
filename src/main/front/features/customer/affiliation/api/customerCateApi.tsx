'use server';

import { CustomerAffiliation } from "@/model/types/customer/affiliation/type";
import { revalidateTag } from "next/cache";


export const updateAffiliationApi = async (cates: CustomerAffiliation[]) => {
    return fetch("http://localhost:8080/api/updateAffiliation", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cates),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("customersCate");
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveAffiliationApi = async (customer: Pick<CustomerAffiliation,'customerAffiliationName'>) => {
    return fetch("http://localhost:8080/api/saveAffiliation", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("customersCate");
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteAffiliationApi =async (customer: CustomerAffiliation) => {
    return fetch("http://localhost:8080/api/deleteAffiliation", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("customersCate")
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}