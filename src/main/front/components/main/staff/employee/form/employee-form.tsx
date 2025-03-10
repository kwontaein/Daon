"use client";
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss';

import {useActionState, useEffect, useMemo, useRef, useState} from "react";
import {useRouter} from "next/navigation";

import {ResponseEmployee} from "@/model/types/staff/employee/type";
import {submitEmployeeInfo} from "@/features/staff/employee/action/employee-action";
import ErrorBox from "@/components/share/error-box/error-box";
import {useConfirm} from "@/hooks/share/useConfirm";
import {userIdDuplicationChecked} from "@/features/staff/employee/api/employeeApi";
import {Dept} from "@/model/types/staff/dept/type";
import dayjs from "dayjs";

export default function EmployeeForm({dept, employee}: { dept: Dept[], employee?: ResponseEmployee }) {
    const [image, setImage] = useState<string | null>(null);
    const [buttonText, setButtonText] = useState("사진 선택"); // 버튼 텍스트 변경 가능
    const initialState = useMemo(() =>
            employee ? {
                    ...employee,
                    joinDate: dayjs(employee.joinDate).format('YYYY-MM-DD'),
                    birthday: dayjs(employee.birthday).format('YYYY-MM-DD'),
                    deptId: employee.dept.deptId,
                    married: employee.married
                        ? 'married'
                        : 'single',
                    isUpdate: true,
                }
                : {},
        [employee]);
    console.log(employee)
    const [state, action, isPending] = useActionState(submitEmployeeInfo, initialState);
    //중복체크 상태
    const [isDuplicateChecked, setIsDuplicateChecked] = useState<boolean>(!!employee)
    const idRef = useRef<HTMLInputElement>(null)
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
        if (state.post_success) {
            if (state.isUpdate) {
                window.alert('사원정보 변경이 완료되었습니다.')
                router.push(`employee?mode=detail&target=${employee.userId}`)
            } else {
                window.alert('사원등록에 성공했습니다.')
                window.close();
            }
            setIsDuplicateChecked(false)
        }
    }, [state])

    const duplicationCheckHandler = async (e) => {
        if (state.duplicationChecked) return;
        const changeDuplicationState = () => {
            setIsDuplicateChecked(true);
        }
        if (idRef.current.value) {
            const isDuplicate = await userIdDuplicationChecked(idRef.current.value)
            if (!isDuplicate) {
                useConfirm(`사용이 가능한 아이디입니다. 정말로 해당 아이디를 사용하시겠습니까?`, changeDuplicationState, () => {
                })
            } else if (isDuplicate === undefined) {
                window.alert('문제가 발생했습니다. 잠시후 다시 시도해주세요.')
            } else {
                window.alert('사용할 수 없는 아이디입니다. 다른 아이디를 사용하세요.')
            }
        } else {
            window.alert('사용할 아이디를 입력해세요.')
        }
    }

    return (
        <section className="register-form-container">
            {!employee &&
                <header className="register-header">
                    <Image src={asideArrow} alt=">" width={15}/>
                    <h4>직원등록</h4>
                </header>
            }
            <form action={action}>
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
                            <select name='userRole' defaultValue={state.userRole}>
                                <option value="GM">운영자</option>
                                <option value="SGM">부운영자</option>
                                <option value="MEM">일반회원</option>
                                <option value="NOMEM">비회원</option>
                            </select>
                            {state.formErrors?.userRole &&
                                <ErrorBox>
                                    {state.formErrors.userRole}
                                </ErrorBox>
                            }
                        </td>
                        <td colSpan={2} className="table-label">직위</td>
                        <td colSpan={2}>
                            <select name="userClass" key={state.userClass} defaultValue={state.userClass}>
                                <option value="none">직위선택</option>
                                <option value="CEO">대표</option>
                                <option value="DIRECTOR">이사</option>
                                <option value="TEAM_LEADER">팀장</option>
                                <option value="DEPUTY_GENERAL_MANAGER">차장</option>
                                <option value="MANAGER">과장</option>
                                <option value="ASSISTANT_MANAGER">대리</option>
                                <option value="PROFESSIONAL">주임</option>
                                <option value="STAFF">사원</option>
                            </select>
                            {state.formErrors?.userClass &&
                                <ErrorBox>
                                    {state.formErrors.userClass}
                                </ErrorBox>
                            }
                        </td>
                        <td colSpan={2} className="table-label">부서</td>
                        <td colSpan={2}>
                            <select name="deptId" defaultValue={state.deptId}>
                                <option value="none">부서선택</option>
                                {dept.map(({deptId, deptName}) =>
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
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">성&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;명</td>
                        <td colSpan={2}>
                            <input type="text" name="name" defaultValue={state.name}/>
                            {state.formErrors?.name &&
                                <ErrorBox>
                                    {state.formErrors.name}
                                </ErrorBox>
                            }
                        </td>
                        <td colSpan={2} className="table-label">한자성명</td>
                        <td colSpan={2}><input name="chName" defaultValue={state.chName} type="text"/></td>
                        <td colSpan={2} className="table-label">영문성명</td>
                        <td colSpan={2}><input name="engName" defaultValue={state.engName} type="text"/></td>
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
                                   onChange={handleImageChange}/>
                        </td>
                        <td colSpan={2} className="table-label">입사일</td>
                        <td colSpan={8}>
                            <input type="date" name="joinDate" defaultValue={state.joinDate}/>
                            {state.formErrors?.joinDate &&
                                <ErrorBox>
                                    {state.formErrors.joinDate}
                                </ErrorBox>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">아이디</td>
                        <td colSpan={8}>
                            <>
                                <input ref={idRef}
                                       type="text"
                                       name="userId"
                                       className={employee ? '' : 'id-input'}
                                       defaultValue={state.userId}
                                       readOnly={!!employee || isDuplicateChecked}/>
                                {!state.isUpdate &&
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
                            <input name="password" defaultValue={state.password} type="password"/>
                            {state.formErrors?.password &&
                                <ErrorBox>
                                    {state.formErrors.password}
                                </ErrorBox>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">이메일</td>
                        <td colSpan={8}><input name="email" defaultValue={state.email} type="text"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">전화번호</td>
                        <td colSpan={4}>
                            <input className="short-input" name="tel1"
                                   defaultValue={state.tel1 ?? (employee && employee.tel.split('-')[0] || '')}
                                   style={{marginLeft: '0'}} maxLength={4}/>
                            - <input className="short-input" name="tel2"
                                     defaultValue={state.tel2 ?? (employee && employee.tel.split('-')[1] || '')}
                                     maxLength={4}/>
                            - <input className="short-input" name="tel3"
                                     defaultValue={state.tel3 ?? (employee && employee.tel.split('-')[0] || '')}
                                     maxLength={4}/>
                        </td>
                        <td colSpan={2} className="table-label">핸드폰</td>
                        <td colSpan={4}>
                            <input className="short-input" name="phone1"
                                   defaultValue={state.phone1 ?? (employee && employee.phone.split('-')[0] || '')}
                                   style={{marginLeft: '0'}} maxLength={4}/>
                            - <input className="short-input" name="phone2"
                                     defaultValue={state.phone2 ?? (employee && employee.phone.split('-')[1] || '')}
                                     maxLength={4}/>
                            - <input className="short-input" name="phone3"
                                     defaultValue={state.phone3 ?? (employee && employee.phone.split('-')[2] || '')}
                                     maxLength={4}/>
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={3} colSpan={2} className="table-label">주소</td>
                        <td colSpan={11}>
                            <input name="zipCode" defaultValue={state.zipCode} className="zip-code-input"/>[우변번호]
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={11}><input name="address" defaultValue={state.address}/></td>
                    </tr>
                    <tr>
                        <td colSpan={11}><input name="addressDetail" defaultValue={state.addressDetail}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">생년월일</td>
                        <td colSpan={4}><input type="date" name="birthday" defaultValue={state.birthday}/></td>
                        <td colSpan={2} className="table-label">결혼여부</td>
                        <td colSpan={4} className="table-radio-container">
                            <div>
                                <label><input type="radio" value="single" name="married"
                                              defaultChecked={state.married === 'single'}/>미혼</label>
                                <label><input type="radio" value="married" name="married"
                                              defaultChecked={state.married === 'married'}/>기혼</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-label">메모</td>
                        <td colSpan={10}>
                            <textarea name='memo' defaultValue={state.memo}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className='button-container'>
                    <button type={'submit'}
                            disabled={isPending}
                            onClick={(e) => {
                                if (idRef.current && idRef.current.value && !isDuplicateChecked) {
                                    e.preventDefault()
                                    window.alert('아이디 중복체크를 해주세요')
                                }
                            }}>저장
                    </button>
                    <button type={'button'}
                            onClick={() => employee ? router.push(`employee?mode=detail&target=${employee.userId}`) : window.close()}>취소
                    </button>
                </div>
            </form>
        </section>
    )
}