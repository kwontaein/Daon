import EmployeeForm from "@/components/main/staff/employee/form/employee-form";
import MobileModal from "@/components/share/mobile-modal/page";
import { Dept } from "@/model/types/staff/dept/type";

export default async function RegisterStaff(){
    const dept:Dept[] = await fetch("http://localhost:8080/api/getDept",
        {
            cache:'force-cache',
            next: { tags: ['dept']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return(
        <MobileModal >
            <EmployeeForm dept={dept} isMobile={true}/>
        </MobileModal>
    )
}