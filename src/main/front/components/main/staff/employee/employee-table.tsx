'use client'
import '@/styles/table-style/search-result.scss';
import '@/styles/table-style/search.scss';

import React, { useEffect, useRef, useState } from "react"
import { usePathname , useRouter, useSearchParams } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { useItemSelection } from "@/hooks/share/useItemSelection";

import Pagination from "@/components/share/pagination";
import EmployeeOptions from "./employee-options";

import { EmployeeClassEnum, ResponseEmployee } from "@/model/types/staff/employee/type";
import { useWindowSize } from '@/hooks/share/useWindowSize';
import { apiUrl } from '@/model/constants/apiUrl';


export default function EmployeeTable({initialEmployee, page}:{initialEmployee:ResponseEmployee[], page:number}){
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);

    const [employee,setEmployee] = useState<ResponseEmployee[]>(initialEmployee)
    const [pageByEmployee,setPageByEmployee] = useState<ResponseEmployee[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    //search input variables 
    const inputRef = useRef<HTMLInputElement|null>(null)
    
    //router variables
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);
    const size = useWindowSize()


    const searchHandler = () =>{
        setEmployee(()=>{
            return initialEmployee.filter(({name})=>name.includes(inputRef.current.value))
        })
        const params = new URLSearchParams(searchParams.toString()); 
        params.delete("page"); 
        // 기존 pathname 유지
        router.push(`${pathname}?${params.toString()}`); 
    }
    const allViewHandler =()=>{
        setEmployee(initialEmployee)
        const params = new URLSearchParams(searchParams.toString()); 
        params.delete("page"); 
        // 기존 pathname 유지
        router.push(`${pathname}?${params.toString()}`); 
    }

    useEffect(()=>{
        setPageByEmployee(employee.slice((page-1)*20, ((page-1)*20)+20))
        setLoading(false)
    },[employee, page])

    //TODO: add mobile version
    const signNewemployeeHandler = ()=>{
           
        if(size.width>620){
            const url = `${apiUrl}/register-employee`; 
            const popupOptions = "width=620,height=500,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }
    }

    return(
        <>
            <section className="filter-container">
                <h4>사원명</h4>
                <input type='text' ref={inputRef}/>
                <button onClick={searchHandler}>조회</button>
                <button onClick={allViewHandler}>전체검색</button>
            </section>
            <table className="search-result-table">
                <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '15%' }} />
                    {size.width>720 && <col style={{ width: '15%' }} />}
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '1%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td>성명</td>
                        <td>부서</td>
                        <td>직위</td>
                        <td>영문성명</td>
                        <td>연락처</td>
                        {size.width>720 && <td>핸드폰</td>}
                        <td>관리</td>
                    </tr>
                </thead>
                <tbody>
                    {pageByEmployee.map((employee:ResponseEmployee)=>(
                        <tr key={employee.userId} ref={(el)=> {itemsRef.current[employee.userId] = el}} className={target === employee.userId ?'is-click' :''}>
                            <td>{employee.name}</td>
                            <td>{employee.dept.deptName}</td>
                            <td>{EmployeeClassEnum[employee.userClass]}</td>
                            <td>{employee.engName}</td>
                            <td>{employee.tel}</td>
                            {size.width>720 &&<td>{employee.phone}</td>}
                            <td className='icon' onClick={()=> target === employee.userId ? setTarget(null) :setTarget(employee.userId)}>
                                <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === employee.userId &&{color:'orange'}}/>
                                {target === employee.userId && <EmployeeOptions employeeId={employee.userId}/>}
                            </td>
                        </tr>
                    ))}
                    {!loading && pageByEmployee.length===0 && 
                        <tr className='none-hover'>
                            <td colSpan={9}>
                                <p>등록된 사원이 존재하지 않습니다.</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {(!loading && employee.length>20) &&
                <Pagination
                    totalItems={employee.length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}
                />
            }
            {!loading &&
            <div className='table-buttons' style={{justifyContent:'right'}}>
                <button onClick={signNewemployeeHandler}>신규등록</button>
            </div>
            }
        </>
    )
}