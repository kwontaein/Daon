'use client'
import type { StaffCate } from '@/types/staff/cate/type';
import './staff-cate.scss';
import useStaffCate from "@/hooks/staff/cate/useStaffCate";


export default function StaffCate({InitStaffCate}: { InitStaffCate: StaffCate[] }) {
    const { addInputRef, 
            cateState,
            mode,
            setMode,
            setCateState,
            addHandler,
            deleteHandler,
            editHandler
        } = useStaffCate(InitStaffCate)

    return (
        <>
            <table className="staff-cate-table">
                <colgroup>
                    <col style={{width: '10%'}}/>
                    <col style={{width: '60%'}}/>
                    <col style={{width: '10%'}}/>
                </colgroup>
                <thead>
                <tr>
                    <td>순번</td>
                    <td>소속명</td>
                    <td>관리</td>
                </tr>
                </thead>
                <tbody>
                {cateState.map((cate: StaffCate, index) => (
                    <tr key={cate.staffCateId}>
                        <td>{index + 1}</td>
                        <td className="left-align">
                            {mode === 'edit' ?
                                <input type="text"
                                       className="staff-cate-input"
                                       placeholder="부서명을 입력해주세요"
                                       required={true}
                                       value={cate.staffCateName}
                                       onChange={(e) =>
                                           setCateState(cateState.map((item: StaffCate, i: number) =>
                                               i === index ? {...item, staffCateName: e.target.value} : item))}/>
                                :
                                <>{cate.staffCateName}</>
                            }
                        </td>
                        <td>
                            <button onClick={deleteHandler.bind(null,cate)}>삭제</button>
                        </td>
                    </tr>
                ))}
                {mode === 'add' &&
                    <tr>
                        <td>{cateState.length + 1}</td>
                        <td className="left-align">
                            <input type="text"
                                   ref={addInputRef}
                                   className="staff-cate-input"
                                   placeholder="생성할 부서명을 입력해주세요"/>
                        </td>
                        <td>
                            <button onClick={setMode.bind(null, null)}>삭제</button>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
            <div className='cate-button-container'>
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