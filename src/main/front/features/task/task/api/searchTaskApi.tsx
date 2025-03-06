import { TaskSearchCondition } from "@/model/types/task/task/type";

export const fetchSearchTask = async (searchCondition:TaskSearchCondition)=>{
    try {
        const response = await fetch("http://localhost:8080/api/getTaskByOption", {
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