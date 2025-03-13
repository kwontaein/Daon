import TaskSearch from "@/components/main/task/task/search";
import TaskSearchResult from "@/components/main/task/task/search-result";
import getTask from "@/features/task/task/api/taskApi";

<<<<<<< HEAD
import { Affiliation } from "@/model/types/customer/affiliation/type";
=======
import { CustomerAffiliation } from "@/model/types/customer/affiliation/type";
>>>>>>> 435d1d9d85ff8e39fb4176b15182c3ed5a814454
import { PageByProps } from "@/model/types/share/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";
import { ResponseTask } from "@/model/types/task/task/type";

export default async function TaskPage({searchParams}:PageByProps){
    const page = (await searchParams).page || 1;

    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(()=> controller.abort(), 10000)
<<<<<<< HEAD

 
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
=======

 
    const initialTask:ResponseTask[] = await fetch("http://localhost:8080/api/getTask", {
>>>>>>> 435d1d9d85ff8e39fb4176b15182c3ed5a814454
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
<<<<<<< HEAD
=======
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));


    const customerAffiliations:CustomerAffiliation[] = await fetch("http://localhost:8080/api/getAffiliation",{
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
>>>>>>> 435d1d9d85ff8e39fb4176b15182c3ed5a814454
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }
        console.error('Error:', error)
    })
<<<<<<< HEAD

    return(
        <section key={JSON.stringify(initialTask)+page}>
           <TaskSearch
                affiliations={affiliations}
=======
    
    return(
        <section key={JSON.stringify(initialTask)+page}>
           <TaskSearch
                customerAffiliations={customerAffiliations}
>>>>>>> 435d1d9d85ff8e39fb4176b15182c3ed5a814454
                initialTask={initialTask}
                employees={employees}
                page={page}/>
        </section>
    )
}