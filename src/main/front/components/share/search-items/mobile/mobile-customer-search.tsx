'use client'
import CustomerSearchItems from "@/components/share/search-items/customer-search";
import { searchCustomersApi } from "@/features/customer/customer/api/searchCustomerApi";
import { CustomerSearchCondition, ResponseCustomer } from "@/model/types/customer/customer/type";
import { useModalState } from "@/store/zustand/modal";
import { useEffect, useState } from "react";
import MobileModal from "../../mobile-modal/page";


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
            console.error('API 오류:', error);
          }
        };
    
        fetchCustomers();
      }, [searchKeyword]);

    const pageByCustomers = searchResult.slice((modalPage - 1) * 10, modalPage * 10);
    
    return(
      <MobileModal zIndex={1003} width="70%" height="500px">
        {searchResult && <CustomerSearchItems customers={pageByCustomers} page={modalPage} pageLength={searchResult.length}/>}
      </MobileModal>

  )
}