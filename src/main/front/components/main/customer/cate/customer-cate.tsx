'use client'
import type { CustomerCate } from '@/model/types/customer/cate/type';
import './customer-cate.scss';
import useCustomerCate from "@/hooks/customer/cate/useCustomerCate";


export default function CustomerCate({InitCustomerCate}: { InitCustomerCate: CustomerCate[] }) {
    const { addInputRef, 
            cateState,
            mode,
            setMode,
            setCateState,
            addHandler,
            deleteHandler,
            editHandler
        } = useCustomerCate(InitCustomerCate)

    return (
        <>
            <table className="customer-cate-table">
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
                {cateState.map((cate: CustomerCate, index) => (
                    <tr key={cate.customerCateId}>
                        <td>{index + 1}</td>
                        <td className="left-align">
                            {mode === 'edit' ?
                                <input type="text"
                                       className="customer-cate-input"
                                       placeholder="소속명을 입력해주세요"
                                       required={true}
                                       value={cate.customerCateName}
                                       onChange={(e) =>
                                           setCateState(cateState.map((item: CustomerCate, i: number) =>
                                               i === index ? {...item, customerCateName: e.target.value} : item))}/>
                                :
                                <>{cate.customerCateName}</>
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
                                   className="customer-cate-input"
                                   placeholder="생성할 소속명을 입력해주세요"/>
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