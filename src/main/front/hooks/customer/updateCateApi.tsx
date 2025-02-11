'use server';

import { CustomerCateType } from "@/types/customer/cate/type";
import { revalidatePath, revalidateTag } from "next/cache";


export const updateCateApi = async (cates: CustomerCateType[]) => {
    return fetch("http://localhost:8080/api/saveCustomerCate", {
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
        revalidateTag('customersCate')
        revalidatePath("/main/customer/customer-cate");
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteCateApi =async (cate: CustomerCateType) => {
    return fetch("http://localhost:8080/api/deleteCustomerCate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cate),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        revalidateTag('customersCate')
        revalidatePath("/main/customer/customer-cate");
    }).catch((error) => {
        console.error('Error:', error)
    })
}