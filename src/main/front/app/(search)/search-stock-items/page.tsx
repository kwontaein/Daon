import StockSearchItems from "@/components/share/search-items/stock-search";
import { fetchSearchCustomers } from "@/features/customer/customer/api/searchCustomerApi";
import { searchStockApi } from "@/features/stock/stock/api/searchStockApi";
import { CustomerSearchCondition, ResponseCustomer } from "@/model/types/customer/customer/type";
import { SearchNameProps } from "@/model/types/share/type";
import { ResponseStock, StockSearchCondition } from "@/model/types/stock/stock/types";
import { revalidateTag } from "next/cache";

export default async function SearchCustomerItemsPage({searchParams} : SearchNameProps) {
    const page = (await searchParams).page ||1;
    const stockName = (await searchParams).searchName;

    const postSearchInfo:StockSearchCondition = {
        category:null,
        condition:false,
        remain: false,
        stockUseEa: false,
        name: stockName
    }
    
    const searchResult:ResponseStock[] = await searchStockApi(postSearchInfo, false)
    const pageByStocks = searchResult.slice((page-1)*20, ((page-1)*20)+20)

   
    return(
        <StockSearchItems
          stocks={pageByStocks}
          page={page}
          pageLength={searchResult.length}/>
    )
}