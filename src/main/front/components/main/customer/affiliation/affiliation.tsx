'use client'
import type {CustomerAffiliation} from '@/model/types/customer/affiliation/type';
import './affiliation.scss';
import useAffiliation from '@/hooks/customer/affiliation/useAffiliation';


export default function Affiliation({InitAffiliation}: { InitAffiliation: CustomerAffiliation[] }) {
    const {
        addInputRef,
        affiliationState,
        mode,
        setMode,
        setAffiliationState,
        addHandler,
        deleteHandler,
        editHandler
    } = useAffiliation(InitAffiliation)

    return (
        <>
            <table className="customer-affiliation-table">
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
                {affiliationState.map((affiliation: CustomerAffiliation, index) => (
                    <tr key={affiliation.customerAffiliationId}>
                        <td>{index + 1}</td>
                        <td className="left-align">
                            {mode === 'edit' ?
                                <input type="text"
                                       className="customer-affiliation-input"
                                       placeholder="소속명을 입력해주세요"
                                       required={true}
                                       value={affiliation.customerAffiliationName}
                                       onChange={(e) =>
                                           setAffiliationState(affiliationState.map((item: CustomerAffiliation, i: number) =>
                                               i === index ? {
                                                   ...item,
                                                   customerAffiliationName: e.target.value
                                               } : item))}/>
                                :
                                <>{affiliation.customerAffiliationName}</>
                            }
                        </td>
                        <td>
                            <button onClick={deleteHandler.bind(null, affiliation)}>삭제</button>
                        </td>
                    </tr>
                ))}
                {mode === 'add' &&
                    <tr>
                        <td>{affiliationState.length + 1}</td>
                        <td className="left-align">
                            <input type="text"
                                   ref={addInputRef}
                                   className="customer-affiliation-input"
                                   placeholder="생성할 소속명을 입력해주세요"/>
                        </td>
                        <td>
                            <button onClick={setMode.bind(null, null)}>삭제</button>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
            <div className='affiliation-button-container'>
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