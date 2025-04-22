import { CustomerSearchCondition, RequestCustomer, ResponseCustomer } from "@/model/types/customer/customer/type";

export const searchCustomersApi = async (searchCondition:CustomerSearchCondition)=>{
    
    const nextOptions = {
        revalidate: 300,
        ...(searchCondition.customerName ? { tags: [searchCondition.customerName] } : {})
    };
    try {
        const response = await fetch("http://localhost:8080/api/getCustomers", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchCondition),
            next:nextOptions

        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}



export const getCustomerAPi = async (customerId:string)=>{
    
    try {
        const response = await fetch("http://localhost:8080/api/getCustomer", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({customerId}),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}


export const saveCustomerApi = async (postData:Omit<RequestCustomer, 'customerId'>)=>{

    try {
        const response = await fetch("http://localhost:8080/api/saveCustomer", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),

        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status
    } catch (error) {
        console.error('Error:', error);
    }
}
export const updateCustomerApi = async (postData:RequestCustomer)=>{

    try {
        const response = await fetch("http://localhost:8080/api/updateCustomer", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),

        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status
    } catch (error) {
        console.error('Error:', error);
    }
}

export const deleteCustomerApi = async (customerId:string)=>{

    try {
        const response = await fetch("http://localhost:8080/api/deleteCustomer", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({customerId}),

        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status
    } catch (error) {
        console.error('Error:', error);
    }
}

