'use server';

import { CustomerCateType } from "@/types/customer/cate/type";
import { revalidatePath, revalidateTag } from "next/cache";


export const updateCateApi = async (cates: CustomerCateType[]) => {
    return fetch("http://localhost:8080/api/updateCustomerCate", {
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
        revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const createCateApi = async (customer: CustomerCateType) => {
    return fetch("http://localhost:8080/api/saveCustomerCate", {
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
        revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteCateApi =async (customer: CustomerCateType) => {
    return fetch("http://localhost:8080/api/deleteCustomerCate", {
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
        revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}