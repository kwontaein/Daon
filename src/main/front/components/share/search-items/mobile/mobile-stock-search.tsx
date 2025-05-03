'use client'
import { searchStockApi } from "@/features/stock/stock/api/searchStockApi";
import { StockSearchCondition } from "@/model/types/stock/stock/types";
import { useModalState } from "@/store/zustand/modal";
import { useEffect, useState } from "react";
import StockSearchItems from "../stock-search";
import MobileModal from "../../mobile-modal/page";


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
            console.error('API 오류:', error);
          }
        };
    
        fetchStocks();
      }, [searchKeyword]);

    const pageByStocks = searchResult.slice((modalPage - 1) * 10, modalPage * 10);
    
    return(
      <MobileModal zIndex={1003} width="70%" height="500px">
          {searchResult &&<StockSearchItems stocks={pageByStocks} page={modalPage} pageLength={searchResult.length}/>}
      </MobileModal>
   
  )
}