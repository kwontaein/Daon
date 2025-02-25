'use client'
import './staff-table.scss';

import React, { useEffect, useRef, useState } from "react"
import { usePathname , useRouter, useSearchParams } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { useItemSelection } from "@/hooks/share/useItemSelection";

import Pagination from "@/components/pagination";
import StaffOptions from "./staff-options";

import { DeptMap, EmployeeClassMap } from "@/constants/staff/staff-info-map";
import { ResponseStaff } from "@/types/staff/type";


export default function StaffTable({initialStaff, page}:{initialStaff:ResponseStaff[], page:number}){
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);

    const [staff,setStaff] = useState<ResponseStaff[]>(initialStaff)
    const [pageByStaff,setPageByStaff] = useState<ResponseStaff[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    //search input variables 
    const inputRef = useRef<HTMLInputElement|null>(null)
    
    //router variables
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);



    const searchHandler = () =>{
        console.log(initialStaff.filter(({name})=>name.includes(inputRef.current.value)))
        setStaff(()=>{
            return initialStaff.filter(({name})=>name.includes(inputRef.current.value))
        })
        const params = new URLSearchParams(searchParams.toString()); 
        params.delete("page"); 
        // 기존 pathname 유지
        router.push(`${pathname}?${params.toString()}`); 
    }
    const allViewHandler =()=>{
        setStaff(initialStaff)
        const params = new URLSearchParams(searchParams.toString()); 
        params.delete("page"); 
        // 기존 pathname 유지
        router.push(`${pathname}?${params.toString()}`); 
    }

    useEffect(()=>{
        setPageByStaff(staff.slice((page-1)*20, ((page-1)*20)+20))
        setLoading(false)
    },[staff, page])

    return(
        <>
            <section className="staff-search-container">
                <h4>사원명</h4>
                <input type='text' ref={inputRef}/>
                <button onClick={searchHandler}>조회</button>
                <button onClick={allViewHandler}>전체검색</button>
            </section>
            <table className="staff-table">
                <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
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
                        <td>핸드폰</td>
                        <td>관리</td>
                    </tr>
                </thead>
                <tbody>
                    {pageByStaff.map((staff:ResponseStaff)=>(
                        <tr key={staff.userId} ref={(el)=> {itemsRef.current[staff.userId] = el}} className={target === staff.userId ?'is-click' :''}>
                            <td>{staff.name}</td>
                            <td>{DeptMap[staff.dept]}</td>
                            <td>{EmployeeClassMap[staff.userClass]}</td>
                            <td>{staff.engName}</td>
                            <td>{staff.tel}</td>
                            <td>{staff.phone}</td>
                            <td className='icon' onClick={()=> target === staff.userId ? setTarget(null) :setTarget(staff.userId)}>
                                <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === staff.userId &&{color:'orange'}}/>
                                {target === staff.userId && <StaffOptions staffId={staff.userId}/>}
                            </td>
                        </tr>
                    ))}
                    {!loading && pageByStaff.length===0 && 
                        <tr className='none-hover'>
                            <td colSpan={9}>
                                <p>조회된 결과가 없습니다.</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {(!loading && staff.length>20) &&
                <Pagination
                    totalItems={staff.length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}
                />
            }
        </>
    )
}