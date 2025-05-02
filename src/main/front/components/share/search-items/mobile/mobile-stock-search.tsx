'use client'
import { searchStockApi } from "@/features/stock/stock/api/searchStockApi";
import { StockSearchCondition } from "@/model/types/stock/stock/types";
import { useModalState } from "@/store/zustand/modal";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import StockSearchItems from "../stock-search";


export default function MobileSearchStockItems(){
    const {searchKeyword, modalPage} = useModalState();
    const [searchResult, setSearchResult] = useState([])


    useEffect(() => {
        const fetchStocks = async () => {
          const postSearchInfo:StockSearchCondition = {
            category:null,
            condition:false,
            remain: false,
            stockUseEa: false,
            productName: searchKeyword
        }
          try {
            const response = await searchStockApi(postSearchInfo);
            setSearchResult(response); 
          } catch (error) {
            console.error('고객 검색 API 오류:', error);
          }
        };
    
        fetchStocks();
      }, [searchKeyword]);

    const pageByStocks = searchResult.slice((modalPage - 1) * 10, modalPage * 10);
    
    return(
      <section className="modal-background" style={{zIndex:1005}}>
      <div className='main' style={{width:'70%' ,height:'550px',}}>
          <div className='close-button-container'>
              <button onClick={() => window.history.back()}>
                  <FontAwesomeIcon icon={faXmark}/>
              </button>
          </div>
          <StockSearchItems stocks={pageByStocks} page={modalPage} pageLength={searchResult.length}/>
      </div>
  </section>
  )
}