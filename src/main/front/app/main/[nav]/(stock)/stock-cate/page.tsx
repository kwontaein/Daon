import StockCate from "@/components/main/stock/category/stock-cate";
import { getStockCateApi } from "@/features/stock/category/api/stockCateApi";


export default async function CustomerCatePage() {
    const InitStockCate = await getStockCateApi()

    return (
        <section key={JSON.stringify(InitStockCate)}>
            <StockCate InitStockCate={InitStockCate}/>
        </section>
    )
}