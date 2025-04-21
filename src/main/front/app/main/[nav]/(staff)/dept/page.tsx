import Dept from "@/components/main/staff/dept/dept";
import { PageByProps } from "@/model/types/share/type";


export default async function DeptPage({searchParams}:PageByProps){

    const initDept = await fetch("http://localhost:8080/api/getDept",
        {
            cache:'force-cache',
            next: { tags: ['dept']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return <Dept InitDept={initDept}/>
 
}