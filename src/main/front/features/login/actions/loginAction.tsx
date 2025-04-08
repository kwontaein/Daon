import { loginApi } from "../api/loginApi";

function isInvalidText(text) {
    return !text || text.trim() === '';
}
export default async function loginAction(prevState, formData){
    const formState={
        userId:formData.get('userId'),
        password:formData.get('password')
    }

    const errors=[]
    if(isInvalidText(formState.userId) && isInvalidText(formState.password)){
        errors.push(['message', '아이디 및 비밀번호를 입력해주세요.'])
    }else if(isInvalidText(formState.userId)){
        errors.push(['message', '아이디를 입력해주세요.'])
    }else if(isInvalidText(formState.password)){
        errors.push(['message', '비밀번호를 입력해주세요.'])
    }


    if(errors.length>0){
        const formErrors = Object.fromEntries(errors)
        return {
            ...formState,
            formErrors,
        }
    }
    
    const status = await loginApi(formState)
    console.log(status)

    return formState
}