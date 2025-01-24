'use client'
import { useState, useEffect } from "react";
import './pagination.scss';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
}

export default function Pagination({ totalItems, itemCountPerPage, pageCount, currentPage }: Props) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage); //전체 페이지 = 아이템 / 한페이지당 노출할 개수
  const [start, setStart] = useState(1);
  const noPrev = start === 1; //이전 페이지 유무
  const noNext = start + pageCount - 1 >= totalPages; //다음 페이지 유무
  
  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount); //다음으로 갈 시 start 갱신
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div className={'wrapper'}>
        <div className={`move ${noPrev && 'invisible'}`}>
          <Link href={`?page=${start - 1}`}>
          <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </div>
        <>
        {[...Array(pageCount)].map((a, i) => (
            start + i <= totalPages && (
              <li key={i} className={`li_margin ${currentPage === start + i && 'active'}`}>
                <Link className={`page`} href={`?page=${start + i}`}>
                  {start + i}
                </Link>
              </li>
            )
          ))}
        </> 
        <div className={`'move' ${noNext && 'invisible'}`}>
          <Link href={`?page=${start + pageCount}`}>
            <FontAwesomeIcon icon={faChevronRight}/>
          </Link>
        </div>
    </div>
  );
}