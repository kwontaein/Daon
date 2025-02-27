'use client'
import './search-result.scss'
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { addReceiptId, removeReceiptId } from "@/store/slice/receipt-select";
import { Receipt } from '@/model/types/receipt/type';


interface ReceiptItemProps{
    receiptList:Receipt[]
    basicIndex: number;
}

export default function ReceiptSearchResult({receiptList, basicIndex}:ReceiptItemProps){
    const keyOfAccount ={
        sales: '매출',
        purchase: '매입',
        deposit: '입금',
        withdrawal: '출금',
        sale_discount: '매출할인',
        purchase_discount: '매입할인',
        cost: '관리비',
        return_delivery: '반품출고', 
        sales_replacement: '매출대체',
        returned_received: '반품입고'
    }

    const {selectList, isSelected} = useSelector((state:RootState) => state.receiptSelector);
    const dispatch = useDispatch()

    
    const receiptSelectHandler = (uuid:string)=>{
        if(selectList.includes(uuid)){
            dispatch(removeReceiptId(uuid));
        }else{
            dispatch(addReceiptId(uuid))
        }
    }
    return (
        <>
            {receiptList.map((receipt: Receipt, index: number) => (
                <tbody key={receipt.uuid} className={`search-result-container ${index % 2 === 0 ? 'odd-item' : ''}`}>
                    <tr>
                        <td rowSpan={2}>
                            {basicIndex + index + 1}
                        </td>
                        <td rowSpan={2}>
                            <div className="date-container">
                                {isSelected && <input type="checkbox" onChange={receiptSelectHandler.bind(null, receipt.uuid)} checked={selectList.includes(receipt.uuid)}/>}
                                <div>{dayjs(receipt.date).format('YY.M.DD')}</div>
                            </div>
                        </td>
                        <td rowSpan={2}>
                            {keyOfAccount[receipt.account]}
                        </td>
                        <td className="left-align">{receipt.company}</td>
                        <td className="left-align">{receipt.note}</td>
                        <td className="left-align" colSpan={2}>
                            {receipt.briefs}
                        </td>
                    </tr>
                    <tr>
                        <td className="left-align">{receipt.product}</td>
                        <td>{receipt.quantity && Number(receipt.quantity).toLocaleString('ko-KR')}</td>
                        <td className="right-align">{receipt.unit_price && Number(receipt.unit_price).toLocaleString('ko-KR')}</td>
                        <td className="right-align">{receipt.amount && Number(receipt.amount).toLocaleString('ko-KR')}</td>
                    </tr>
                </tbody>
            ))}
        </>
    )
    
}