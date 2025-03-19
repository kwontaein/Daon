'use client'
import './search-result.scss'
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { addReceiptId, removeReceiptId } from "@/store/slice/receipt-select";
import { RequestReceipt } from '@/model/types/receipt/type';
import { ReceiptCategoryMap } from '@/model/constants/sales/receipt/receipt_constants';


interface ReceiptItemProps{
    receiptList:RequestReceipt[]
    basicIndex: number;
}

export default function ReceiptSearchResult({receiptList, basicIndex}:ReceiptItemProps){


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
            {receiptList.map((receipt: RequestReceipt, index: number) => (
                <tbody key={receipt.receiptId} className={`search-result-container ${index % 2 === 0 ? 'odd-item' : ''}`}>
                    <tr>
                        <td rowSpan={2}>
                            {basicIndex + index + 1}
                        </td>
                        <td rowSpan={2}>
                            <div className="date-container">
                                {isSelected && <input type="checkbox" onChange={receiptSelectHandler.bind(null, receipt.receiptId)} checked={selectList.includes(receipt.receiptId)}/>}
                                <div>{dayjs(receipt.timeStamp).format('YY.M.DD')}</div>
                            </div>
                        </td>
                        <td rowSpan={2}>
                            {ReceiptCategoryMap[receipt.category]}
                        </td>
                        <td className="left-align">{receipt.customerName}</td>
                        <td className="left-align">{receipt.memo}</td>
                        <td className="left-align" colSpan={2}>
                            {receipt.description}
                        </td>
                    </tr>
                    <tr>
                        <td className="left-align">{receipt.productName}</td>
                        <td>{receipt.quantity && Number(receipt.quantity).toLocaleString('ko-KR')}</td>
                        <td className="right-align">{receipt.unitPrice.toLocaleString('ko-KR')}</td>
                        <td className="right-align">{receipt.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                </tbody>
            ))}
        </>
    )
    
}