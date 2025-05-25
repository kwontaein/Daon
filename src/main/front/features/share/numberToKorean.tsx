import { numToKorean } from "num-to-korean";

export const changeNumberToKorean =(price:number, isSpace:boolean = false)=>{
    const result = numToKorean(price);
    const spacedResult = result.replace(/(억|만|천|백|십|원)/g, '$1 ').trim();
    
    return isSpace ? spacedResult : result
}
