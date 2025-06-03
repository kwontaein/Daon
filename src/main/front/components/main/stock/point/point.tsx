'use client'
import type { StockPoint as StockPointType } from '@/model/types/stock/point/types';
import '@/styles/table-style/category.scss'
import useStockPoint from "@/hooks/stock/point/useStockPoint";


export default function StockPoint({InitStockPoint}: { InitStockPoint: StockPointType[] }) {
    const { addInputRef, 
            pointState,
            mode,
            setMode,
            setPointState,
            addHandler,
            deleteHandler,
            editHandler
        } = useStockPoint(InitStockPoint)

    return (
        <>
            <p style={{color:'red', fontSize:'13px', marginBottom:'5px'}}>※ 입력하신 적립율을 품목소비가에 적용하게 됩니다.</p>
            <table className="category-table">
                <colgroup>
                    <col style={{width: '10%'}}/>
                    <col style={{width: '60%'}}/>
                    <col style={{width: '10%'}}/>
                </colgroup>
                <thead>
                <tr>
                    <td>순번</td>
                    <td>구매적립금율</td>
                    <td>관리</td>
                </tr>
                </thead>
                <tbody>
                {pointState.map((point: StockPointType, index) => (
                    <tr key={point.stockPointId}>
                        <td>{index + 1}</td>
                        <td className="left-align">
                            {mode === 'edit' ?
                                <input type="text"
                                       className="category-input"
                                       placeholder="품목명을 입력해주세요"
                                       required={true}
                                       value={point.stockPointName}
                                       onChange={(e) =>
                                           setPointState((prev)=>prev.map((item: StockPointType, i: number) =>
                                               i === index ? {...item, stockPointName: e.target.value} : item))}/>
                                :
                                <>{point.stockPointName}</>
                            }
                        </td>
                        <td>
                            <button onClick={deleteHandler.bind(null,point)}>삭제</button>
                        </td>
                    </tr>
                ))}
                {(mode !== 'add' && pointState.length===0) &&
                    <tr>
                        <td colSpan={3}>
                            <p>등록된 구매적립금설정이 없습니다.</p>
                        </td>
                    </tr>
                }
                {mode === 'add' &&
                    <tr>
                        <td>{pointState.length + 1}</td>
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