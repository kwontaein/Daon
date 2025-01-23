import Image from 'next/image';

import '@/styles/_global.scss';
import '@/components/main-view/sales/receipt/table/table-header.scss';

import asideArrow from '@/assets/aside-arrow.gif';
import ReceiptTableBody from '@/components/main-view/sales/receipt/table/table-body';
import ReceiptTableContainer from '@/components/main-view/sales/receipt/table/table-header';

export default function RegisterReceiptPage() {
    

    return (
            <div className="register-receipt-container">
            <header className="flex-row receipt-header">
                <Image src={asideArrow} alt=">" />
                <h4>전표입력</h4>
            </header>
            <main>
                <ReceiptTableContainer>
                    <ReceiptTableBody/>
                </ReceiptTableContainer>
            </main>
            </div>
    );
}
