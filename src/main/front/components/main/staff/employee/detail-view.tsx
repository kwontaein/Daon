"use client";
import Image from "next/image";
import '@/styles/form-style/form.scss'

import { useState } from "react";
import { EmployeeClassEnum, ResponseEmployee, UserRoleEnum } from "@/model/types/staff/employee/type";
import dayjs from "dayjs";
import useChangeMode from "@/hooks/share/useChangeMode";

export default function EmployeeDetailView({employee, isMobile=false}:{employee:ResponseEmployee, isMobile?:boolean}){
    const [image, setImage] = useState<string | null>(null);
    const [buttonText, setButtonText] = useState("사진 선택"); // 버튼 텍스트 변경 가능
    const changeModeHandler = useChangeMode()


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // 사용자가 선택한 파일 가져오기
        if (file) {
            const imageUrl = URL.createObjectURL(file); // 선택한 파일의 미리보기 URL 생성
            setImage(imageUrl);
            setButtonText("사진 변경");
        }
    };

      

    return(
        <section className="register-form-container">
            <table className="register-form-table">
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '25%' }} />
                </colgroup>
                <tbody>
                <tr>
                    <td colSpan={2} className="table-label">관리등급</td>
                    <td colSpan={2}>
                        {UserRoleEnum[employee.userRole]}
                    </td>
                    <td colSpan={2} className="table-label">직위</td>
                    <td colSpan={2}>
                       {EmployeeClassEnum[employee.userClass]}
                    </td>                         
                    <td colSpan={2} className="table-label">부서</td>
                    <td colSpan={2}>
                        {employee.dept.deptName}
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">성&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;명</td>
                    <td colSpan={2}>{employee.name}</td>
                    <td colSpan={2} className="table-label">한자성명</td>
                    <td colSpan={2}>{employee.chName}</td>
                    <td colSpan={2} className="table-label">영문성명</td>
                    <td colSpan={2}>{employee.engName}</td>
                </tr>

                <tr>
                    <td rowSpan={5} colSpan={2} className="image-container">
                        <label htmlFor='image-input' className={`image-upload-label ${image && 'absolute-label'}`}>{buttonText}</label>
                        
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
                        <input id='image-input' type="file" accept="image/*" style={{display:'none'}} onChange={handleImageChange}/>
                    </td>
                    <td colSpan={2} className="table-label">입사일</td>
                    <td colSpan={8}>{dayjs(employee.joinDate).format('YY년 MM월 DD일')}</td>
                </tr>
                <tr>
                    <td colSpan={2}className="table-label">아이디</td>
                    <td colSpan={8}>{employee.userId}</td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">비밀번호</td>
                    <td colSpan={8}>{("*").repeat(8)}</td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">이메일</td>
                    <td colSpan={8}>{employee.email}</td>
                </tr>
  
                <tr>
                    <td colSpan={2} className="table-label">전화번호</td>
                    <td colSpan={3}>
                        {employee.tel}
                    </td>  
                    <td colSpan={2} className="table-label">핸드폰</td>
                    <td colSpan={3}>
                        {employee.phone}
                    </td>
                </tr>
                <tr>
                    <td rowSpan={3} colSpan={2} className="table-label">주소</td>
                    <td colSpan={11}>
                        {employee.zipcode}[우변번호]
                    </td>
                </tr>
                <tr>
                    <td colSpan={11}>{employee.address}</td>
                </tr>
                <tr>
                    <td colSpan={11}>{employee.addressDetail}</td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">생년월일</td>
                    <td colSpan={4}>{dayjs(employee.birthday).format('YY년 MM월 DD일')}</td>
                    <td colSpan={2} className="table-label">결혼여부</td>
                    <td colSpan={4} className="table-radio-container">
                        {employee.married ? "기혼" : "미혼"}
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">메모</td>
                    <td colSpan={10} className={employee.memo ? '' :'memo'}>
                        {employee.memo}
                    </td>
                </tr>
            </tbody>
        </table>
        <div className="button-container">
        <button onClick={()=>changeModeHandler('edit')}>수정</button>
        <button onClick={()=>isMobile? window.history.back():window.close()}>창닫기</button>
      </div>
    </section>
    )
}