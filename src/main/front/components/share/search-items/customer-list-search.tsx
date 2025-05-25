'use client'
import '@/styles/table-style/search-result.scss';
import '@/styles/form-style/form.scss';
import '@/styles/_global.scss'
import { ResponseCustomer } from '@/model/types/customer/customer/type';
import asideArrow from '@/public/assets/aside-arrow.gif';

import Pagination from '../pagination';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import useCheckBoxState from '@/hooks/share/useCheckboxState';
import { useRouter } from 'next/navigation';
import useDeletePage from '@/hooks/share/useDeletePage';
import { useModalState } from '@/store/zustand/modal';


export default function CustomerListSearch({initialcustomers, page, isMobile=false} : {
    initialcustomers: ResponseCustomer[],
    page: number,
    isMobile?:boolean
}) {

    const [customers, setCustomers] = useState([])
    const customerIds = useMemo(()=>customers.map(({customerId})=>customerId),[customers])
    const {checkedState,isAllChecked, update_checked, toggleAllChecked} = useCheckBoxState(customerIds)
    const inputRef = useRef<HTMLInputElement|null>(null)
    const count = isMobile? 10: 20
    const pageByCustomers = useMemo(()=> customers.slice((page-1)*count, ((page-1)*count)+count) ,[customers,page])

    const deletePage = useDeletePage()
    const router =useRouter()
    const {searchKeyword, setModalState} = useModalState();

    const searchHandler = () =>{
        const newCustomers = initialcustomers.filter(({customerName})=>customerName.includes(inputRef.current.value))
        setModalState({modalPage:1})
        setCustomers(newCustomers)
        deletePage()
    }

    useEffect(()=>{
        setCustomers(initialcustomers)
    },[initialcustomers])


    const selectValue = () => {
        const postData = customers
            .filter(({customerId}) => checkedState[customerId])
            .map(({customerId, customerName}) => {
                return {customerId, customerName}
            })
        if(searchKeyword){
            setModalState({customerList:postData})
            router.back()
        }else{
            const message ={
                customerArr: postData
            }
            if (window.opener && postData.length>0) {
              window.opener.postMessage(message, "*");
              isMobile ? window.history.back() : window.close()
            }
        }
    };

  

    return(
        <section style={{padding:'5px'}}>
            <header className="register-header">
                    <Image src={asideArrow} alt=">" width={15}/>
                    <h4>거래처 조회결과</h4>
            </header>
            <section className="filter-container">
                <h4>거래처 필터</h4>
                <input type='text' ref={inputRef}/>
                <button onClick={searchHandler}>조회</button>
                <button onClick={()=>{
                    setCustomers(initialcustomers)
                    inputRef.current.value='';
                }}>취소</button>
            </section>
            <table className='search-result-table'>
                <colgroup>
                    <col style={{ width: '1%' }} />
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '11%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '9%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td>
                            <input
                                type='checkbox'
                                checked={isAllChecked}
                                onChange={toggleAllChecked}/></td>
                        <td>상호명</td>
                        <td>전화</td>
                        <td>FAX</td>
                        <td>담당</td>
                    </tr>
                </thead>
                <tbody>
                    {pageByCustomers.map((customer) => (
                        <tr
                            key={customer.customerId}
                            className={checkedState[customer.customerId] ? 'is-click' :''}
                            style={{cursor:'pointer'}}
                            onClick={()=>update_checked(customer.customerId)}
                            > 
                            <td><input type='checkbox' checked={checkedState[customer.customerId]||false} readOnly/></td>
                            <td className='left-align'>{customer.customerName}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.fax}</td>
                            <td>{customer.etc}</td>
                        </tr>
                    ))}
                    {pageByCustomers.length ===0 &&
                        <tr className='none-hover'>
                        <td colSpan={5}>
                            <p style={{fontSize:'14px'}}>조회된 결과가 없습니다.</p>
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
            <Pagination
                        totalItems={customers.length}
                        itemCountPerPage={20} 
                        pageCount={5} 
                        currentPage={Number(page)}
                        isModal={!!searchKeyword}/>
            <div className='button-container' style={{marginTop:'20px'}}>
                <button onClick={selectValue}>선택완료</button>
                <button onClick={()=>window.history.back()}>취소</button>
            </div>
        </section>
    )
}