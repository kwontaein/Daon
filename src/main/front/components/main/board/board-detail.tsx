'use client'
import '@/styles/form-style/form.scss'
import './file.scss';

import React, {MouseEvent, useActionState, useEffect, useRef, useState} from 'react';
import BoardAction from '@/features/board/actions/boardActions';
import {useRouter} from 'next/navigation';
import dayjs from 'dayjs';
import { BoardFile, ResponseBoard } from '@/model/types/board/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import BoardOption from './options';
import { ClientMousePosition } from '@/model/types/share/type';
import { after } from 'next/server';

export default function BoardDetail({initialBoard, beforeBoard, afterBoard} : {
    initialBoard: ResponseBoard,
    beforeBoard?: ResponseBoard,
    afterBoard?: ResponseBoard
}) {
    const [files, setFiles] = useState<BoardFile[]>([]);
    const formRef = useRef(null)
    const [state, action, isPending] = useActionState(BoardAction, initialBoard ?? {})
    const MemoizedFontAwesomeIcon = React.memo(FontAwesomeIcon);
    const {itemsRef, target,setTarget} = useItemSelection(true)
    const [mousePosition, setMousePosition] = useState<ClientMousePosition|null>(null)
   

    const getMousePosition = (
        e: MouseEvent<HTMLDivElement>,
    ) => {
        e.preventDefault();
        const tableRect = e.currentTarget.getBoundingClientRect();
        return(
            { x:tableRect.left-30, y:tableRect.top+20 }
        )
    };


    const router = useRouter()

    useEffect(()=>{
        if(initialBoard.files.length===0) return
        setFiles(initialBoard.files)
    },[initialBoard])

    
    return (
        <section style={{maxWidth: '700px', width: '100%', position:'relative'}}>
            <form action={action} ref={formRef}>
                <table className='register-form-table' style={{fontSize: '1rem', marginTop: '1rem', tableLayout:'fixed'}}>
                    <colgroup>
                        <col style={{width: '8%', minWidth:'90px'}}/>
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
                        <td colSpan={5} style={{borderRight:'unset'}}>
                            {state.title}
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label' style={{borderLeft:'unset'}}>작성자</td>
                        <td>
                            {state.writer}
                            <input type='hidden' name='writer' defaultValue={state.writer} readOnly/>
                        </td>
                        <td className='table-label'>작성일자</td>
                        <td>
                            <span className='ellipsis '>
                                {dayjs(state.createAt).format('YY.MM.DD A hh:mm:ss')}
                            </span>
                        </td>
                        <td className='table-label'>조회</td>
                        <td style={{textAlign:'center', borderRight:'unset'}}>
                            {state.views}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={6} style={{paddingBlock: '5px', border:'unset'}}>
                            <div style={{minHeight:'200px', padding:'5px'}}>
                                {state.content}
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
                                                <div className='file-name-container' title={file.fileName}><b>{file.fileName}</b></div>
                                                <div
                                                    className='icon'
                                                    style={{position:'relative'}}
                                                    onClick={(e)=> {
                                                            (target === file.fileId && target) ? setTarget(null) :setTarget(file.fileId)
                                                            setMousePosition(getMousePosition(e))
                                                            setTarget(file.fileId);
                                                        }}>
                                                        <MemoizedFontAwesomeIcon icon={faEllipsis} style={target === file.fileId &&{color:'orange'}}/>
                                                    {target === file.fileId && <BoardOption fileId={file.fileId} boardId={file.boardId} position={mousePosition}/>}
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
            </form>
            <table className='borad-control-container'>
                <colgroup>
                    <col style={{width:'10%', minWidth:'70px'}}></col>
                    <col style={{width:'70%'}}></col>
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