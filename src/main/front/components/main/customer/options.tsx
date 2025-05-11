'use client'
import '@/styles/options/options.scss';
import useRouterPath from '@/hooks/share/useRouterPath';
import { useModalState } from '@/store/zustand/modal';
import { useRouter } from 'next/navigation';

export default function CustomerOptions({customerId, customerName}:{customerId:string,customerName:string}){
    const {setModalState} = useModalState()
    const redirect = useRouterPath()
    const router = useRouter()

    const viewCustomerHandler = (customerId:string)=>{
        
        const params = new URLSearchParams({
            mode: "detail",
            target: customerId,
            });

        if(window.innerWidth>620){
            const url = `/customer?${params.toString()}`;
            const popupOptions = "width=700,height=600,scrollbars=yes,resizable=yes"; 
            window.open(url, "PopupWindow", popupOptions);
        }
        redirect(`customer?${params.toString()}`)
    }

    const searchCustomerLedger =()=>{
        setModalState({customer:{customerId, customerName}})
        router.push('/main/ledger/ledger-customer')
    }
    return(
        <menu className='options-container'>
            <li onClick={searchCustomerLedger}>원장조회</li>
            <li onClick={viewCustomerHandler.bind(null,customerId)}>상세보기</li>
        </menu>    
    )
}