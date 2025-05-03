'use client'
import '@/styles/_global.scss';

import '@/components/main/sales/receipt/table/receipt-table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function MobileModal({
    children,
    height = 'fit-content',
    width='90%',
    notClosedButton,
    zIndex=1002
} : {
    children: React.ReactNode,
    height?: string|'fit-content',
    width?:string,
    notClosedButton?: boolean
    zIndex?:number
}) {

    return(
        <section className="modal-background" style={{zIndex}}>
            <div className='main' style={{height,width}}>
                {!notClosedButton && 
                <div className='close-button-container'>
                    <button onClick={() => window.history.back()}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
                }
                {children}
            </div>
        </section>
    )
}