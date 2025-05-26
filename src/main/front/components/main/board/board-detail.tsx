'use client'
import '@/styles/form-style/form.scss'
import './file.scss';

import React, {MouseEvent, startTransition, useEffect, useMemo, useOptimistic, useRef, useState} from 'react';
import BoardAction from '@/features/board/actions/boardActions';
import {useRouter} from 'next/navigation';
import dayjs from 'dayjs';
import { BoardFile, ResponseBoard } from '@/model/types/board/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import BoardOption from './options';
import { ClientMousePosition } from '@/model/types/share/type';
import { filesize } from 'filesize';
import { updateViews } from '@/features/board/api/server-api';
import { useUserInformation } from '@/store/zustand/userInfo';
import BoardDetailOption from './board-detail-options';

const fetchViews = async (boardId:string)=>{
    await updateViews(boardId)
}

export default function BoardDetail({initialBoard, beforeBoard, afterBoard} : {
    initialBoard: ResponseBoard,
    beforeBoard?: ResponseBoard,
    afterBoard?: ResponseBoard
}) {
    const [files, setFiles] = useState<BoardFile[]>([]);
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);
    const {itemsRef, target,setTarget} = useItemSelection(true)
    const [mousePosition, setMousePosition] = useState<ClientMousePosition|null>(null)
    const router = useRouter()
    
    const {user} = useUserInformation()
    const hasFetchedViews = useRef(false); //views 중복 업데이트 방지

    const [views, dispatchView] = useOptimistic(initialBoard.views,(initialBoard, actionType)=>{
        switch(actionType){
            case 'update' :
                return initialBoard+1;
            case 'rollback' :
                return initialBoard;
        }
    })

    const fetchBoardViews =()=>{
        try{
            startTransition(()=>{
                dispatchView('update')
            })
            updateViews(initialBoard.boardId)
        }catch(error){
            startTransition(()=>{
                dispatchView('rollback')
            })
            console.error('Failed to update views:', error);
        }

    }
    useEffect(()=>{
        if (hasFetchedViews.current) return;
        hasFetchedViews.current = true;
        fetchBoardViews()
    },[])

    const getMousePosition = (
        e: MouseEvent<HTMLDivElement>,
    ) => {
        e.preventDefault();
        const tableRect = e.currentTarget.getBoundingClientRect();
        return(
            { x:tableRect.left-30, y:tableRect.top + 20}
        )
    };


    useEffect(()=>{

        setFiles(initialBoard.files)
    },[initialBoard])

    
    return (
        <section style={{maxWidth: '700px', width: '100%', position:'relative'}}>
                <table className='register-form-table' style={{fontSize: '1rem', marginTop: '1rem', tableLayout:'fixed'}}>
                    <colgroup>
                        <col style={{width: '15%', minWidth:'90px'}}/>
                        <col style={{width: '25%'}}/>
                        <col style={{width: '8%', minWidth:'90px'}}/>
                        <col style={{width: '40%'}}/>
                        <col style={{width: '8%' , minWidth:'80px'}}/>
                        <col style={{width: '10%', }}/>
                    </colgroup>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className='table-label' style={{borderLeft:'unset'}}>제목</td>
                        <td colSpan={user.userId !== initialBoard.writer ? 5 : 4} style={{borderRight:'unset'}}>
                            {initialBoard.title}
                        </td>
                        {user.userId === initialBoard.writer && 
                            <td style={{borderInline:'unset'}} ref={(el) =>{itemsRef.current[initialBoard.boardId] = el}}>
                                 <div
                                    className='icon'
                                    style={{position:'relative', width:'16px', height:'16px', marginLeft: 'auto'}}
                                    onClick={(e)=> {
                                            (target === initialBoard.boardId && target) ? setTarget(null) :setTarget(initialBoard.boardId)
                                            setMousePosition(getMousePosition(e))
                                        }}>
                                        <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === initialBoard.boardId &&{color:'orange'}}/>
                                    {target === initialBoard.boardId && <BoardDetailOption  boardId={initialBoard.boardId} position={mousePosition}/>}
                                </div>
                            </td>
                        }
                    </tr>
                    <tr>
                        <td className='table-label' style={{borderLeft:'unset'}}>작성자</td>
                        <td>
                            {initialBoard.writer}
                            <input type='hidden' name='writer' defaultValue={initialBoard.writer} readOnly/>
                        </td>
                        <td className='table-label'>작성일자</td>
                        <td>
                            <span className='ellipsis '>
                                {dayjs(initialBoard.createAt).format('YY.MM.DD A hh:mm:ss')}
                            </span>
                        </td>
                        <td className='table-label'>조회</td>
                        <td style={{textAlign:'center', borderRight:'unset'}}>
                            {views}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={6} style={{paddingBlock: '5px', border:'unset'}}>
                            <div style={{minHeight:'200px', padding:'5px', whiteSpace:'pre-wrap'}}>
                                {initialBoard.content}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label' style={{borderLeft:'unset'}}>첨부된파일</td>
                        <td colSpan={5} style={{padding:'unset', borderRight:'unset'}}>
                            <div className='file-container'>
                                <div className='upload-area'>
                                    <div className='file-list'>
                                        {files.map((file, idx) => (
                                            <div className='file-item' key={idx} ref={(el) =>{itemsRef.current[file.fileId] = el}}>
                                                <div className='file-name-container' title={file.fileName}>{`${file.originalName} (${filesize(file.fileSize,{ round: 2 })}), 다운로드수 : ${file.download}`} </div>
                                                <div
                                                    className='icon'
                                                    style={{position:'relative', width:'16px', height:'16px'}}
                                                    onClick={(e)=> {
                                                            (target === file.fileId && target) ? setTarget(null) :setTarget(file.fileId)
                                                            setMousePosition(getMousePosition(e))
                                                        }}>
                                                        <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === file.fileId &&{color:'orange'}}/>
                                                    {target === file.fileId && <BoardOption fileLink={file.fileLink} position={mousePosition}/>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {files.length === 0 &&
                                        <div>
                                            첨부된 파일이 없습니다.
                                        </div>
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            <table className='borad-control-container'>
                <colgroup>
                    <col style={{width:'15%', minWidth:'70px'}}></col>
                    <col style={{width:'65%'}}></col>
                    <col style={{width:'20%'}}></col>
                </colgroup>
                <tbody >
                    {beforeBoard && 
                        <tr>
                            <td style={{color:'#CC3300'}}>△ 이전글</td>
                            <td onClick={()=>router.push(`/main/board/board/?target=${beforeBoard.boardId}`)}><a>{beforeBoard.title}</a></td>
                            <td style={{textAlign:'right'}}>{beforeBoard.writer}</td>
                        </tr>
                    }
                    {afterBoard && 
                        <tr>
                            <td style={{color:'#336666'}}>▽ 다음글</td>
                            <td onClick={()=>router.push(`/main/board/board/?target=${afterBoard.boardId}`)}><a>{afterBoard.title}</a></td>
                            <td style={{textAlign:'right'}}>{afterBoard.writer}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </section>
    )
}