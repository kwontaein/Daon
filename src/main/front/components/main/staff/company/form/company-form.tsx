// "use client";
// import Image from "next/image";
// import asideArrow from '@/assets/aside-arrow.gif';
// import './company-form.scss'
// import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { submitCompanyInfo } from "@/constants/company/company-action";
// import ErrorBox from "@/components/share/error-box";
// import { useConfirm } from "@/hooks/share/useConfirm";
// import { ResponseCompany } from "@/model/staff/company/type";

// export default function companyForm({company}:{company?:ResponseCompany}){
//     const [image, setImage] = useState<string | null>(null);

//     const initialState = useMemo(() => company ?? {}, [company]);
//     const [state, action, isPending] = useActionState(submitCompanyInfo, initialState);

//     const router = useRouter();


//     return(
//         <section className="company-form-container">
//             {!company &&
//                 <header className="register-company-header">
//                     <Image src={asideArrow} alt=">" />
//                     <h4>직원등록</h4>
//                 </header>
//             }
//             <form onSubmit={(e)=>{
//                 e.preventDefault()
//                 startTransition(()=>{
//                 const formData = new FormData(e.currentTarget); // 폼 데이터 생성
//                 action(formData); // action 함수에 전달
//                 })
//             }}>
//             <table className="company-form-table"  key={state.companyId}>
//                 <colgroup>
//                     <col style={{ width: '5%' }} />
//                     <col style={{ width: '10%' }} />
//                     <col style={{ width: '5%' }} />
//                     <col style={{ width: '10%' }} />
//                     <col style={{ width: '5%' }} />
//                     <col style={{ width: '5%' }} />
//                     <col style={{ width: '10%' }} />
//                     <col style={{ width: '5%' }} />
//                     <col style={{ width: '5%' }} />
//                     <col style={{ width: '5%' }} />
//                     <col style={{ width: '25%' }} />
//                 </colgroup>
//                 <tbody>
//                 <tr>
//                     <td colSpan={2} className="table-label">관리등급</td>
//                     <td colSpan={2}>
//                         <select name='userRole' defaultValue={state.userRole}>
//                             <option value="GM">운영자</option>
//                             <option value="SGM">부운영자</option>
//                             <option value="MEM">일반회원</option>
//                             <option value="NOMEM">비회원</option>
//                         </select>
//                         {state.formErrors?.userRole &&  
//                             <ErrorBox key={state.formErrors.errorKey}>
//                                 {state.formErrors.userRole}
//                             </ErrorBox>
//                         }
//                     </td>
//                     <td colSpan={2} className="table-label">직위</td>
//                     <td colSpan={2}>
//                         <select name="userClass" defaultValue={state.userClass}>
//                             <option value="none">직위선택</option>
//                             <option value="CEO">대표</option>
//                             <option value="DIRECTOR">이사</option>
//                             <option value="TEAM_LEADER">팀장</option>
//                             <option value="DEPUTY_GENERAL_MANAGER">차장</option>
//                             <option value="MANAGER">과장</option>
//                             <option value="ASSISTANT_MANAGER">대리</option>
//                             <option value="PROFESSIONAL">주임</option>
//                             <option value="company">사원</option>
//                         </select>
//                         {state.formErrors?.userClass &&  
//                             <ErrorBox key={state.formErrors.errorKey}>
//                                 {state.formErrors.userClass}
//                             </ErrorBox>
//                         }
//                     </td>                         
//                     <td colSpan={2} className="table-label">부서</td>
//                     <td colSpan={2}>
//                         <select name="dept" defaultValue={state.dept}>
//                             <option value="none">부서선택</option>
//                             <option value="MANAGE">관리부</option>
//                             <option value="BUSINESS">영업부</option>
//                             <option value="WEB">웹관리팀</option>
//                         </select>
//                         {state.formErrors?.dept &&  
//                             <ErrorBox key={state.formErrors.errorKey}>
//                                 {state.formErrors.dept}
//                             </ErrorBox>
//                         }
//                     </td>
//                 </tr>
//                 <tr>    
//                     <td colSpan={2} className="table-label">성&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;명</td>
//                     <td colSpan={2}>
//                         <input type="text" name="name" defaultValue={state.name}/>
//                         {state.formErrors?.name &&  
//                             <ErrorBox key={state.formErrors.errorKey}>
//                                 {state.formErrors.name}
//                             </ErrorBox>
//                         }
//                     </td>
//                     <td colSpan={2} className="table-label">한자성명</td>
//                     <td colSpan={2}><input name="chName" defaultValue={state.chName} type="text"/></td>
//                     <td colSpan={2} className="table-label">영문성명</td>
//                     <td colSpan={2}><input name="engName" defaultValue={state.engName} type="text"/></td>
//                 </tr>

