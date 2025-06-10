'use client'
import AutoResizeTextArea from '@/components/share/auto-resize-textarea';
import {useUserInformation} from '@/store/zustand/userInfo'
import '@/styles/form-style/form.scss'
import './file.scss';

import {startTransition, useActionState, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import BoardAction from '@/features/board/actions/boardActions';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {ResponseBoard} from '@/model/types/board/type';

export default function RegisterBoard({initialBoard, mode}: { initialBoard: ResponseBoard, mode: 'write' | 'edit' }) {
    const {user} = useUserInformation()
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef(null);
    const formRef = useRef(null)

    const [state, action, isPending] = useActionState(BoardAction, {email: user.email, ...initialBoard ?? {}})
    const [initialFiles, setInitialFiles] = useState(initialBoard?.files ?? [])
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const deleteMode = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("mode");
        // 기존 pathname 유지
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const submitHandler = () => {
        const formData = new FormData(formRef.current);
        const title = formData.get('title').toString().trim()
        const content = formData.get('content').toString().trim()
        if (!title) {
            window.alert('제목을 입력해주세요.')
            return
        } else if (!content) {
            window.alert('내용을 입력해주세요.')
            return
        }
        formData.set('action', mode);
        startTransition(() => {
            action(formData);
        });
    }

    useEffect(() => {
        if (state.status) {
            if (state.status === 200) {
                if (mode === 'write') {
                    window.alert('저장이 완료되었습니다.')
                    router.replace('/main/board/board')
                } else if (mode === 'edit') {
                    window.alert('수정 완료되었습니다.')
                    deleteMode()
                }
            } else {
                window.alert('알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }
    }, [state])

    return (
        <section style={{maxWidth: '700px', width: '100%'}}>
            <form action={action} ref={formRef}>
                <table className='register-form-table'
                       style={{fontSize: '1rem', marginTop: '1rem', tableLayout: 'fixed'}}>
                    <colgroup>
                        <col style={{width: '12%', minWidth: '75.5px'}}/>
                        <col style={{width: '28%'}}/>
                        <col style={{width: '8%'}}/>
                        <col style={{width: '12%', minWidth: '75.5px'}}/>
                        <col style={{width: '28%'}}/>
                        <col style={{width: '12%', minWidth: '75.5px'}}/>
                    </colgroup>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className='table-label'>공지기능</td>
                        <td colSpan={5}>
                            <div style={{display: 'flex'}}>
                                <input
                                    type='checkbox'
                                    name='notice'
                                    value='notice'
                                    defaultChecked={state.notice === 'notice'}
                                    style={{width: 'fit-content', marginRight: '5px'}}/>
                                <p>* 게시판 상단에 위치하도록 게시판 공지글로 지정합니다.</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>작성자</td>
                        <td colSpan={2}>
                            {user.name}
                            <input type='hidden' name='writer' value={user.userId ?? ''} readOnly/>
                            <input type='hidden' name='views' defaultValue={state.views ?? 0}/>
                        </td>
                        <td className='table-label'>이메일</td>
                        <td colSpan={2}>
                            <input name='email'
                                   defaultValue={state.email}
                                   key={state.email + 'email'}/>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>제목</td>
                        <td colSpan={5}>
                            <input name='title'
                                   defaultValue={state.title}
                                   key={state.title + 'title'}
                                   placeholder='제목을 입력해주세요.'/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} style={{paddingBlock: '5px'}}>
                            <AutoResizeTextArea
                                name='content'
                                placeholder='내용을 작성해주세요.'
                                defaultValue={state.content}/>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>첨부파일</td>
                        <td colSpan={4}>
                            <div className='file-container'>
                                <div className='upload-area'>
                                    <div className='file-list'>
                                        {initialFiles.map((file, idx) => (
                                            <div className='file-item' key={'initialFiles' + idx}>
                                                <div className='file-name-container'
                                                     title={file.originalName}>{file.originalName}</div>
                                                <input type='hidden' name='existingFileIds' value={file.fileId}
                                                       readOnly/>
                                                <button
                                                    onClick={() => setInitialFiles((prev) => prev.filter(({originalName}) => originalName !== file.originalName))}
                                                    className='removeBtn'>
                                                    <FontAwesomeIcon icon={faXmark}/>
                                                </button>
                                            </div>
                                        ))}
                                        {files.map((file, idx) => (
                                            <div className='file-item' key={'files' + idx}>
                                                <div className='file-name-container' title={file.name}>{file.name}</div>
                                                <button onClick={() => removeFile(idx)} className='removeBtn'>
                                                    <FontAwesomeIcon icon={faXmark}/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {(files.length === 0 && initialFiles.length === 0) &&
                                        <div>
                                            첨부된 파일이 없습니다.
                                        </div>
                                    }
                                </div>
                            </div>
                        </td>
                        <td>
                            <button type='button' onClick={handleButtonClick} style={{width: '100%'}}>파일 첨부
                            </button>
                            <input ref={fileInputRef}
                                   type="file"
                                   name={files.length > 0 ? "files" : ''}
                                   id="file-upload"
                                   multiple
                                   onChange={handleFileChange} style={{width: 'fit-content', display: 'none'}}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
            <div className='button-container' style={{justifyContent: 'right'}}>
                <button onClick={submitHandler} disabled={isPending}>저장</button>
                <button onClick={() => router.push('/main/board/board')}>취소</button>
            </div>
        </section>
    )
}