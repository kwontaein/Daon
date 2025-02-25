'use client'

import './company-table.scss';

import { useItemSelection } from "@/hooks/share/useItemSelection";
import { ResponseCompany } from "@/types/staff/company/type";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import CompanyOptions from "./company-options";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from '@/components/pagination';

export default function CompanyTable({initialCompany, page}:{initialCompany:ResponseCompany[], page:number}){
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const [company,setCompany] = useState<ResponseCompany[]>(initialCompany)
    const [pageByCompany, setPageByCompany] = useState<ResponseCompany[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    //search input variables 
    const inputRef = useRef<HTMLInputElement|null>(null)
    
    //router variables
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);



    const searchHandler = () =>{
        setCompany(()=>{
            return initialCompany.filter(({ceo})=>ceo.includes(inputRef.current.value))
        })
        const params = new URLSearchParams(searchParams.toString()); 
        params.delete("page"); 
        // 기존 pathname 유지
        router.push(`${pathname}?${params.toString()}`); 
    }
    const allViewHandler =()=>{
        setCompany(initialCompany)
        const params = new URLSearchParams(searchParams.toString()); 
        params.delete("page"); 
        // 기존 pathname 유지
        router.push(`${pathname}?${params.toString()}`); 
    }
    useEffect(()=>{
        setPageByCompany(company.slice((page-1)*20, ((page-1)*20)+20))
        setLoading(false)
    },[company, page])


    return(
        <section>
            <section className="company-search-container">
                <h4>대표자명</h4>
                <input type='text' ref={inputRef}/>
                <button onClick={searchHandler}>조회</button>
                <button onClick={allViewHandler}>전체검색</button>
            </section>
            <table className="company-table">
                <thead>
                    <tr>
                        <td>상호</td>
                        <td>사업자등록번호</td>
                        <td>전화</td>
                        <td>FAX</td>
                        <td>대표자명</td>
                        <td>관리</td>
                    </tr>   
                </thead>
                <tbody>
                    {pageByCompany.map(company => (
                        <tr key={company.businessNum} ref={(el)=> {itemsRef.current[company.businessNum] = el}} className={target === company.businessNum ?'is-click' :''} >
                            <td>{company.companyName}</td>
                            <td>{company.businessNum}</td>
                            <td>{company.tel}</td>
                            <td>{company.fax}</td>
                            <td>{company.ceo}</td>
                            <td className='icon' onClick={()=> target === company.businessNum ? setTarget(null) :setTarget(company.businessNum)}>
                                <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === company.businessNum &&{color:'orange'}}/>
                                {target === company.businessNum && <CompanyOptions companyId={company.businessNum}/>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(!loading && company.length>20) &&
                <Pagination
                    totalItems={company.length}
                    itemCountPerPage={20} 
                    pageCount={5} 
                    currentPage={Number(page)}
                />
            }
        </section>
    )
}