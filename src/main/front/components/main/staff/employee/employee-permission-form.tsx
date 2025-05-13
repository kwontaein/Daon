'use client'
import '@/styles/form-style/form.scss';

import useCheckBoxState from '@/hooks/share/useCheckboxState';
import { AsideOptions } from '@/model/constants/routes/asideOptions';
export default function PermissionManagementForm({userName,userId}){
    const checkRecodeState = Object.fromEntries(
        Object.entries(AsideOptions).map(([nav,{asideItems}])=>{
            const asideLinkList = asideItems.map(({link})=>{
                return link
            })
            const checkedState = useCheckBoxState(asideLinkList)
            return [nav,checkedState]
        })
    )

    return(
        <form className='register-form-container'>
            <table className='register-form-table form-mobile'>
                <thead style={{height:'5px'}} />
                <tbody style={{fontSize:'14px'}}>
                    <tr>
                        <td className='table-label left-align right-border'>사원명</td>
                        <td colSpan={2} className='left-align'>{userName}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className='table-label table-radio-container right-border'>
                            <div>
                                <label style={{fontSize:'14px'}}>
                                <input
                                    type='checkbox'/>
                                    자동등록권한
                                </label>
                            </div>
                        </td>
                        <td className='table-radio-container'>
                            <div>
                                <label style={{fontSize:'14px'}}>
                                    <input type='checkbox'/>
                                    고객자동등록
                                </label>
                            </div>
                        </td>
                        <td className='table-radio-container'>
                            <div>
                                <label style={{fontSize:'14px'}}>
                                    <input type='checkbox'/>
                                    고객자동등록
                                </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className='table-label table-radio-container right-border'>
                            <div>
                                <label style={{fontSize:'14px'}}>
                                <input
                                    type='checkbox'/>
                                    알림
                                </label>
                            </div>
                        </td>
                        <td colSpan={2} className='table-radio-container'>
                            <div>
                                <label style={{fontSize:'14px'}}>
                                    <input type='checkbox'/>
                                    임대품목알림
                                </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className='table-label table-radio-container right-border'>
                            <div>
                                <label style={{fontSize:'14px'}}>
                                <input
                                    type='checkbox'/>
                                    A/S 수정/삭제
                                </label>
                            </div>
                        </td>
                        <td className='table-radio-container'>
                            <div>
                                <label style={{fontSize:'14px'}}>
                                    <input type='checkbox'/>
                                    A/S 수정권한
                                </label>
                            </div>
                        </td>
                        <td className='table-radio-container'>
                            <div>
                                <label style={{fontSize:'14px'}}>
                                    <input type='checkbox'/>
                                    A/S 삭제권한
                                </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
                {Object.entries(AsideOptions).map(([nav,{asideTitle,asideItems}])=>(
                        <tbody key={nav}>
                            <tr>
                                <td rowSpan={Math.ceil(asideItems.length/2)} className='table-label table-radio-container right-border'>
                                    <div>
                                        <label>
                                            <input
                                                type='checkbox'
                                                style={{width:'1rem', height:'1rem'}}
                                                checked={checkRecodeState[nav].isAllChecked}
                                                onChange={checkRecodeState[nav].toggleAllChecked}/>
                                                {asideTitle}
                                        </label>
                                    </div>
                                </td>
                                <td colSpan={asideItems.length>1 ? 1:2} className='table-radio-container'>
                                    <div>
                                        <label style={{fontSize:'14px'}}>
                                            <input
                                                type='checkbox'
                                                name={nav}
                                                value={asideItems[0].link}
                                                checked={checkRecodeState[nav].checkedState[asideItems[0].link]??false}
                                                onChange={()=>checkRecodeState[nav].update_checked(asideItems[0].link)}/>
                                                {asideItems[0].name}
                                        </label>
                                    </div>
                                </td>
                                {asideItems.length>1 &&
                                <td className='table-radio-container'>
                                    <div>
                                        <label style={{fontSize:'14px'}}>
                                            <input
                                                type='checkbox'
                                                name={nav}
                                                value={asideItems[1].link}
                                                checked={checkRecodeState[nav].checkedState[asideItems[1].link]??false}
                                                onChange={()=>checkRecodeState[nav].update_checked(asideItems[1].link)}/>
                                                {asideItems[1].name}
                                        </label>
                                    </div>
                                </td>
                                }
                            </tr>
                            {asideItems.length>2 &&
                                asideItems.map(({name,link},idx)=>(
                                    idx>2 && idx%2===1 &&
                                    <tr key={link}>
                                        <td colSpan={idx < asideItems.length-1? 1:2} className='table-radio-container'>
                                            <div>
                                                <label style={{fontSize:'14px'}}>
                                                    <input
                                                        type='checkbox'
                                                        name={nav}
                                                        value={link}
                                                        checked={checkRecodeState[nav].checkedState[link]??false}
                                                        onChange={()=>checkRecodeState[nav].update_checked(link)}/>
                                                        {name}
                                                </label>
                                            </div>
                                        </td>
                                        {idx+1 < asideItems.length &&
                                        <td className='table-radio-container'>
                                            <div>
                                                <label style={{fontSize:'14px'}}>
                                                    <input
                                                        type='checkbox'
                                                        name={nav}
                                                        value={asideItems[idx+1].link}
                                                        checked={checkRecodeState[nav].checkedState[asideItems[idx+1].link]??false}
                                                        onChange={()=>checkRecodeState[nav].update_checked(asideItems[idx+1].link)}/>
                                                        {asideItems[idx+1].name}
                                                </label>
                                            </div>
                                        </td>}
                                    </tr>
                                ))}
                        </tbody>                      
                    ))}
            </table>
        </form>
    )
}