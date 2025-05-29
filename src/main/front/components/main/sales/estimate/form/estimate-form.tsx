'use client'

import useCheckBoxState from '@/hooks/share/useCheckboxState';
import './estimate-form.scss';
import { ResponseEstimate } from "@/model/types/sales/estimate/type"
import useEstimate from '@/hooks/sales/task-estimate/useEstimate';
import { ResponseTask } from '@/model/types/sales/task/type';
import useChangeMode from '@/hooks/share/useChangeMode';
import useRouterPath from '@/hooks/share/useRouterPath';


export default function EstimateForm({estimateState, submit, mode, task, isMobile = false} : {
    estimateState?: ResponseEstimate,
    submit: () => void,
    mode: 'write'|'detail'|'edit',
    task?:ResponseTask,
    isMobile?:boolean
}) {
    const {
        items,
        itemIds,
        addEstimateItemHandler,
        removeEstimateItemHandler,
        estimateItemHandler,
        searchStockHandler,
    } = useEstimate(estimateState,mode)
    
    const {checkedState,isAllChecked, resetChecked, update_checked, toggleAllChecked} = useCheckBoxState(itemIds)
    const changeModeHandler = useChangeMode()
    const redirect = useRouterPath()

    const printEstimatehandler = ()=>{
        const params = new URLSearchParams({
            estimateId:estimateState.estimateId,
         });

        if(window.innerWidth>620){
            const url = `/estimate-print?${params.toString()}`;
            const popupOptions = "width=780,height=980,scrollbars=yes,resizable=yes"; 
            window.open(url, "printEstimate", popupOptions);
        }else{
            redirect(`estimate-print?${params.toString()}`)
        }
    }

    return(
        <section className='estimate-container'>
            {!task?.completeAt && (mode !=='detail') &&
            <div className='estimate-button-container'>
                <button type='button' onClick={addEstimateItemHandler.bind(null,false)}>항 목 추 가</button>
                {!(!!task || estimateState?.taskResponse?.taskId) && <button type='button' onClick={addEstimateItemHandler.bind(null,true)}>수기항목추가</button>}
                <button type='button' onClick={()=>removeEstimateItemHandler(checkedState, resetChecked)}>체 크 삭 제</button>
            </div>
            }
            <table className='estimate-form'>
                <colgroup>
                    <col style={{width:'1%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'6%'}}/>
                    <col style={{width:'12%'}}/>
                    <col style={{width:'17%'}}/>
                    <col style={{width:'10%'}}/>
                </colgroup>
                <thead>
                    <tr>
                        <td><input type='checkbox' checked={isAllChecked} onChange={toggleAllChecked}/></td>
                        <td>품&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명</td>
                        <td>규&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;격</td>
                        <td>수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;량</td>
                        <td>단&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가</td>
                        <td>공급가액</td>
                        <td>비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((estimate)=>(
                        <tr key={estimate.itemId} className={estimate.hand ? 'hand-estimate' : ''}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={!!checkedState[estimate.itemId]}
                                    onChange={() => update_checked(estimate.itemId)}
                                    readOnly={mode==='detail'}/>
                                <input name='itemId' type='hidden' value={estimate.itemId} readOnly/>
                                <input name='stockId' type='hidden' value={estimate.stockId??''} readOnly/>
                                <input name='hand' type='hidden' value={estimate.hand+''} readOnly/>
                            </td>
                            <td>
                                <input
                                    name='productName'
                                    value={estimate.productName}
                                    onChange={(e) => (!(!!estimate.stockId) ||estimate.hand) &&
                                        estimateItemHandler({ productName: e.target.value }, estimate.itemId)}
                                    onKeyDown={(e) =>
                                        !estimate.hand && searchStockHandler(e, estimate.itemId)}
                                    readOnly={mode==='detail'}/>
                            </td>
                            <td>
                                <input
                                    name='modelName'
                                    className='center-align'
                                    value={estimate.modelName??''}
                                    readOnly={!estimate.hand || mode==='detail'}
                                    onChange={(e) =>
                                        estimateItemHandler({ modelName: e.target.value }, estimate.itemId)}/>
                            </td>
                            <td>
                                <input
                                    className="center-align"
                                    name='quantity'
                                    value={estimate.quantity.toLocaleString('ko-KR')}
                                    readOnly={mode==='detail'}
                                    onChange={(e) =>
                                        estimateItemHandler({ quantity: Number(e.target.value.replaceAll(',', ''))}, estimate.itemId)}/>
                            </td>
                            <td>
                                <input
                                    className="right-align"
                                    name='unitPrice'
                                    readOnly={!estimate.hand || mode==='detail'}
                                    value={estimate.unitPrice.toLocaleString('ko-KR')}
                                    onChange={(e) =>
                                        estimateItemHandler({ unitPrice: Number(e.target.value.replaceAll(',', ''))}, estimate.itemId)}/>
                            </td>
                            <td> 
                                <input
                                    className="right-align"
                                    value={(estimate.unitPrice * estimate.quantity).toLocaleString('ko-KR')}
                                    readOnly/>
                                </td>
                            <td>
                                <input name='memo' 
                                       value={estimate.memo}  
                                       onChange={(e) =>
                                        estimateItemHandler({ memo: e.target.value }, estimate.itemId)}/>
                            </td>
                        </tr>
                    ))}
                    {items.length>0 ?
                   <tr>
                        <td colSpan={3}>
                            <p>합계</p>
                        </td>
                        <td><input
                            className='center-align result-input'
                            value={items.reduce((prev,estimate)=>prev+Number(estimate.quantity ??0),0).toLocaleString('ko-KR')}
                            readOnly/></td>
                        <td></td>
                        <td><input
                            className='right-align result-input'
                            name='totalAmount'
                            value={items.reduce((prev,estimate)=>prev+(Number(estimate.quantity??0)*Number(estimate.unitPrice??0)),0).toLocaleString('ko-KR')}
                            readOnly/></td>
                        <td></td>
                    </tr>
                    :
                    <tr>
                        <td colSpan={7}>작성된 견적서가 없습니다.</td>
                    </tr>
                    }
                </tbody>
            </table>
            <div className={`estimate-button-container ${(!!task?.completeAt) ?'justify-right' :'justify-center'}`}>
                    {mode==='detail' &&
                        <>
                            <button onClick={printEstimatehandler} >견적서인쇄</button>
                            {!task?.completeAt && <button onClick={()=>changeModeHandler('edit')}>견적서수정</button>}
                        </>
                    }
                    {!task?.completeAt && (mode=== 'write' || mode ==='edit') &&
                         <button type='button' onClick={submit}>
                            {mode ==='write' ? '견적서작성' : '수정완료'}
                        </button>
                    }
                    <button type='button'
                             onClick={()=>{
                                isMobile? window.history.back() :
                                (!task?.completeAt && mode==='edit' ? changeModeHandler('detail') : window.close())}}>
                        {!task?.completeAt ?'취 소' : '닫기'}</button>
            </div>
        </section>
    )
}