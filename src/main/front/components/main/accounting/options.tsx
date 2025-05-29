'use client'
import '@/styles/options/options.scss';
import {AccountingDivision} from '@/model/types/accounting/type';
import {deleteAccountingApi} from '@/features/accounting/api/client-api';
import useRouterPath from '@/hooks/share/useRouterPath';
import {transAccountingToReceipt} from "@/features/accounting/api/search-server-api";
import { selectConfrim } from '@/hooks/share/selectConfrim';

export default function AccountingOptions({id, division, paidDate}: {
    id: string,
    division: keyof typeof AccountingDivision,
    paidDate?: Date
}) {
    const redirect = useRouterPath()

    const viewAccountingHandler = () => {
        const params = new URLSearchParams({
            mode: 'edit',
            target: id,
            division,
        });

        if (window.innerWidth > 620) {
            const url = `/accounting?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes";
            window.open(url, "accountingView", popupOptions);
        } else {
            redirect(`accounting?${params.toString()}`)    
        }
    }

    const deleteAccountingHandler = () => {
        const onDelete = () => {
            deleteAccountingApi(division, id)
        }
        selectConfrim('정말로 삭제하시겠습니까?', onDelete)
    }

    const transReceiptHandler = () => {
        if(paidDate){
            const onTrans = async () => {
                await transAccountingToReceipt(division, id).then((res) => {
                    if (res === 200) {
                        window.alert( "전환이 취소되었습니다.")
                    }
                })
            }
            selectConfrim('입금전환을 하시겠습니까?', onTrans)
        }else{
            const params = new URLSearchParams({
                target: id,
                division,
            });
    
            if (window.innerWidth > 620) {
                const url = `/trans-paid?${params.toString()}`;
                const popupOptions = "width=600,height=300,scrollbars=yes,resizable=yes";
                window.open(url, "transPaid", popupOptions);
            } else {
                redirect(`trans-paid?${params.toString()}`)    
            }
        }
        
    }
    return (
        <menu className='options-container'>
            {paidDate !== undefined &&
                <li style={{color: `${paidDate ? 'red' : 'blue'}`}}
                    onClick={transReceiptHandler}>{paidDate ? '전환취소' : '입금전환'}</li>
            }
            <li onClick={viewAccountingHandler}>수정</li>
            <li onClick={deleteAccountingHandler} className='delete-option'>삭제</li>
        </menu>
    )
}