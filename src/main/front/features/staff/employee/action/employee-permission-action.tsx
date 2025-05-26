import { AsideOptions } from "@/model/constants/routes/asideOptions"
import { updateEnableUrl } from "../api/server-api";
import { kebabToCamel } from "@/features/share/kebabToCamel";
import { ListOfAside } from "@/model/types/share/type";

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