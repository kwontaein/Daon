import { CustomerSearchCondition } from "@/model/types/customer/customer/type";

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

