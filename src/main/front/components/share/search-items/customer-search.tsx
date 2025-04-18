'use client'
import '@/styles/table-style/search-result.scss';
import '@/styles/form-style/form.scss';
import '@/styles/_global.scss'
import { CustomerCateEnum, ResponseCustomer } from '@/model/types/customer/customer/type';
import asideArrow from '@/assets/aside-arrow.gif';

import Pagination from '../pagination';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function CustomerSearchItems({customers, page, pageLength} : {
    customers: ResponseCustomer[],
    page: number,
    pageLength: number
}) {
    const [idx, setIdx] = useState<number>(0)
    console.log(customers)
    const selectValue = (value: ResponseCustomer) => {
        const message ={
            customerId:value.customerId,
            customerName:value.customerName,
            companyNum:value.companyNum,
        }
        if (window.opener) {
          window.opener.postMessage(message, "*");
          window.close();
        }
    };
      
    const handleKeyDown = (event: KeyboardEvent) => {
        // 방향키를 눌렀을 때 반응
        if (event.key === "ArrowUp") {
          setIdx((prev)=>{
             return idx <= 0 ? 19 : prev-1
          })
        } else if (event.key === "ArrowDown") {
            setIdx((prev)=>{
                return idx >= customers.length -1 ? 0 : prev+1
             })
        } else if (event.key === "Enter"){
            selectValue(customers[idx])
        }
      };

      useEffect(()=>{
        setIdx(0)
      },[customers])
    
      useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [idx]);

    return(
        <section style={{padding:'5px'}}>
            <header className="register-header">
                    <Image src={asideArrow} alt=">" width={15}/>
                    <h4>거래처 조회결과</h4>
            </header>
            <table className='search-result-table'>
                <colgroup>
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '11%' }} />
                    <col style={{ width: '11%' }} />
                    <col style={{ width: '9%' }} />
                    <col style={{ width: '11%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td>구분</td>
                        <td>상호명</td>
                        <td>전화</td>
                        <td>FAX</td>
                        <td>담당</td>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer,index) => (
                        <tr
                            key={customer.customerId}
                            onClick={()=>setIdx(index)}
                            onDoubleClick={()=>selectValue(customer)}
                            className={idx === index ? 'is-click' :''}
                            style={{cursor:'pointer'}}> 
                            <td className='left-align'>{customer.customerName}</td>
                            <td>{CustomerCateEnum[customer.category]}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.fax}</td>
                            <td>{customer.etc}</td>
                        </tr>
                    ))}
                    {customers.length ===0 &&
                        <tr className='none-hover'>
                        <td colSpan={9}>
                            <p style={{fontSize:'14px'}}>조회된 결과가 없습니다.</p>
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
            <Pagination
                        totalItems={pageLength}
                        itemCountPerPage={20} 
                        pageCount={5} 
                        currentPage={Number(page)}/>
        </section>
    )
}