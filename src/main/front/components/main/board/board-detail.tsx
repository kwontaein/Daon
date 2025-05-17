'use client'
import AutoResizeTextArea from '@/components/share/auto-resize-textarea';
import {useUserInformation} from '@/store/zustand/userInfo'
import '@/styles/form-style/form.scss'
import './file.scss';

import {useActionState, useRef, useState} from 'react';
import BoardAction from '@/features/board/actions/boardActions';
import {useRouter} from 'next/navigation';
import dayjs from 'dayjs';

export default function BoardDetail({initialBoard}) {
    const [files, setFiles] = useState<File[]>([]);
    const formRef = useRef(null)
    const [state, action, isPending] = useActionState(BoardAction, initialBoard ?? {})
    const router = useRouter()

    return (
        <section style={{maxWidth: '700px', width: '100%'}}>
            <form action={action} ref={formRef}>
                <table className='register-form-table' style={{fontSize: '1rem', marginTop: '1rem', tableLayout:'fixed'}}>
                    <colgroup>
                        <col style={{width: '8%', minWidth:'90px'}}/>
                        <col style={{width: '25%'}}/>
                        <col style={{width: '8%', minWidth:'90px'}}/>
                        <col style={{width: '25%'}}/>
                        <col style={{width: '25', }}/>
                        <col style={{width: '8%' , minWidth:'80px'}}/>
                    </colgroup>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className='table-label'>제목</td>
                        <td colSpan={5}>
                            {state.title}
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>작성자</td>
                        <td>
                            {state.writer}
                            <input type='hidden' name='writer' defaultValue={state.writer} readOnly/>
                        </td>
                        <td className='table-label'>작성일자</td>
                        <td colSpan={2}>
                            {dayjs(state.createAt).format('YY.MM.DD A hh:mm:ss')}
                        </td>
                        <td className='table-label' style={{textAlign:'left'}}>
                            조회: {state.views}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={6} style={{paddingBlock: '5px'}}>
                            <AutoResizeTextArea
                                name='content'
                                defaultValue={state.content}/>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>첨부된파일</td>
                        <td colSpan={5}>
                            <div className='file-container'>
                                <div className='upload-area'>
                                    <div className='file-list'>
                                        {files.map((file, idx) => (
                                            <div className='file-item' key={idx}>
                                                <div className='file-name-container' title={file.name}>{file.name}</div>
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
        </section>
    )
}