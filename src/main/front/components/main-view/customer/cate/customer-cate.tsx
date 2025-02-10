'use client'
import {CateMode, CustomerCateType} from "@/types/customer/cate/type";
import './customer-cate.scss';
import Link from "next/link";
import {useState, useRef} from "react";
import {revalidatePath} from "next/cache";

export default function CustomerCate({InitCustomerCate}: { InitCustomerCate: CustomerCateType[] }) {
    const [cateState, setCateState] = useState<CustomerCateType[]>(InitCustomerCate)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)

    const updateCate = async (cates: CustomerCateType[]) => {
        return fetch("http://localhost:8080/api/saveCustomerCate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cates),
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            revalidatePath('customersCate')
        }).catch((error) => {
            console.error('Error:', error)
        })
    }

    const editHandler = () => {
        if (!mode) {
            setMode('edit')
            return
        }
        const postCate = cateState.filter(({customerCateName}, index) =>
            InitCustomerCate[index].customerCateName !== customerCateName)
        const postAble = postCate.every(({customerCateName}) => customerCateName !== '')
        if (postAble) {
            updateCate(postCate).then(() => {
                window.alert('수정이 완료되었습니다.')
                setMode(null)
            })
        } else {
            window.alert('소속명을 입력하세요.')
        }
    }

    const addHandler = () => {
        if (!mode) {
            setMode('add')
            return
        }
        const postAble = addInputRef.current.value !== ''
        if (postAble) {
            updateCate([{customerCateId: null, customerCateName: addInputRef.current.value}])
                .then(() => {
                    window.alert('저장이 완료되었습니다.')
                    setMode(null)
                })
        } else {
            window.alert('소속명을 입력하세요.')
        }
    }
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
                {cateState.map((cate: CustomerCateType, index) => (
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
                                           setCateState(cateState.map((item: CustomerCateType, i: number) =>
                                               i === index ? {...item, customerCateName: e.target.value} : item))}
                                />
                                :
                                <>{cate.customerCateName}</>
                            }
                        </td>
                        <td>
                            <button>삭제</button>
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