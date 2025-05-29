"use client";
import '@/styles/form-style/form.scss';
import Image from "next/image";
import asideArrow from '@/public/assets/aside-arrow.gif';

import {startTransition, useActionState, useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import {useRouter} from "next/navigation";

import {EmployeeClassEnum, ResponseEmployee, UserRoleEnum} from "@/model/types/staff/employee/type";
import {submitEmployeeInfo} from "@/features/staff/employee/action/permissionAction";
import ErrorBox from "@/components/share/error/error-box";
import {userIdDuplicationChecked} from "@/features/staff/employee/api/server-api";
import {Dept} from "@/model/types/staff/dept/type";
import dayjs from "dayjs";
import CustomDateInput from "@/components/share/custom-date-input/custom-date-input";
import { UserInfo } from '@/store/zustand/userInfo';
import useChangeMode from '@/hooks/share/useChangeMode';
import { selectConfrim } from '@/hooks/share/selectConfrim';

export default function EmployeeForm({
    dept,
    employee,
    isMobile = false,
    userInfo,
    mode
} : {
    dept: Dept[],
    employee?: ResponseEmployee,
    isMobile?: boolean,
    userInfo?: UserInfo
    mode:'write'|'edit'|'detail'
}) {
    const [image, setImage] = useState<string | null>(null);
    const [buttonText, setButtonText] = useState("사진 선택"); // 버튼 텍스트 변경 가능
    const [chagnePassword, setChangePassword] = useReducer((prev)=>!prev,false)
    const changeModeHandler = useChangeMode()
    const formRef = useRef(null)

    const initialState = useMemo(() =>
            employee ? {
                    ...employee,
                    joinDate: dayjs(employee.joinDate).format('YYYY-MM-DD'),
                    birthday: dayjs(employee.birthday).format('YYYY-MM-DD'),
                    deptId: employee.dept.deptId,
                }
                : {married:false},
        [employee]);
        
    const [state, action, isPending] = useActionState(submitEmployeeInfo, initialState);

    //중복체크 상태
    const [isDuplicateChecked, setIsDuplicateChecked] = useState<boolean>(!!employee)
    const router = useRouter();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // 사용자가 선택한 파일 가져오기
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setButtonText("사진 변경");
        }
    };

    useEffect(() => {
        if(!state.status) return
        if (state.status===200) {
            if (mode==='edit') {
                window.alert('사원정보 변경이 완료되었습니다.')
                isMobile ? window.history.back() : router.push(`employee?mode=detail&target=${employee.userId}`)
                
            }else if(mode==='write'){
                window.alert('사원등록에 성공했습니다.')
                isMobile ? window.history.back() : window.close();
            }
            setIsDuplicateChecked(false)
        }else{
            window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
        }
    }, [state])

    const duplicationCheckHandler = async (e) => {
        if (state.duplicationChecked) return;
        
        const changeDuplicationState = () => {
            setIsDuplicateChecked(true);
        }
        const formData = new FormData(formRef.current);
        const idText=formData.get('userId').toString()

        if (idText) {
            const isDuplicate = await userIdDuplicationChecked(idText)
            if (!isDuplicate) {
                selectConfrim(`사용이 가능한 아이디입니다. 정말로 해당 아이디를 사용하시겠습니까?`, changeDuplicationState)
            } else if (isDuplicate === undefined) {
                window.alert('문제가 발생했습니다. 잠시후 다시 시도해주세요.')
            } else {
                window.alert('사용할 수 없는 아이디입니다. 다른 아이디를 사용하세요.')
            }
        } else {
            window.alert('사용할 아이디를 입력해세요.')
        }
    }

    
    const submitHandler = ()=> {
        const formData = new FormData(formRef.current);
        formData.set('action', mode)
        startTransition(() => {
            action(formData);
        });
    }

    return (
        <section className={`register-form-container ${mode === 'detail' ? 'view-mode':''}`}>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>
                    {mode === 'detail' && '직원정보 상세보기'}
                    {mode === 'edit' && '직원정보 수정하기'}
                    {mode ==='write' && '직원등록'}
                </h4>
            </header>
            <form action={action} ref={formRef}>
                <table className="register-form-table" key={state.formKey}>
                    <colgroup>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '10%'}}/>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '10%'}}/>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '10%'}}/>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '25%'}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <td colSpan={2} className="table-label">관리등급</td>
                        <td colSpan={2}>
                            {employee ? UserRoleEnum[employee.userRole] :
                                <>
                                    <select name='userRole' defaultValue={state.userRole}>
                                        {Object.entries(UserRoleEnum).map(([key,value])=>(
                                            ((UserRoleEnum[userInfo?.userRole??'ADMIN'] ==='관리자')||(userInfo.userRole ===key))&&
                                            <option value={key} key={key}>{value}</option>
                                        ))}
                                    </select>
                                    {state.formErrors?.userRole &&
                                        <ErrorBox>
                                            {state.formErrors.userRole}
                                        </ErrorBox>
                                    }
                                </>
                            }
                        </td>
                        <td colSpan={2} className="table-label">직위</td>
                        <td colSpan={2}>
                            {employee ? EmployeeClassEnum[employee.userClass] :
                                <>
                                <select name="userClass" key={state.userClass} defaultValue={state.userClass}>
                                    <option value="none">선택</option>
                                    {Object.entries(EmployeeClassEnum).map(([key,value])=>(
                                        ((UserRoleEnum[userInfo?.userRole??'ADMIN'] ==='관리자')||(userInfo.userClass ===key))&&
                                        <option value={key} key={key}>{value}</option>
                                    ))}
                                </select>
                                {state.formErrors?.userClass &&
                                    <ErrorBox>
                                        {state.formErrors.userClass}
                                    </ErrorBox>
                                }
                                </>
                            }
                        </td>
                        <td colSpan={2} className="table-label">부서</td>
                        <td colSpan={2}>
                            {employee ? employee.dept.deptName :
                                <>
                                <select name="deptId" defaultValue={state.deptId}>
                                    <option value="none">선택</option>
                                    {dept.map(({deptId, deptName}) =>     
                                    ((UserRoleEnum[userInfo?.userRole??'ADMIN'] ==='관리자')||(userInfo.dept.deptId ===deptId))&&
                                        <option value={deptId} key={deptId}>
                                            {deptName}
                                        </option>
                                    )}
                                </select>
                                {state.formErrors?.dept &&
                                    <ErrorBox>
                                        {state.formErrors.dept}
                                    </ErrorBox>
                                }
                                </>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">성&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;명</td>
                        <td colSpan={2}>
                            <input type="text" name="name" defaultValue={state.name} readOnly={mode==='detail'}/>
                            {state.formErrors?.name &&
                                <ErrorBox>
                                    {state.formErrors.name}
                                </ErrorBox>
                            }
                        </td>
                        <td colSpan={2} className="table-label">한자성명</td>
                        <td colSpan={2}><input name="chName" defaultValue={state.chName} type="text" readOnly={mode==='detail'}/></td>
                        <td colSpan={2} className="table-label">영문성명</td>
                        <td colSpan={2}><input name="engName" defaultValue={state.engName} type="text" readOnly={mode==='detail'}/></td>
                    </tr>

                    <tr>
                        <td rowSpan={5} colSpan={2} className="image-container">
                            <label htmlFor='image-input'
                                   className={`image-upload-label ${image && 'absolute-label'}`}>{buttonText}</label>
                            {image && (
                                <div>
                                    <Image
                                        className="img-style"
                                        fill
                                        src={image}
                                        alt="미리보기"
                                    />
                                </div>
                            )}
                            <input id='image-input' type="file" accept="image/*" style={{display: 'none'}}
                                   onChange={handleImageChange} readOnly={mode==='detail'}/>
                        </td>
                        <td colSpan={2} className="table-label">입사일</td>
                        <td colSpan={8}>
                            {mode==='detail' ?
                                <input value={dayjs(employee.joinDate).format('YYYY년 M월 D일')} readOnly/>
                                :
                                <>
                                <CustomDateInput name="joinDate" defaultValue={state.joinDate}/>
                                {state.formErrors?.joinDate &&
                                    <ErrorBox>
                                        {state.formErrors.joinDate}
                                    </ErrorBox>
                                }
                                </>
                            }
                            
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">아이디</td>
                        <td colSpan={8}>
                            <>
                                <input type="text"
                                       name="userId"
                                       className={employee ? '' : 'id-input'}
                                       defaultValue={state.userId}
                                       readOnly={mode!=='write' || isDuplicateChecked}/>
                                {mode==='write' &&
                                    <button type='button'
                                            disabled={isDuplicateChecked}
                                            onClick={(e) => duplicationCheckHandler(e)}>
                                        중복확인</button>}
                                {state.formErrors?.userId &&
                                    <ErrorBox>
                                        {state.formErrors.userId}
                                    </ErrorBox>
                                }
                            </>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">비밀번호</td>
                        <td colSpan={8}>
                            {mode==='edit' ?
                           (chagnePassword ?
                            <>
                            <input className={employee ? 'id-input' : ''} name="password" defaultValue={state.password??''} type="password"/>
                            <button type='button'
                                        onClick={setChangePassword}>
                                    변경취소
                            </button>
                            </>
                             :
                            <>
                            <input className={employee ? 'id-input' : ''} defaultValue={"*".repeat(8)} type="password" readOnly/>
                            <button type='button'
                                    onClick={setChangePassword}>
                                변경하기
                            </button>
                            </>):
                             <input name="password" defaultValue={state.password} type="password"/>
                            }                           
                            {state.formErrors?.password &&
                                <ErrorBox>
                                    {state.formErrors.password}
                                </ErrorBox>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">이메일</td>
                        <td colSpan={8}>
                            <input name="email" 
                                   defaultValue={state.email}
                                   type="text"
                                   readOnly={mode==='detail'}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">전화번호</td>
                        <td colSpan={4}>
                        <input name="tel"
                               defaultValue={state.tel}
                               readOnly={mode==='detail'}/>
                        </td>
                        <td colSpan={2} className="table-label">핸드폰</td>
                        <td colSpan={4}>
                            <input name="phone"
                                   defaultValue={state.phone}
                                   readOnly={mode==='detail'}/>
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={3} colSpan={2} className="table-label">주소</td>
                        <td colSpan={11}>
                            <input name="zipCode" defaultValue={state.zipCode} className="zip-code-input" readOnly={mode==='detail'}/>[우편번호]
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={11}><input name="address" defaultValue={state.address} readOnly={mode==='detail'}/></td>
                    </tr>
                    <tr>
                        <td colSpan={11}><input name="addressDetail" defaultValue={state.addressDetail} readOnly={mode==='detail'}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">생년월일</td>
                        <td colSpan={4}>
                            {mode==='detail' ? 
                                <input value={dayjs(employee.birthday).format('YYYY년 M월 D일')} readOnly/>
                                :
                                <>
                                <CustomDateInput name="birthday" defaultValue={state.birthday}/>
                                {state.formErrors?.birthday &&
                                    <ErrorBox>
                                        {state.formErrors.birthday}
                                    </ErrorBox>
                                }
                                </>
                            }
                        </td>
                        <td colSpan={2} className="table-label">결혼여부</td>
                        <td colSpan={4} className="table-radio-container">
                            {mode==='detail' ?
                            (employee.married ? '기혼': '미혼') :
                            <div>
                                <label><input type="radio"
                                              name="married"
                                              value='single'
                                              defaultChecked={!state.married}/>미혼</label>
                                <label><input type="radio" 
                                              name="married"
                                              value='married'
                                              defaultChecked={state.married}/>기혼</label>
                            </div>}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">메모</td>
                        <td colSpan={10}>
                            <textarea name='memo' defaultValue={state.memo} readOnly={mode==='detail'}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className='button-container'>
                    <button type='button'
                            disabled={isPending}
                            onClick={()=> {mode==='detail' ? changeModeHandler('edit'): submitHandler()}}>
                            {mode==='detail' && <>수&nbsp;&nbsp;&nbsp;&nbsp;정</>}
                            {mode==='edit' && <>수&nbsp;정&nbsp;완&nbsp;료</>}
                            {mode==='write' && <>저&nbsp;&nbsp;&nbsp;&nbsp;장</>}
                    </button>
                    <button type='button'
                            onClick={() => 
                               {isMobile ? window.history.back() :
                                (mode==='edit' ? 
                                    router.push(`employee?mode=detail&target=${employee.userId}`)
                                    : window.close())}}>
                        {mode==='edit' ? <>취&nbsp;&nbsp;&nbsp;&nbsp;소</> : <>창&nbsp;닫&nbsp;기</> }
                    </button>
                </div>
            </form>
        </section>
    )
}