'use client'
import '@/styles/table-style/search-result.scss';
import '@/styles/form-style/form.scss';
import '@/styles/_global.scss'
import asideArrow from '@/public/assets/aside-arrow.gif';

import Pagination from '../pagination';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {ResponseOfficial} from '@/model/types/sales/official/type';
import { useModalState } from '@/store/zustand/modal';
import { useRouter } from 'next/navigation';

export default function OfficialSearchItems({officials, page, pageLength}: {
    officials: ResponseOfficial[],
    page: number,
    pageLength: number
}) {
    const [idx, setIdx] = useState<number>(0)
    const {searchKeyword, setModalState} = useModalState()
    const router = useRouter()


    const selectValue = (official: ResponseOfficial) => {
        if(searchKeyword){
            setModalState({official})
            router.back()
        }else{
            const message = {
                ...official,
            }
            if (window.opener) {
                window.opener.postMessage(message, "*");
                window.close();
            }
        }
    };


    const handleKeyDown = (event: KeyboardEvent) => {
        // 방향키를 눌렀을 때 반응
        if (event.key === "ArrowUp") {
            setIdx((prev) => {
                return idx <= 0 ? 19 : prev - 1
            })
        } else if (event.key === "ArrowDown") {
            setIdx((prev) => {
                return idx >= officials.length - 1 ? 0 : prev + 1
            })
        } else if (event.key === "Enter") {
            selectValue(officials[idx])
        }
    };

    useEffect(() => {
        setIdx(0)
    }, [officials])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [idx, handleKeyDown]);

    return (
        <section style={{padding: '5px'}}>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>관리비 조회결과</h4>
            </header>
            <table className='search-result-table'>
                <colgroup>
                    <col style={{width: '10%'}}/>
                    <col style={{width: '90%'}}/>
                </colgroup>
                <thead>
                <tr>
                    <td>순번</td>
                    <td>관리비명</td>
                </tr>
                </thead>
                <tbody>
                {officials.map((official, index) => (
                    <tr
                        key={official.officialId}
                        onClick={() => setIdx(index)}
                        onDoubleClick={() => selectValue(official)}
                        className={idx === index ? 'is-click' : ''}
                        style={{cursor: 'pointer'}}>
                        <td>{(page - 1) * 20 + index + 1}</td>
                        <td className='left-align'>{official.officialName}</td>
                    </tr>
                ))}
                {officials.length === 0 &&
                    <tr className='none-hover'>
                        <td colSpan={4}>
                            <p style={{fontSize: '14px'}}>조회된 결과가 없습니다.</p>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
            <Pagination
                totalItems={pageLength}
                itemCountPerPage={20}
                pageCount={5}
                currentPage={Number(page)}
                isModal={!!searchKeyword}/>
        </section>
    )
}