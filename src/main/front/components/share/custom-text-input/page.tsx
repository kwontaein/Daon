'use client'
import { useReducer } from 'react'
import './custom-text-input.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
function CustomTextInput({name, type, placeholder, defaultValue, onChange}:{
    name:string
    type:string
    placeholder:string
    defaultValue?:string
    onChange?:(string)=>void
}){
    const [showPassword, setShowPassword] =useReducer((prev)=>!prev,false)
    return(
        <div className="input-wrapper">
            <input
                id={name}
                name={name}
                type={type==='password'? (showPassword ? 'text':type):type}
                placeholder={placeholder}
                onChange={(e)=> {
                    onChange && onChange(e.target.value)
                }}
                style={type!=='password' ? {width:"100%"}:{}}
                defaultValue={defaultValue??''}
                autoComplete={type==='password' ? "current-password" :''}
            />
            <label htmlFor={name}>{placeholder}</label>
            {type==='password' &&
                <div className='eyes' onClick={setShowPassword}>
                    <FontAwesomeIcon icon={showPassword ? faEye: faEyeSlash}/>
                </div>}
        </div>
    )
}
export default CustomTextInput