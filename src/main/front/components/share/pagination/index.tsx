'use client'
import { useState, useEffect } from "react";
import './pagination.scss';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useSearchParams } from "next/navigation";
import { useModalState } from "@/store/zustand/modal";

interface Props {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
  isModal?:boolean
}

export default function Pagination({ totalItems, itemCountPerPage, pageCount, currentPage,isModal=false }: Props) {
  
  const totalPages = Math.ceil(totalItems / itemCountPerPage); //전체 페이지 = 아이템 / 한페이지당 노출할 개수
  const [start, setStart] = useState(()=>Math.max(1, currentPage - (currentPage % pageCount) + 1));
  const noPrev = start === 1; //이전 페이지 유무
  const noNext = start + pageCount - 1 >= totalPages; //다음 페이지 유무
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const {setModalState} = useModalState()
  useEffect(() => {
    setStart((prev) => {
      if (currentPage >= prev + pageCount) {
        return Math.min(prev + pageCount, totalPages - pageCount + 1);
      }
      if (currentPage < prev) {
        if(prev>totalPages){
           return Math.max(1, currentPage - (currentPage % pageCount) + 1)
        }
        return Math.max(1, prev - pageCount);
      }
      return prev;
    });
  }, [currentPage, pageCount]);


  const createPageUrl = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={'wrapper'}>
        <div className={`move ${noPrev && 'invisible'}`}>
          {!isModal ?
             <Link href={createPageUrl(start - 1)}>
             <FontAwesomeIcon icon={faChevronLeft} />
           </Link>
           :
           <div onClick={()=>setModalState({modalPage:start-1})} style={{cursor:'pointer'}}>
              <FontAwesomeIcon icon={faChevronLeft} />
           </div>
          }
         
        </div>
        <>
        {[...Array(pageCount)].map((a, i) => (
            start + i <= totalPages && (
              <li key={i} className={`li_margin ${currentPage === start + i && 'active'}`}>
                {!isModal ?
                    <Link className={`page`} href={createPageUrl(start + i)}>
                      {start + i}
                    </Link> 
                    :
                    <div onClick={()=>setModalState({modalPage:start+i})} style={{cursor:'pointer'}}>
                      {start + i}
                    </div>
                  }
              </li>
            )
          ))}
        </> 
        <div className={`move ${noNext && 'invisible'}`}>
          {!isModal ?
            <Link href={createPageUrl(start + pageCount)}>
              <FontAwesomeIcon icon={faChevronRight}/>
            </Link>
            :
            <div onClick={()=>setModalState({modalPage:start + pageCount})} style={{cursor:'pointer'}}>
              <FontAwesomeIcon icon={faChevronRight}/>
            </div>
          }
          
        </div>
    </div>
  );
}