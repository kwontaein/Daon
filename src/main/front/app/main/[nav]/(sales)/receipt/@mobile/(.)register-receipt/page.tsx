'use client';

import '@/styles/_global.scss'
import '@/styles/_global.scss';

import Image from 'next/image';

import '@/components/main/sales/receipt/table/receipt-table.scss';

import asideArrow from '@/assets/aside-arrow.gif';
import ReceiptTableBody from '@/components/main/sales/receipt/table/table-body';
import ReceiptTableContainer from '@/components/main/sales/receipt/table/table-header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function RegisterReceipt(){
    
    return(
        <section className="modal-background" style={{zIndex:1002}}>
            <div className='main' style={{height:'50%'}}>
                <div className='close-button-container'>
                    <button onClick={() => window.history.back()}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
                <div className="register-receipt-container">
                <header className="flex-row receipt-header">
                    <Image src={asideArrow} alt=">" width={15}/>
                    <h4>전표입력</h4>
                </header>
                <main>
                    <ReceiptTableContainer isRegister={true}>
                        <ReceiptTableBody/>
                    </ReceiptTableContainer>
                </main>
                </div>
            </div>
        </section>
    )
}