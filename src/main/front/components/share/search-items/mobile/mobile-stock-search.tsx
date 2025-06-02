'use client'
import { searchStockApi } from "@/features/stock/stock/api/search-server-api";
import { ResponseStock, StockSearchCondition } from "@/model/types/stock/stock/types";
import { useModalState } from "@/store/zustand/modal";
import { useEffect, useState } from "react";
import StockSearchItems from "../stock-search";
import MobileModal from "../../mobile-modal/page";


export default function MobileSearchStockItems(){
    const {searchKeyword, modalPage} = useModalState();
    const [searchResult, setSearchResult] = useState<ResponseStock[]>()


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

    const pageByStocks = (searchResult??[]).slice((modalPage - 1) * 10, modalPage * 10);
    
    return(
      <MobileModal zIndex={1006} width="70%" height="500px" closeButton={true} maxWidth="430px">
          {searchResult && <StockSearchItems stocks={pageByStocks} page={modalPage} pageLength={searchResult.length}/>}
      </MobileModal>
   
  )
}