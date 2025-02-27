'use client';
import './filter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useReducer } from "react"
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function FilterButton({children}:{children:React.ReactNode}){
    const [isClick,setIsClick] = useReducer((prev)=>!prev,false)
    return(
        <div className='filter-button' onClick={setIsClick}>
            <FontAwesomeIcon icon={faFilter}/>필터
            {isClick && children}
        </div>
    )
}