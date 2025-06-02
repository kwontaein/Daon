'use client'
import { searchCustomersApi } from "@/features/customer/customer/api/server-api";
import { CustomerSearchCondition, ResponseCustomer } from "@/model/types/customer/customer/type";
import { useModalState } from "@/store/zustand/modal";
import { useEffect, useState } from "react";
import MobileModal from "../../mobile-modal/page";
import CustomerListSearch from "../customer-list-search";


export default function MobileSearchCustomerList(){
    const {searchKeyword, modalPage} = useModalState();
    const [searchResult, setSearchResult] = useState<ResponseCustomer[]>()

    useEffect(() => {
      const fetchCustomers = async () => {
        const postSearchInfo: CustomerSearchCondition = {
          category: null,
          cateId: null,
          searchTarget: 'all',
          customerName: searchKeyword,
          ceo: null,
        }

        try {
          const response = await searchCustomersApi(postSearchInfo);
          setSearchResult(response); 
        } catch (error) {
          console.error('API 오류:', error);
        }
      };
    
        fetchCustomers();
    }, [searchKeyword]);
    
    return(
      <MobileModal zIndex={1006} width="70%" height="550px" maxWidth="430px">
        {searchResult && <CustomerListSearch initialcustomers={searchResult} page={modalPage} isMobile={true}/>}
      </MobileModal>

  )
}