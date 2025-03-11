import CustomerForm from "@/components/main/customer/form/customer-form";
import { Affiliation } from "@/model/types/customer/affiliation/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";

export default async function RegisterAffiliation(){
    
    const affiliation:Affiliation[] = await fetch("http://localhost:8080/api/getAffiliation",{
        next: {revalidate: 3600000, tags: ['affiliation']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {console.error('Error:', error)})

    const employees:ResponseEmployee[] = await fetch("http://localhost:8080/api/getEmployees", {
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
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    })


    return(
        <CustomerForm affiliation={affiliation} employees={employees}/>
    )
}