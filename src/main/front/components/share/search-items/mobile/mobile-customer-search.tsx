'use client'
import CustomerSearchItems from "@/components/share/search-items/customer-search";
import { searchCustomersApi } from "@/features/customer/customer/api/searchCustomerApi";
import { CustomerSearchCondition, ResponseCustomer } from "@/model/types/customer/customer/type";
import { useModalState } from "@/store/zustand/modal";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


export default function MobileSearchCustomerItems(){
    const {searchKeyword, modalPage} = useModalState();
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const fetchCustomers = async () => {
          const postSearchInfo: CustomerSearchCondition = {
            category: null,
            cateId: null,
            searchTarget: 'all',
            customerName: searchKeyword,
            ceo: null,
          };
    
          try {
            const response = await searchCustomersApi(postSearchInfo);
            setSearchResult(response); 
          } catch (error) {
            console.error('고객 검색 API 오류:', error);
          }
        };
    
        fetchCustomers();
      }, [searchKeyword]);

    const pageByCustomers = searchResult.slice((modalPage - 1) * 10, modalPage * 10);
    
    return(
      <section className="modal-background" style={{zIndex:1005}}>
      <div className='main' style={{width:'70%' ,height:'600px',}}>
          <div className='close-button-container'>
              <button onClick={() => window.history.back()}>
                  <FontAwesomeIcon icon={faXmark}/>
              </button>
          </div>
          <CustomerSearchItems customers={pageByCustomers} page={modalPage} pageLength={searchResult.length}/>
      </div>
  </section>
  )
}