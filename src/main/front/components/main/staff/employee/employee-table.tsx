'use client'
import '@/styles/table-style/search-result.scss';
import '@/styles/table-style/search.scss';

import React, { useEffect, useMemo, useRef, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { useItemSelection } from "@/hooks/share/useItemSelection";
import Pagination from "@/components/share/pagination";
import EmployeeOptions from "./employee-options";

import { EmployeeClassEnum, ResponseEmployee } from "@/model/types/staff/employee/type";
import { apiUrl } from '@/model/constants/apiUrl';
import { useScreenMode } from '@/hooks/share/useScreenMode';
import useDeletePage from '@/hooks/share/useDeletePage';


export default function EmployeeTable({initialEmployee, page}:{initialEmployee:ResponseEmployee[], page:number}){
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const deletePage = useDeletePage()

    const [employee,setEmployee] = useState<ResponseEmployee[]>()
    const pageByEmployee = useMemo(()=>(employee??initialEmployee).slice((page-1)*20, ((page-1)*20)+20), [initialEmployee,employee, page])
    const [loading, setLoading] = useState<boolean>(true)

    //search input variables 
    const inputRef = useRef<HTMLInputElement|null>(null)
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);
    const mode = useScreenMode({tabletSize:720,mobileSize:620})

    const searchHandler = () =>{
        setEmployee(()=>{
            return initialEmployee.filter(({name})=>name.includes(inputRef.current.value))
        })
        deletePage()
    }

    const allViewHandler =()=>{
        setEmployee(null)

    }

    useEffect(()=>{
        setLoading(false)
    },[employee, page])

    //TODO: add mobile version
    const signNewemployeeHandler = ()=>{
           
        if(window.innerWidth>620){
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
                    {mode==='pc' && <col style={{ width: '15%' }} />}
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '1%' , minWidth:'35px'}} />
                </colgroup>
                <thead>
                    <tr>
                        <td>성명</td>
                        <td>부서</td>
                        <td>직위</td>
                        <td>영문성명</td>
                        <td>연락처</td>
                        {mode==='pc' && <td>핸드폰</td>}
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
                            {mode==='pc' &&<td>{employee.phone}</td>}
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
            {(!loading && (employee??initialEmployee).length>20) &&
                <Pagination
                    totalItems={(employee??initialEmployee).length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}
                />
            }
            {!loading &&
            <div className='right-buttons-container'>
                <button onClick={signNewemployeeHandler}>신규등록</button>
            </div>
            }
        </>
    )
}