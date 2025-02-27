'use client'
import type { StockPoint } from '@/model/types/stock/point/types';
import './point.scss';
import useStockPoint from "@/hooks/stock/point/useStockPoint";


export default function StockPoint({InitStockPoint}: { InitStockPoint: StockPoint[] }) {
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
            <table className="stock-point-table">
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
                {pointState.map((point: StockPoint, index) => (
                    <tr key={point.stockPointId}>
                        <td>{index + 1}</td>
                        <td className="left-align">
                            {mode === 'edit' ?
                                <input type="text"
                                       className="stock-point-input"
                                       placeholder="품목명을 입력해주세요"
                                       required={true}
                                       value={point.stockPointName}
                                       onChange={(e) =>
                                           setPointState(pointState.map((item: StockPoint, i: number) =>
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
                {mode === 'add' &&
                    <tr>
                        <td>{pointState.length + 1}</td>
                        <td className="left-align">
                            <input type="text"
                                   ref={addInputRef}
                                   className="stock-point-input"
                                   placeholder="생성할 품목명을 입력해주세요"/>
                        </td>
                        <td>
                            <button onClick={setMode.bind(null, null)}>삭제</button>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
            <div className='point-button-container'>
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