'use client'
import '@/styles/table-style/search-result.scss';
import '@/styles/table-style/search.scss';

import notice from '@/assets/notice.gif';
import Image from 'next/image';
import dayjs from 'dayjs';
import Link from 'next/link';
import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from 'react';
import Pagination from '@/components/share/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ResponseBoard } from '@/model/types/board/type';


function searchBoardAction(prev, formData){
    const searchOption = formData.get('searchOption')
    const searchTitle = formData.get('searchTitle')

    return {
        ...prev,
        searchOption,
        searchTitle,
        boardList: searchTitle
            ? prev.initialBoardItems
                .filter((board) => board[searchOption].includes(searchTitle))
            : null
        
    }
}

export default function BoardList({initialBoardItems,page}:{
    initialBoardItems:ResponseBoard[],
    page:number
}){
    const [boardList, setBoardList] = useState()
    const pageByBoard = useMemo(()=>(boardList??initialBoardItems).slice((page-1)*20, ((page-1)*20)+20),[initialBoardItems, boardList,page])
    const [state, action] = useActionState(searchBoardAction,{initialBoardItems})
    const formRef = useRef(null)
    
    const cancleHandler = () => {
        const formData = new FormData(formRef.current!);
        formData.set('searchOption', 'title');
        formData.set('searchTitle','')
        startTransition(() => {
            action(formData);
        });
    };
    useEffect(()=>{
        setBoardList(state.boardList)
    },[state])

    return(
        <section style={{width:'100%', maxWidth:'700px'}}>
            <form action={action} ref={formRef}>
                <table className='additional-search-container' style={{maxWidth:'500px'}}>
                    <colgroup>
                        <col style={{width:'1%'}}/>
                        <col style={{width:'80%'}}/>
                        <col style={{width:'9%'}}/>
                        <col style={{width:'10%'}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <td>
                            <select name='searchOption' defaultValue={state.searchOption}>
                                <option value='title'>제목</option>
                                <option value='writer'>작성자</option>
                            </select>
                        </td>
                        <td>
                            <span style={{gap:'5px'}}>
                                <input name='searchTitle' defaultValue={state.searchTitle} key={state.searchTitle+'searchTitle'}/>
                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            </span>
                        </td>
                        <td><button type='button' onClick={cancleHandler}>취소</button></td>
                        <td>
                            <button>
                                <Link href={`/main/board/board?mode=write`}>글등록</Link>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
            <table className="search-result-table">
                <colgroup>
                    <col style={{width:'1%', minWidth:'42px'}}/>
                    <col style={{width:'70%'}}/>
                    <col style={{width:'10%', minWidth:'45px'}}/>
                    <col style={{width:'15%'}}/>
                    <col style={{width:'5%', minWidth:'42px'}}/>
                </colgroup>
                <thead>
                    <tr>
                        <td>순번</td>
                        <td>제목</td>
                        <td>작성자</td>
                        <td>작성일</td>
                        <td>조회</td>
                    </tr>                
                </thead>  
                <tbody>
                    {pageByBoard.map((board,index)=>(
                        <tr key={board.boardId}>
                            <td>{board.notice ?
                                <Image src={notice} alt='💡' width={15}/>: index }</td>
                            <td className='left-align hover-text' style={{fontWeight:board.notice? 'bold':'unset'}}>
                                <Link href={`/main/board/board?target=${board.boardId}`}>
                                    {board.title}
                                </Link>
                            </td>
                            <td>{board.writer}</td>
                            <td>{dayjs(board.createAt).format('YYYY.MM.DD')}</td>
                            <td>{board.views}</td>
                        </tr>
                    ))}
                </tbody>              
            </table>
            <Pagination
                totalItems={(boardList??initialBoardItems).length}
                itemCountPerPage={20} 
                pageCount={5} 
                currentPage={Number(page)}
            />

        </section>
    )
}