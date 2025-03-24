'use client'
import type { Dept } from '@/model/types/staff/dept/type';
import '@/styles/table-style/category.scss'
import useDept from '@/hooks/staff/dept/useDept';


export default function Dept({InitDept}: { InitDept: Dept[] }) {
    const { addInputRef, 
            deptState,
            mode,
            setMode,
            setDeptState,
            addHandler,
            deleteHandler,
            editHandler
        } = useDept(InitDept)

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
                    <td>소속명</td>
                    <td>관리</td>
                </tr>
                </thead>
                <tbody>
                {deptState.map((dept: Dept, index) => (
                    <tr key={dept.deptId}>
                        <td>{index + 1}</td>
                        <td className="left-align">
                            {mode === 'edit' ?
                                <input type="text"
                                       className="category-input"
                                       placeholder="부서명을 입력해주세요"
                                       required={true}
                                       value={dept.deptName}
                                       onChange={(e) =>
                                           setDeptState(deptState.map((item: Dept, i: number) =>
                                               i === index ? {...item, DeptName: e.target.value} : item))}/>
                                :
                                <>{dept.deptName}</>
                            }
                        </td>
                        <td>
                            <button onClick={deleteHandler.bind(null,dept)}>삭제</button>
                        </td>
                    </tr>
                ))}
                {mode === 'add' &&
                    <tr>
                        <td>{deptState.length + 1}</td>
                        <td className="left-align">
                            <input type="text"
                                   ref={addInputRef}
                                   className="category-input"
                                   placeholder="생성할 부서명을 입력해주세요"/>
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