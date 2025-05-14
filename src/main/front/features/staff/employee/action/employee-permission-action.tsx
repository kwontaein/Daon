import { AsideOptions } from "@/model/constants/routes/asideOptions"
function kebabToCamel(str: string): string {
    return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  }
export async function permissionFormAction(prevState,formState){
    const permissionState ={
        ...(Object.fromEntries(Object.entries(AsideOptions).reduce((prev,[nav,{asideItems}])=>{
            const checkedByAsideState = formState.getAll(nav)
            asideItems.forEach(({link})=>{
                prev.push([kebabToCamel(link), checkedByAsideState.includes(link)])
            })
            return prev
        },[]))),
        userId:prevState.userId
    }
    console.log(permissionState)
    
    const action = formState.get('action')
    if(action==='submit'){
        
    }
    return{
        ...prevState,
        ...permissionState
    }
}