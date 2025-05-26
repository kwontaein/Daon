'use client'
import CustomerSearchItems from "@/components/share/search-items/customer-search";
import { searchCustomersApi } from "@/features/customer/customer/api/server-api";
import { getOfficialApi } from "@/features/sales/official/api/server-api";
import { CustomerSearchCondition, ResponseCustomer } from "@/model/types/customer/customer/type";
import { ResponseOfficial } from "@/model/types/sales/official/type";
import { useModalState } from "@/store/zustand/modal";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OfficialSearchItems from "../official-search";
import MobileModal from "../../mobile-modal/page";


export default function MobileSearchOfficialItems(){
    const {searchKeyword, modalPage} = useModalState();
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const fetchCustomers = async () => {
          try {
            const response: ResponseOfficial[] = await getOfficialApi(searchKeyword)
            setSearchResult(response); 
          } catch (error) {
            console.error('API 오류:', error);
          }
        };
    
        fetchCustomers();
      }, [searchKeyword]);

    const pageByOfficial = searchResult.slice((modalPage - 1) * 10, modalPage * 10);
    
    return(
      <MobileModal zIndex={1003} width="70%" height="500px">
        {searchResult && <OfficialSearchItems officials={pageByOfficial} page={modalPage} pageLength={searchResult.length}/>}
      </MobileModal>

  )
}