import StockForm from "@/components/main/stock/stock/form/stock-form";
import { getStockCateApi } from "@/features/stock/category/api/stockCateApi";

export default async function RegisterStockPage(){
    const InitStockCate = await getStockCateApi()

    return(
       <StockForm mode='write' stockCate={InitStockCate}/>
    )
}