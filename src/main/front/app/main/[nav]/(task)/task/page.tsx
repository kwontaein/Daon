import TaskSearch from "@/components/main/task/task/search";
import getTask from "@/features/task/task/api/taskApi";

import { Affiliation } from "@/model/types/customer/affiliation/type";
import { PageByProps } from "@/model/types/share/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";
import { ResponseTask } from "@/model/types/task/task/type";

export default async function TaskPage({searchParams}:PageByProps){
    const page = (await searchParams).page || 1;

 
    const initialTask:ResponseTask[] =await getTask()


    const affiliations:Affiliation[] = await fetch("http://localhost:8080/api/getAffiliation",{
        next: {revalidate: 3600000, tags: ['affiliation']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {console.error('Error:', error)})

  

    const employees: ResponseEmployee[] = await fetch("http://localhost:8080/api/getEmployees", {
        headers: {
            'Content-Type': 'application/json',
        },
        // cache:'no-store',
        next: {revalidate: 3600000, tags: ['employee']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    })

    
    return(
        <section key={JSON.stringify(initialTask)+page}>
           <TaskSearch
                affiliations={affiliations}
                initialTask={initialTask}
                employees={employees}
                page={page}/>
        </section>
    )
}