import Image from 'next/image';

import '@/styles/_global.scss';
import '@/components/main/sales/receipt/table/receipt-table.scss';

import asideArrow from '@/public/assets/aside-arrow.gif';
import ReceiptTableBody from '@/components/main/sales/receipt/table/table-body';
import ReceiptTableContainer from '@/components/main/sales/receipt/table/table-header';

export default function RegisterReceiptPage() {
    

    return (
            <div className="register-receipt-container">
            <header className="flex-row receipt-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>전표입력</h4>
            </header>
            <ReceiptTableContainer isRegister={true}>
                <ReceiptTableBody/>
            </ReceiptTableContainer>
            </div>
    );
}
