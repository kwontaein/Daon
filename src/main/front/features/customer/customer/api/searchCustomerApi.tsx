import { CustomerSearchCondition, RequestCustomer } from "@/model/types/customer/customer/type";

export const searchCustomersApi = async (searchCondition:CustomerSearchCondition)=>{
    
    const nextOptions = {
        revalidate: 300,
        ...(searchCondition.customerName ? { tags: [searchCondition.customerName] } : {})
    };
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCustomers`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            credentials:'include',            
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCustomer`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            credentials:'include',            
            body: JSON.stringify({customerId}),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}


export const saveCustomerApi = async (postData:Partial<Omit<RequestCustomer, 'customerId'>>)=>{

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveCustomer`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            credentials:'include',            
            body: JSON.stringify(postData),

        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status
    } catch (error) {
        console.error('Error:', error);
    }
}
export const updateCustomerApi = async (postData:Partial<RequestCustomer>)=>{

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateCustomer`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            credentials:'include',            
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteCustomer`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            credentials:'include',            
            body: JSON.stringify({customerId}),

        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status
    } catch (error) {
        console.error('Error:', error);
    }
}

