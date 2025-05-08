import { RequestRemain } from "@/model/types/sales/remain/type";

export const getNoPaidApi = async(searchCondition:RequestRemain)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getNoPaid`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            credentials:'include',            
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}