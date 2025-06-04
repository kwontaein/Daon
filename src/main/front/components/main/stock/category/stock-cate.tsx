'use client'
import type { StockCate as StockCateType } from '@/model/types/stock/cate/type';
import '@/styles/table-style/category.scss';
import useStockCate from "@/hooks/stock/cate/useStockCate";


export default function StockCate({InitStockCate}: { InitStockCate: StockCateType[] }) {
    const { addInputRef, 
            cateState,
            mode,
            setMode,
            setCateState,
            addHandler,
            deleteHandler,
            editHandler
        } = useStockCate(InitStockCate)

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
                {cateState.map((cate: StockCateType, index) => (
                    <tr key={cate.stockCateId}>
                        <td>{index + 1}</td>
                        <td className="left-align">
                            {mode === 'edit' ?
                                <input type="text"
                                       className="category-input"
                                       placeholder="품목명을 입력해주세요"
                                       required={true}
                                       value={cate.stockCateName}
                                       onChange={(e) =>
                                           setCateState(cateState.map((item: StockCateType, i: number) =>
                                               i === index ? {...item, stockCateName: e.target.value} : item))}/>
                                :
                                <>{cate.stockCateName}</>
                            }
                        </td>
                        <td>
                            <button onClick={deleteHandler.bind(null,cate)}>삭제</button>
                        </td>
                    </tr>
                ))}
                {(mode !== 'add' && cateState.length===0) &&
                    <tr>
                        <td colSpan={3}>
                            <p>등록된 품목이 없습니다.</p>
                        </td>
                    </tr>
                }
                {mode === 'add' &&
                    <tr>
                        <td>{cateState.length + 1}</td>
                        <td className="left-align">
                            <input type="text"
                                   ref={addInputRef}
                                   className="category-input"
                                   placeholder="생성할 품목명을 입력해주세요"/>
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