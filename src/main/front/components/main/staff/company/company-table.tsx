'use client'

import './company-table.scss';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useItemSelection } from "@/hooks/share/useItemSelection";

import CompanyOptions from "./company-options";
import { ResponseCompany } from "@/model/types/staff/company/type";
import Pagination from '@/components/share/pagination';
import { useScreenMode } from '@/hooks/share/useScreenMode';
import useDeletePage from '@/hooks/share/useDeletePage';
import useRouterPath from '@/hooks/share/useRouterPath';

export default function CompanyTable({initialCompany, page}:{initialCompany:ResponseCompany[], page:number}){
    const { itemsRef, target, setTarget } = useItemSelection<string>(true);
    const [company,setCompany] = useState<ResponseCompany[]>()
    const pageByCompany = useMemo(()=> (company??initialCompany).slice((page-1)*20, ((page-1)*20)+20),[initialCompany, company,page])
    const [loading, setLoading] = useState<boolean>(true)
    const mode = useScreenMode({tabletSize:700,mobileSize:620})
    const deletePage = useDeletePage()

    //search input variables 
    const inputRef = useRef<HTMLInputElement|null>(null)
    const redirect = useRouterPath()

    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);


    const searchHandler = () =>{
        setCompany(()=>{
            return initialCompany.filter(({ceo})=>ceo.includes(inputRef.current.value))
        })
        deletePage()
    }
    const allViewHandler =()=>{
        setCompany(null)
        deletePage()
    }
    useEffect(()=>{
        setLoading(false)
    },[company, page])

       //TODO: add mobile version
    const signNewCompanyHandler = ()=>{
        if(window.innerWidth>620){
            const url = `${process.env.NEXT_PUBLIC_API_URL}/register-company`; 
            const popupOptions = "width=620,height=500,scrollbars=yes,resizable=yes"; // 팝업 창 옵션
            window.open(url, "PopupWindow", popupOptions);
        }else{
            redirect('register-company')
        }
    }

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
                        {mode==='pc' && <td>FAX</td>}
                        <td>대표자명</td>
                        <td>관리</td>
                    </tr>   
                </thead>
                <tbody>
                    {pageByCompany.map(company => (
                        <tr key={company.companyId} ref={(el)=> {itemsRef.current[company.companyId] = el}} className={target === company.companyId ?'is-click' :''} >
                            <td>{company.companyName}[{company.printName}]</td>
                            <td>{company.businessNumber}</td>
                            <td>{company.tel}</td>
                            {mode==='pc' &&<td>{company.fax}</td>}
                            <td>{company.ceo}</td>
                            <td className='icon' onClick={()=> target === company.companyId ? setTarget(null) :setTarget(company.companyId)}>
                                <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === company.companyId &&{color:'orange'}}/>
                                {target === company.companyId && <CompanyOptions companyId={company.companyId}/>}
                            </td>
                        </tr>
                    ))}
                    {!loading && pageByCompany.length===0 && 
                        <tr className='none-hover'>
                            <td colSpan={9}>
                                <p>등록된 회사가 존재하지 않습니다.</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {!loading &&
                <>
                    <Pagination
                        totalItems={(company??initialCompany).length}
                        itemCountPerPage={20} 
                        pageCount={5} 
                        currentPage={Number(page)}
                    />
                    <div className='company-button-container'>
                        <button onClick={signNewCompanyHandler}>신규등록</button>
                    </div>
                </> 
            }
        </section>
    )
}