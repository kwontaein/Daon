"use server"
import {CustomerSearchCondition, RequestCustomer} from "@/model/types/customer/customer/type";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";


export const searchCustomersApi = async (searchCondition: CustomerSearchCondition) => {

    const nextOptions = {
        revalidate: 300,
        ...(searchCondition.customerName ? {tags: [searchCondition.customerName]} : {})
    };
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCustomers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(searchCondition),
            next: nextOptions

        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export const getCustomerAPi = async (customerId: string) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCustomer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify({customerId}),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export const saveCustomerApi = async (postData: Partial<Omit<RequestCustomer, 'customerId'>>) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveCustomer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(postData),

        });
        await jwtFilter(response.status.toString());


        return response.status
    } catch (error) {
        console.error('Error:', error);
    }
}
export const updateCustomerApi = async (postData: Partial<RequestCustomer>) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateCustomer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(postData),

        });        await jwtFilter(response.status.toString());

        return response.status
    } catch (error) {
        console.error('Error:', error);
    }
}

export const deleteCustomerApi = async (customerId: string) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteCustomer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify({customerId}),

        });
        await jwtFilter(response.status.toString());


        return response.status
    } catch (error) {
        console.error('Error:', error);
    }
}

