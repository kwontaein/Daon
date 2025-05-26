import RegisterReceiptPage from "@/app/(register)/register-receipt/page";
import Image from 'next/image';

import '@/styles/_global.scss';
import '@/components/main/sales/receipt/table/receipt-table.scss';

import asideArrow from '@/public/assets/aside-arrow.gif';

import { ModeByProps } from "@/model/types/share/type";
import ReceiptTableBody from '@/components/main/sales/receipt/table/table-body';
import ReceiptTableContainer from '@/components/main/sales/receipt/table/table-header';
import { getReceiptByIds } from "@/features/sales/receipt/api/server-api";
import MobileModal from "@/components/share/mobile-modal/page";

export default async function ReceiptEditPage({searchParams}:{searchParams:Promise<{receiptIds:string}>}){
    const receiptIds = JSON.parse((await searchParams).receiptIds) || []
    const initialReceiptList = await getReceiptByIds(receiptIds)

    return (
        <MobileModal height="550px" closeButton={true}>
            <div className="register-receipt-container">
            <header className="flex-row receipt-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>전표 수정하기</h4>
            </header>
            <main>
                <ReceiptTableContainer isRegister={true}>
                    <ReceiptTableBody initialReceiptList={initialReceiptList} isMobile={true}/>
                </ReceiptTableContainer>
            </main>
            </div>
        </MobileModal>
    );
}
