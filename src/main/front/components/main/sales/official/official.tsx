'use client'
import '@/styles/table-style/category.scss'
import useOfficial from '@/hooks/sales/official/useOfficial';
import type { Official } from '@/model/types/receipt/type';


export default function OfficialCate({officials}: { officials: Official[] }) {
    const { 
            addInputRef, 
            officialState,
            mode,
            setMode,
            setOfficialState,
            addHandler,
            deleteHandler,
            editHandler} = useOfficial(officials)

    return (
        <>
            <table className="category-table">
                <colgroup>
                    <col style={{width: '10%'}}/>
                    <col style={{width: '60%'}}/>
                    <col style={{width: '10%'}}/>
                </colgroup>
                <thead>
                <tr>
                    <td>순번</td>
                    <td>관리비명</td>
                    <td>관리</td>
                </tr>
                </thead>
                <tbody>
                {officialState.map((official: Official, index) => (
                    <tr key={official.officialId}>
                        <td>{index + 1}</td>
                        <td className="left-align">
                            {mode === 'edit' ?
                                <input type="text"
                                       className="category-input"
                                       placeholder="관리비명을 입력해주세요"
                                       required={true}
                                       value={official.officialName}
                                       onChange={(e) =>
                                        setOfficialState(officialState.map((item: Official, i: number) =>
                                               i === index ? {
                                                   ...item,
                                                   officialName: e.target.value
                                               } : item))}/>
                                :
                                <>{official.officialName}</>
                            }
                        </td>
                        <td>
                            <button onClick={deleteHandler.bind(null, official)}>삭제</button>
                        </td>
                    </tr>
                ))}
                {mode === 'add' &&
                    <tr>
                        <td>{officialState.length + 1}</td>
                        <td className="left-align">
                            <input type="text"
                                   ref={addInputRef}
                                   className="category-input"
                                   placeholder="생성할 소속명을 입력해주세요"/>
                        </td>
                        <td>
                            <button onClick={setMode.bind(null, null)}>삭제</button>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
            <div className='category-button-container'>
                {mode !== "edit" &&
                    <button onClick={addHandler}>
                        {mode === 'add' ? '저장하기' : '추가하기'}
                    </button>
                }
                {mode !== "add" &&
                    <button onClick={editHandler}>
                        {mode === 'edit' ? '수정완료' : '수정하기'}
                    </button>
                }
            </div>
        </>
    )
}