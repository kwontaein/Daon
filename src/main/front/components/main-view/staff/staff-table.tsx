'use client'
import { useEffect, useState } from "react"

import './staff-table.scss';
import Pagination from "@/components/pagination";

export default function StaffTable({initialStaff, page}){
    const [staff,setStaff] = useState(initialStaff)
    const [allView,setAllView] = useState(true)
    const [pageByStaff,setPageByStaff] = useState()
    const [loading, setLoading] = useState<boolean>(true)

    
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
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '5%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td>사번</td>
                        <td>아이디</td>
                        <td>부서</td>
                        <td>직위</td>
                        <td>한글성명</td>
                        <td>한자성명</td>
                        <td>영문성명</td>
                        <td>연락처</td>
                        <td>핸드폰</td>
                        <td>관리</td>
                    </tr>
                </thead>
                <tbody>

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