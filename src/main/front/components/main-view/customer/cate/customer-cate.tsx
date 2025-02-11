'use client'
import {CateMode, CustomerCateType} from "@/types/customer/cate/type";
import './customer-cate.scss';
import {useState, useRef} from "react";
import {v4 as uuidv4} from "uuid";

import { deleteCateApi, updateCateApi } from "@/hooks/customer/cate/updateCateApi";
import { useConfirm } from "@/hooks/share/useConfrim";


export default function CustomerCate({InitCustomerCate}: { InitCustomerCate: CustomerCateType[] }) {
    const [cateState, setCateState] = useState<CustomerCateType[]>(InitCustomerCate)
    const [mode, setMode] = useState<CateMode>(null)
    const addInputRef = useRef<HTMLInputElement>(null)


    const editHandler = () => {
        if (!mode) {
            setMode('edit')
            return
        }
        const postCate = cateState.filter(({customerCateName}, index) =>
            InitCustomerCate[index].customerCateName !== customerCateName)
        const postAble = postCate.every(({customerCateName}) => customerCateName !== '')
        if (postCate.length>0 && postAble) {
            updateCateApi(postCate).then((status) => {
                if(status === 200){
                     window.alert('수정이 완료되었습니다.')
                     setMode(null)
                }
            })
        } else if(postCate.length>0 && !postAble){
            window.alert('소속명을 입력하세요.')
        }else{
            setMode(null)
        }
    }

    const addHandler = () => {
        if (!mode) {
            setMode('add')
            return
        }
        const postAble = addInputRef.current.value !== ''
        if (postAble) {
            const uuid = uuidv4()
            updateCateApi([{customerCateId: uuid, customerCateName: addInputRef.current.value}])
                .then((status) => {
                    if(status === 200){
                        window.alert('수정이 완료되었습니다.')
                        setMode(null)
                   }
                })
        }else {
            window.alert('소속명을 입력하세요.')
        }
    }

    const deleteHandler=(cate:CustomerCateType)=>{
        const isPost = useConfirm('정말로 삭제하시겠습니까?', ()=>deleteCateApi(cate),()=>{})
        if(isPost) window.alert('삭제가 완료되었습니다.')
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