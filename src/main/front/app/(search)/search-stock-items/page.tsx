import StockSearchItems from "@/components/share/search-items/stock-search";
import { searchStockApi } from "@/features/stock/stock/api/searchStockApi";
import { SearchNameProps } from "@/model/types/share/type";
import { ResponseStock, StockSearchCondition } from "@/model/types/stock/stock/types";


export const revalidate = 10 * 60 * 1; 
export default async function SearchCustomerItemsPage({searchParams} : SearchNameProps) {
    const page = (await searchParams).page ||1;
    const productName = (await searchParams).searchName;

    const postSearchInfo:StockSearchCondition = {
        category:null,
        condition:false,
        remain: false,
        stockUseEa: false,
        productName: productName
    }
    
    const searchResult:ResponseStock[] = await searchStockApi(postSearchInfo)
    const pageByStocks = searchResult.slice((page-1)*20, ((page-1)*20)+20)

    return(
        <StockSearchItems
          stocks={pageByStocks}
          page={page}
          pageLength={searchResult.length}/>
    )
}