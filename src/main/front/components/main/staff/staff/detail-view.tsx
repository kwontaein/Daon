"use client";
import Image from "next/image";
import './form/staff-form.scss'

import { useState } from "react";
import { ResponseStaff } from "@/model/types/staff/staff/type";
import { DeptMap, EmployeeClassMap, UserGrade } from "@/model/constants/staff/staff-info-map";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function StaffDetailView({staff}:{staff:ResponseStaff}){
    const [image, setImage] = useState<string | null>(null);
    const [buttonText, setButtonText] = useState("사진 선택"); // 버튼 텍스트 변경 가능
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // 사용자가 선택한 파일 가져오기
        if (file) {
            const imageUrl = URL.createObjectURL(file); // 선택한 파일의 미리보기 URL 생성
            setImage(imageUrl);
            setButtonText("사진 변경");
        }
    };

      
    const editModeHandler = () => {
        const params = new URLSearchParams(searchParams.toString()); 
          params.set("mode", "edit"); 
      // 기존 pathname 유지
        router.push(`${pathname}?${params.toString()}`); 
      };
    
    return(
        <section className="staff-form-container">
            <table className="staff-form-table">
                <colgroup>
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                    <col style={{ width: '8.8%' }} />
                </colgroup>
                <tbody>
                <tr>
                    <td colSpan={2} className="table-label">관리등급</td>
                    <td colSpan={2}>
                        {UserGrade[staff.userRole]}
                    </td>
                    <td colSpan={2} className="table-label">직위</td>
                    <td colSpan={2}>
                       {EmployeeClassMap[staff.userClass]}
                    </td>                         
                    <td colSpan={2} className="table-label">부서</td>
                    <td colSpan={2}>
                        {DeptMap[staff.dept]}
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">성&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;명</td>
                    <td colSpan={2}>{staff.name}</td>
                    <td colSpan={2} className="table-label">영문성명</td>
                    <td colSpan={2}>{staff.engName}</td>
                    <td colSpan={2} className="table-label">한자성명</td>
                    <td colSpan={2}>{staff.chName}</td>
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
                    <td colSpan={8}>{dayjs(staff.joinDate).format('YY년 MM월 DD일')}</td>
                </tr>
                <tr>
                    <td colSpan={2}className="table-label">아이디</td>
                    <td colSpan={8}>{staff.userId}</td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">비밀번호</td>
                    <td colSpan={8}>-</td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">이메일</td>
                    <td colSpan={8}>{staff.email}</td>
                </tr>
  
                <tr>
                    <td colSpan={2} className="table-label">전화번호</td>
                    <td colSpan={3}>
                        {staff.tel}
                    </td>  
                    <td colSpan={2} className="table-label">핸드폰</td>
                    <td colSpan={3}>
                        {staff.phone}
                    </td>
                </tr>
                <tr>
                    <td rowSpan={3} colSpan={2} className="table-label">주소</td>
                    <td colSpan={11}>
                        {staff.zipcode}[우변번호]
                    </td>
                </tr>
                <tr>
                    <td colSpan={11}>{staff.address}</td>
                </tr>
                <tr>
                    <td colSpan={11}>{staff.addressDetail}</td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">생년월일</td>
                    <td colSpan={4}>{dayjs(staff.birthday).format('YY년 MM월 DD일')}</td>
                    <td colSpan={2} className="table-label">결혼여부</td>
                    <td colSpan={4} className="table-radio-container">
                        {staff.married ? "기혼" : "미혼"}
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="table-label">메모</td>
                    <td colSpan={10}>
                        {staff.memo}
                    </td>
                </tr>
            </tbody>
        </table>
        <div className="button-container">
        <button onClick={editModeHandler}>수정</button>
        <button onClick={()=>window.close()}>창닫기</button>
      </div>
    </section>
    )
}