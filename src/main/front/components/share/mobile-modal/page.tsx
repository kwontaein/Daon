
import '@/styles/_global.scss';


import '@/components/main/sales/receipt/table/receipt-table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function MobileModal({children}:{children:React.ReactNode}){

    return(
        <section className="modal-background" style={{zIndex:1002}}>
            <div className='main' style={{height:'550px'}}>
                <div className='close-button-container'>
                    <button onClick={() => window.history.back()}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
                {children}
            </div>
        </section>
    )
}