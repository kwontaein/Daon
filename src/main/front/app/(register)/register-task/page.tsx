import TaskForm from "@/components/main/task/task/form/task-form";
import { ResponseStaff } from "@/model/types/staff/staff/type";

export default async function RegisterTask(){
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    const staff:ResponseStaff[] = await fetch("http://localhost:8080/api/getEmployees", {
        headers: {
            'Content-Type': 'application/json',
        },
        signal,
        // cache:'no-store',
        next: {revalidate: 3600000, tags: ['staff']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));

    return(
        <TaskForm staff={staff}/>
    )
}