//                 <tr>
//                     <td rowSpan={5} colSpan={2} className="image-container">
//                         <label htmlFor='image-input' className={`image-upload-label ${image && 'absolute-label'}`}>{buttonText}</label>
//                         {image && (
//                         <div>
//                             <Image 
//                                 className="img-style"
//                                 fill
//                                 src={image} 
//                                 alt="미리보기"  
//                             />
//                         </div>
//                         )}
//                         <input id='image-input' type="file" accept="image/*" style={{display:'none'}} onChange={handleImageChange}/>
//                     </td>
//                     <td colSpan={2} className="table-label">입사일</td>
//                     <td colSpan={8}>
//                         <input type="date" name="joinDate" defaultValue={state.joinDate}/>
//                         {state.formErrors?.joinDate &&  
//                             <ErrorBox key={state.formErrors.errorKey}>
//                                 {state.formErrors.joinDate}
//                             </ErrorBox>
//                         }
//                     </td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2}className="table-label">아이디</td>
//                     <td colSpan={8}>
//                         {!company ? 
//                         <>
//                             <input ref={idRef} name="userId" defaultValue={state.userId} className="id-input" type="text" disabled={isDuplicationChecked}/>
//                             <button type='button' onClick={duplicationCheckHandler}>중복확인</button>
//                             {state.formErrors?.userId &&  
//                                 <ErrorBox key={state.formErrors.errorKey}>
//                                     {state.formErrors.userId}
//                                 </ErrorBox>
//                             }    
//                             {state.formErrors?.duplication &&  
//                                 <ErrorBox key={state.formErrors.errorKey}>
//                                     {state.formErrors.duplication}
//                                 </ErrorBox>
//                             } 
//                         </> :
//                              <div>
//                                 {company.userId}
//                              </div>
//                         }
//                     </td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2} className="table-label">비밀번호</td>
//                     <td colSpan={8}>
//                         <input name="password" defaultValue={state.password} type="password"/>
//                         {state.formErrors?.password &&  
//                             <ErrorBox key={state.formErrors.errorKey}>
//                                 {state.formErrors.password}
//                             </ErrorBox>
//                         }    
//                     </td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2} className="table-label">이메일</td>
//                     <td colSpan={8}><input name="email" defaultValue={state.email} type="text"/></td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2} className="table-label">전화번호</td>
//                     <td colSpan={4}>
//                         <input className="short-input" name="tel1" defaultValue={state.tel && state.tel.split('-')[0] ||''} style={{marginLeft:'0'}} maxLength={4}/>
//                          - <input className="short-input" name="tel2" defaultValue={state.tel && state.tel.split('-')[1] ||''} maxLength={4}/>
//                          - <input className="short-input" name="tel3" defaultValue={state.tel && state.tel.split('-')[2] ||''}maxLength={4}/>
//                     </td>  
//                     <td colSpan={2} className="table-label">핸드폰</td>
//                     <td colSpan={4}>
//                         <input className="short-input" name="phone1" defaultValue={state.phone && state.phone.split('-')[1] ||''} style={{marginLeft:'0'}} maxLength={4}/>
//                          - <input className="short-input" name="phone2" defaultValue={state.phone && state.phone.split('-')[1] ||''} maxLength={4}/>
//                          - <input className="short-input" name="phone3" defaultValue={state.phone && state.phone.split('-')[1] ||''} maxLength={4}/>
//                     </td>
//                 </tr>
//                 <tr>
//                     <td rowSpan={3} colSpan={2} className="table-label">주소</td>
//                     <td colSpan={11}>
//                         <input  name="zipCode" defaultValue={state.zipcode} className="zip-code-input"/>[우변번호]
//                     </td>
//                 </tr>
//                 <tr>
//                     <td colSpan={11}><input name="address" defaultValue={state.address}/></td>
//                 </tr>
//                 <tr>
//                     <td colSpan={11}><input  name="addressDetail" defaultValue={state.addressDetail}/></td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2} className="table-label">생년월일</td>
//                     <td colSpan={4}><input type="date" name="birthday" defaultValue={state.birthday}/></td>
//                     <td colSpan={2} className="table-label">결혼여부</td>
//                     <td colSpan={4} className="table-radio-container">
//                         <div>
//                             <label><input type="radio" value="single" name="married" defaultChecked={state.married}/>미혼</label>
//                             <label><input type="radio" value="married"  name="married" defaultChecked={!state.married}/>기혼</label>
//                         </div>
//                     </td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2} className="table-label">메모</td>
//                     <td colSpan={10}>
//                         <textarea name='memo' defaultValue={state.memo}/>
//                     </td>
//                 </tr>
//                 </tbody>
//             </table>
//             <div className='button-container'>
//                 <button type={'submit'} disabled={isPending}>저장</button>
//                 <button type={'button'} onClick={ ()=> company ? router.push(`company?mode=detail&target=${company.userId}`):window.close()}>취소</button>
//             </div>
//             </form>
//         </section>
//     )
// }