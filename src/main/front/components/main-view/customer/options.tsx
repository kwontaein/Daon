import './options.scss';
import { ClientMousePosition } from "@/types/share/type";

export default function CustomerOptions({customerId}:{customerId:string}){

    
    return(
        <menu className='options-container'>
            <li onClick={()=>console.log('원장조회')}>원장조회</li>
            <li>상세보기</li>
        </menu>    
    )
}