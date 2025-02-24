'use client'
import React, { useEffect, useState } from "react"

import './staff-table.scss';
import Pagination from "@/components/pagination";
import { ResponseStaff } from "@/types/staff/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useItemSelection } from "@/hooks/share/useItemSelection";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import StaffOptions from "./staff-options";
import { DeptMap, EmployeeClassMap } from "@/constants/staff/staff-info-map";


export default function StaffTable({initialStaff, page}:{initialStaff:ResponseStaff[], page:number}){
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const [staff,setStaff] = useState<ResponseStaff[]>(initialStaff)
    const [allView,setAllView] = useState(true)
    const [pageByStaff,setPageByStaff] = useState<ResponseStaff[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);


    useEffect(()=>{
        setPageByStaff(staff.slice((page-1)*20, ((page-1)*20)+20))
        setLoading(false)
    },[staff, page])

    return(
        <>
            <section className="staff-search-container">
                <h4>사원명</h4>
                <input type='text'/>
                <button>조회</button>
                <button>전체검색</button>
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
                </tbody>
            </table>
            {!loading &&
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