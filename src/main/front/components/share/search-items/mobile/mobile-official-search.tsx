'use client'
import CustomerSearchItems from "@/components/share/search-items/customer-search";
import { searchCustomersApi } from "@/features/customer/customer/api/searchCustomerApi";
import { getOfficialApi } from "@/features/sales/official/api/officialApi";
import { CustomerSearchCondition, ResponseCustomer } from "@/model/types/customer/customer/type";
import { ResponseOfficial } from "@/model/types/sales/official/type";
import { useModalState } from "@/store/zustand/modal";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OfficialSearchItems from "../official-search";


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
      <section className="modal-background" style={{zIndex:1005}}>
      <div className='main' style={{width:'70%' ,height:'600px',}}>
          <div className='close-button-container'>
              <button onClick={() => window.history.back()}>
                  <FontAwesomeIcon icon={faXmark}/>
              </button>
          </div>
          <OfficialSearchItems officials={pageByOfficial} page={modalPage} pageLength={searchResult.length}/>
      </div>
  </section>
  )
}