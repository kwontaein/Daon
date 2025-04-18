export default function CustomNumberInput({name, defaultValue,onChange,readOnly} : {
    name: string,
    defaultValue: string
    onChange?:(text:number)=>void
    readOnly?:boolean
}) {

    const numberInputHandler = (e)=>{
        const target = e.target as HTMLInputElement;
        const rawValue = target.value.replace(/,/g, "");
    
        if (!/^\d*$/.test(rawValue)) {
            target.value = Number(rawValue.replace(/\D/g, "")).toLocaleString(); // 숫자가 아닌 것 제거
            return;
        }
        if(onChange){
            onChange(Number(rawValue))
        }
        target.value = Number(rawValue).toLocaleString(); // 천 단위 콤마 추가   
    }
    
    return(
        <input
            name={name}
            type="text"
            defaultValue={defaultValue}
            inputMode="numeric"
            pattern="\d*" // 숫자만 입력 가능
            onInput={numberInputHandler}    
            style={{textAlign:'right'}}
            readOnly={readOnly}
        />
    )
}