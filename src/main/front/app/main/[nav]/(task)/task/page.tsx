import TaskSearch from "@/components/main/task/task/search";
import TaskSearchResult from "@/components/main/task/task/search-result";

import { CustomerCate } from "@/model/types/customer/cate/type";
import { PageByProps } from "@/model/types/share/type";
import { ResponseTask } from "@/model/types/task/task/type";

export default async function TaskPage({searchParams}:PageByProps){
    const page = (await searchParams).page || 1;

    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

 
    const initialTask:ResponseTask[] = await fetch("http://localhost:8080/api/getTask", {
        headers: {
            'Content-Type': 'application/json',
        },
        signal,
        next: {revalidate: 3600000, tags: ['task']} //1시간마다 재검증
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


    const customerCate:CustomerCate[] = await fetch("http://localhost:8080/api/getCustomerCate",{
        next: {revalidate: 3600000, tags: ['customersCate']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {console.error('Error:', error)})


    return(
        <section>
            <TaskSearch customerCate={customerCate} initialTask={initialTask} page={page}/>
        </section>
    )
}