"use client";
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss';
import { StockCate } from "@/model/types/stock/cate/type";
import { ResponseStock, TaxationCate } from "@/model/types/stock/stock/types";
import { startTransition, useActionState, useCallback, useEffect, useRef, useState } from "react";
import stockFormAction from "@/features/stock/stock/action/stock-form";
import useChangeMode from "@/hooks/share/useChangeMode";
import CustomNumberInput from "@/components/share/custom-number-input/page";
import ErrorBox from "@/components/share/error-box/error-box";

export default function StockForm({stockCate, mode, stock} : {
    stockCate: StockCate[],
    mode: 'write' | 'edit' | 'detail',
    stock?: ResponseStock
}) {

    const [state, action, isPending] = useActionState(stockFormAction,{...stock, category: stock?.category?.stockCateId??'none' , stockUseEa:true})
    const formRef = useRef(null)
    const changeModeHandler = useChangeMode()

    const submitHandler =() => {
        if(isPending) return
        const formData = new FormData(formRef.current);
        formData.set('action', mode);
        startTransition(() => {
            action(formData);
        });
    }
    
    useEffect(()=>{
        if(state.status){
            if(state.status===200){
                if(mode==='write'){
                    window.alert('물품을 등록했습니다.')
                    // window.close()
                }else{
                    window.alert('물품을 수정했습니다.')
                    changeModeHandler('detail')
                } 
            }else{
                window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
    },[state])



    return(
        <section className="register-form-container">
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>물품등록</h4>
            </header>
            {mode==='write' && 
            <p style={{color:'red', fontSize:'13px', marginBottom:'5px'}}>
                ※ 재고계산여부 체크는 한번 입력하면 수정할수 없습니다. 신중히 선택해 주세요.
            </p>}
            <form action={action} ref={formRef}>
                <table className="register-form-table">
                    <colgroup>
                        <col style={{width:'20%'}}/>
                        <col style={{width:'30%'}}/>
                        <col style={{width:'20%'}}/>
                        <col style={{width:'30%'}}/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className="table-label">분류선택</td>
                            <td colSpan={3}>
                                <label>
                                    {mode==='detail' ?
                                        <input name='category' defaultValue={stock.category.stockCateName} key={state.category+'category'} readOnly/>
                                        :
                                        <select size={1} name='category' defaultValue={state.category} key={state.category+'category'} >
                                            <option value='none'>분류선택</option>
                                            {
                                                stockCate.map((cate : StockCate) => (
                                                    <option key={cate.stockCateId} value={cate.stockCateId}>
                                                        {cate.stockCateName}
                                                    </option>
                                                ))
                                            }
                                        </select>    
                                    }
                                </label>
                                {state.formErrors?.category &&  
                                    <ErrorBox key={state.formErrors.errorKey}>
                                        {state.formErrors.category}
                                    </ErrorBox>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">과세기준</td>
                            <td>
                                {mode==='detail' ?
                                    <input  name='taxation' defaultValue={TaxationCate[state.taxation]} key={state.taxation+'texation'} readOnly/>
                                    :
                                    <select name='taxation' defaultValue={state.taxation} key={state.taxation+'texation'}>
                                        {Object.entries(TaxationCate).map(([key,value])=>(
                                            <option key={key}>{value}</option>
                                        ))}
                                    </select>
                                }
                            </td>
                            <td className="table-label">재고계산여부</td>
                            <td className="table-radio-container">
                                {mode==='detail' ?
                                    <input value={state.stockUseEa ? '사용' : '미사용'} readOnly/>
                                    :
                                    <div>
                                        <label><input type="radio" value="Y" name="stockUseEa" defaultChecked={state.stockUseEa}/>사용</label>
                                        <label><input type="radio" value="N" name="stockUseEa" defaultChecked={!state.stockUseEa}/>미사용</label>
                                    </div>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">품목명</td>
                            <td>
                                <input name="productName" defaultValue={state.productName} key={state.productName} readOnly={mode==='detail'}/>
                                {state.formErrors?.productName &&  
                                    <ErrorBox key={state.formErrors.errorKey}>
                                        {state.formErrors.productName}
                                    </ErrorBox>
                                }
                            </td>
                            <td className="table-label">규격</td>
                            <td><input name="modelName" defaultValue={state.modelName} key={state.modelName+'modelName'} readOnly={mode==='detail'}/></td>
                        </tr>
                        <tr>
                            <td className="table-label">입고가</td>
                            <td>
                                <CustomNumberInput name='inPrice' defaultValue={state.inPrice} key={state.inPrice+'inPrice'} readOnly={mode==='detail'}/>
                            </td>                            
                            <td className="table-label">출고가</td>
                            <td>
                                <CustomNumberInput name='outPrice' defaultValue={state.outPrice} key={state.outPrice+'outPrice'} readOnly={mode==='detail'}/>
                                {state.formErrors?.outPrice &&  
                                    <ErrorBox key={state.formErrors.errorKey}>
                                        {state.formErrors.outPrice}
                                    </ErrorBox>
                                }
                            </td>                        
                            </tr>
                            <tr>
                            <td className="table-label">이월재고</td>
                            <td colSpan={3}>
                                <CustomNumberInput name="quantity" defaultValue={state.quantity} key={state.quantity+'quantity'} readOnly={mode==='detail'}/>
                                {state.formErrors?.quantity &&  
                                    <ErrorBox key={state.formErrors.errorKey}>
                                        {state.formErrors.quantity}
                                    </ErrorBox>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">호환기종</td>
                            <td colSpan={3}>
                                <textarea name="compatibleModel" defaultValue={state.compatibleModel} key={state.compatibleModel+'compatibleModel'} readOnly={mode==='detail'}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">비고사항</td>
                            <td colSpan={3}>
                                <textarea name="note" defaultValue={state.note} key={state.note+'note'} readOnly={mode==='detail'}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-container">
                    <button type='button' onClick={()=>{
                        mode==='detail' ? changeModeHandler('edit') : submitHandler()
                    }}>
                        {mode ==='detail' && '수정하기'}
                        {mode ==='edit' && '수정완료'}
                        {mode ==='write' && '저장하기'}
                    </button>
                    <button type='button' onClick={()=>{
                        mode==='edit' ? changeModeHandler('detail') : window.close()
                    }}>취소</button>
                </div>
            </form>
        </section>
    )
}