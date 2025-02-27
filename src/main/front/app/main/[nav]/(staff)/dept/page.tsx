import Dept from "@/components/main-view/staff/dept/dept";
import { PageByProps } from "@/types/share/type";


export default async function DeptPage({searchParams}:PageByProps){

    const initDept = await fetch("http://localhost:8080/api/getDept",
        {
            cache:'force-cache',
            next: { tags: ['dept']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return (
        <section key={JSON.stringify(initDept)}>
            <Dept InitDept={initDept}/>
        </section>
    )
}