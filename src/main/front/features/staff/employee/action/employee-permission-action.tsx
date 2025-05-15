import { AsideOptions } from "@/model/constants/routes/asideOptions"
import { EnableUrlType, ListOfAside } from "@/model/types/staff/employee/type";
import { updateEnableUrl } from "../api/employeeApi";
import { kebabToCamel } from "@/features/share/kebabToCamel";

export async function permissionFormAction(prevState,formState){
    const permissionState:ListOfAside & { userId:string } ={
        ...(Object.fromEntries(Object.entries(AsideOptions).reduce((prev,[nav,{asideItems}])=>{
            const checkedByAsideState = formState.getAll(nav)
            asideItems.forEach(({link})=>{
                prev.push([kebabToCamel(link), checkedByAsideState.includes(kebabToCamel(link))])
            })
            return prev
        },[]))),
        userId:prevState.userId
    } 
    console.log(permissionState)
    
    const action = formState.get('action')
    let status;
    if(action==='submit'){
        status = await updateEnableUrl(permissionState)
    }
    return{
        ...prevState,
        ...permissionState,
        status
    }
}