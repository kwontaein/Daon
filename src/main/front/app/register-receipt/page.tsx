'use client';
import Image from 'next/image';

import '@/styles/_global.scss';
import '@/components/main-view/sales/receipt/table/table-header.scss';

import asideArrow from '@/assets/aside-arrow.gif';
import ReceiptTableBody from '@/components/main-view/sales/receipt/table/table-body';
import ReceiptTableHeader from '@/components/main-view/sales/receipt/table/table-header';

export default function RegisterReceiptPage() {
    

    return (
            <div className="receipt-container">
            <header className="flex-row">
                <Image src={asideArrow} alt=">" />
                <h4>전표입력</h4>
            </header>
            <main>
                <ReceiptTableHeader>
                    <ReceiptTableBody/>
                </ReceiptTableHeader>
            </main>
            </div>
    );
}
