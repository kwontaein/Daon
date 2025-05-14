'use client'
import '@/styles/form-style/form.scss';

import useCheckBoxState from '@/hooks/share/useCheckboxState';
import {AsideOptions} from '@/model/constants/routes/asideOptions';
import {startTransition, useActionState, useEffect, useRef, useState} from 'react';
import {permissionFormAction} from '@/features/staff/employee/action/employee-permission-action';
import {KeyofAsideValues} from '@/model/types/staff/employee/type';

function kebabToCamel(str: string): string {
    return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

export default function PermissionManagementForm({userName, userId, initialPermission}: {
    userName: string,
    userId: string,
    initialPermission: KeyofAsideValues
}) {

    const checkRecodeState = Object.fromEntries(
        Object.entries(AsideOptions).map(([nav, {asideItems}]) => {
            const checkedState = useCheckBoxState(asideItems.map(({link}) => link), false, initialPermission[nav])
            return [nav, checkedState]
        })
    )

    const formRef = useRef(null)
    const [state, action, isPending] = useActionState(permissionFormAction, {userId})

    const submitHandler = () => {
        const formData = new FormData(formRef.current);
        formData.set('action', 'submit');
        startTransition(() => {
            action(formData);
        });
    }


    useEffect(() => {
        if (state.status) {
            if (state.status === 200) {
                window.alert('저장이 완료되었습니다.')
            } else {
                window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
    }, [state])

    return (
        <>
            <form className='register-form-container' action={action} ref={formRef}>
                <table className='register-form-table form-mobile'>
                    <thead style={{height: '5px'}}/>
                    <tbody style={{fontSize: '14px'}}>
                    <tr>
                        <td className='table-label left-align right-border'>사원명</td>
                        <td colSpan={2} className='left-align'>{userName}</td>
                    </tr>
                    </tbody>
                    {Object.entries(AsideOptions).map(([nav, {asideTitle, asideItems}]) => (
                        <tbody key={nav}>
                        <tr>
                            <td rowSpan={Math.ceil(asideItems.length / 2)}
                                className='table-label table-radio-container right-border'>
                                <div>
                                    <label>
                                        <input
                                            type='checkbox'
                                            style={{width: '1rem', height: '1rem'}}
                                            checked={checkRecodeState[nav].isAllChecked}
                                            onChange={checkRecodeState[nav].toggleAllChecked}/>
                                        {asideTitle}
                                    </label>
                                </div>
                            </td>
                            <td colSpan={asideItems.length > 1 ? 1 : 2} className='table-radio-container'>
                                <div>
                                    <label style={{fontSize: '14px'}}>
                                        <input
                                            type='checkbox'
                                            name={nav}
                                            value={kebabToCamel(asideItems[0].link)}
                                            checked={checkRecodeState[nav].checkedState[kebabToCamel(asideItems[0].link)] ?? false}
                                            onChange={() => checkRecodeState[nav].update_checked(kebabToCamel(asideItems[0].link))}/>
                                        {asideItems[0].name}
                                    </label>
                                </div>
                            </td>
                            {asideItems.length > 1 &&
                                <td className='table-radio-container'>
                                    <div>
                                        <label style={{fontSize: '14px'}}>
                                            <input
                                                type='checkbox'
                                                name={nav}
                                                value={kebabToCamel(asideItems[1].link)}
                                                checked={checkRecodeState[nav].checkedState[kebabToCamel(asideItems[1].link)] ?? false}
                                                onChange={() => checkRecodeState[nav].update_checked(kebabToCamel(asideItems[1].link))}/>
                                            {asideItems[1].name}
                                        </label>
                                    </div>
                                </td>
                            }
                        </tr>
                        {asideItems.length > 2 &&
                            asideItems.map(({name, link}, idx) => (
                                idx > 1 && idx % 2 === 0 &&
                                <tr key={link}>
                                    <td colSpan={idx < asideItems.length - 1 ? 1 : 2} className='table-radio-container'>
                                        <div>
                                            <label style={{fontSize: '14px'}}>
                                                <input
                                                    type='checkbox'
                                                    name={nav}
                                                    value={link}
                                                    checked={checkRecodeState[nav].checkedState[kebabToCamel(link)] ?? false}
                                                    onChange={() => checkRecodeState[nav].update_checked(kebabToCamel(link))}/>
                                                {name}
                                            </label>
                                        </div>
                                    </td>
                                    {idx + 1 < asideItems.length &&
                                        <td className='table-radio-container'>
                                            <div>
                                                <label style={{fontSize: '14px'}}>
                                                    <input
                                                        type='checkbox'
                                                        name={nav}
                                                        value={asideItems[idx + 1].link}
                                                        checked={checkRecodeState[nav].checkedState[kebabToCamel(asideItems[idx + 1].link)] ?? false}
                                                        onChange={() => checkRecodeState[nav].update_checked(kebabToCamel(asideItems[idx + 1].link))}/>
                                                    {asideItems[idx + 1].name}
                                                </label>
                                            </div>
                                        </td>}
                                </tr>
                            ))}
                        </tbody>
                    ))}
                </table>
            </form>
            <div className='button-container' style={{justifyContent: 'right'}}>
                <button onClick={submitHandler}>저장</button>
                <button onClick={() => window.location.replace('/main/staff/employee')}>취소</button>
            </div>
        </>
    )
}