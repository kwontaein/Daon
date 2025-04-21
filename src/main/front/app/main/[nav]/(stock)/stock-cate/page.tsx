import StockCate from "@/components/main/stock/category/stock-cate";
import { getStockCateApi } from "@/features/stock/category/api/stockCateApi";


export default async function CustomerCatePage() {
    const InitStockCate = await getStockCateApi()

    return <StockCate InitStockCate={InitStockCate}/>
    
}