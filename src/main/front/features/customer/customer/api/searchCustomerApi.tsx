import { CustomerSearchCondition } from "@/model/types/customer/customer/type";

export const fetchSearchCustomers = async (searchCondition:CustomerSearchCondition)=>{
    try {
        const response = await fetch("http://localhost:8080/api/getCustomers", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}